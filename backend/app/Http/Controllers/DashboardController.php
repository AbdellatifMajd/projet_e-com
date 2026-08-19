<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $period = $request->integer('period', 10);


            return response()->json($this->getDashboardStats($period));

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => app()->environment('production')
                    ? 'Erreur lors de la récupération des statistiques.'
                    : 'Dashboard query failed: ' . $e->getMessage(),
            ], 500);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => app()->environment('production')
                    ? 'Une erreur inattendue est survenue.'
                    : 'Dashboard unexpected error: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function getDashboardStats(int $period): array
    {
        return [
            'summary'      => $this->getSummary(),
            'sales'        => $this->getSales($period),
            'orderStatus'  => $this->getOrderStatus(),
            'topProducts'  => $this->getTopProducts(),
            'recentOrders' => $this->getRecentOrders(),
        ];
    }

    private function getSummary(): array
    {
        return [
            'revenue'      => (float) Order::where('order_status', 'delivered')->sum('total_amount'),
            'orders'       => Order::count(),
            'customers'    => User::where('role', 'user')->count(),
            'product_sold' => (int) DB::table('order_items')->sum('quantity'),
        ];
    }

    private function getSales(int $period): array
    {
        return Order::query()
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as revenue'),
                DB::raw('COUNT(*) as orders')
            )
            ->where('order_status', 'delivered')
            ->where('created_at', '>=', now()->subDays($period))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->map(fn ($item) => [
                'date'    => $item->date,
                'revenue' => (float) $item->revenue,
                'orders'  => (int) $item->orders,
            ])
            ->values()
            ->toArray();
    }

    private function getOrderStatus(): array
    {
        return Order::query()
            ->select('order_status', DB::raw('COUNT(*) as count'))
            ->groupBy('order_status')
            ->get()
            ->map(fn ($item) => [
                'order_status' => $item->order_status,
                'count'        => (int) $item->count,
            ])
            ->values()
            ->toArray();
    }

    private function getTopProducts(): array
    {
        return DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.order_status', 'delivered')
            ->select(
                'products.id',
                'products.title',
                DB::raw('SUM(order_items.quantity) as quantity')
            )
            ->groupBy('products.id', 'products.title')
            ->orderByDesc('quantity')
            ->limit(5)
            ->get()
            ->map(fn ($product) => [
                'id'       => $product->id,
                'title'    => $product->title,
                'quantity' => (int) $product->quantity,
            ])
            ->values()
            ->toArray();
    }

    private function getRecentOrders(): array
    {
        return Order::query()
            ->with('user')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($order) => [
                'id'           => $order->id,
                'order_status' => $order->order_status,
                'total'        => (float) $order->total_amount,
                'created_at'   => $order->created_at,
                'user'         => $order->user ? [
                    'id'    => $order->user->id,
                    'name'  => $order->user->name,
                    'email' => $order->user->email,
                ] : null,
            ])
            ->values()
            ->toArray();
    }
}