<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Exception;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    //
    public function index(Request $request, $userId){
        try{
            if(!$userId){
                return response()->json([
                    'success' => false,
                    'message' => 'User id is required',
                ], 400);
                }
                $addressList = Address::where("user_id", $userId)->get();
                return response()->json([
                    'success' => true,
                    'data' => $addressList
                ], 200);
        }
        catch(Exception $e){
            return response()->json([
                 'success' => false,
                  'message' => 'Error: '.$e->getMessage(), 
                ], 500);
        }
    }

public function store(Request $request){
    try {
        $validated = $request->validate([
            'userId' => 'required|exists:users,id',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'pincode' => 'required|string|max:20',
            'phone' => 'required|string|max:30',
            'notes' => 'nullable|string',
        ]);

        $newAddress = Address::create([
            'user_id' => $validated['userId'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'pincode' => $validated['pincode'],
            'phone' => $validated['phone'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'data' => $newAddress,
            'message' => 'Address added successfully'
        ], 201);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage(),
        ], 500);
    }
}

public function update(Request $request, $userId, $addressId){
    try {
        $address = Address::where('id', $addressId)
            ->where('user_id', $userId)
            ->first();

        if (!$address) {
            return response()->json([
                'success' => false,
                'message' => 'Address not found'
            ], 404);
        }

        $validated = $request->validate([
            'address' => 'sometimes|required|string|max:255',
            'city'    => 'sometimes|required|string|max:255',
            'pincode' => 'sometimes|required|string|max:20',
            'phone'   => 'sometimes|required|string|max:30',
            'notes'   => 'nullable|string',
        ]);

        $address->update($validated);

        $addressList = Address::where('user_id', $userId)->get();

        return response()->json([
            'success' => true,
            'message' => 'Address updated successfully',
            'data'    => $addressList,
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ], 400);
    }
}

    public function destroy($userId, $addressId){
        try{
            $address = Address::where("user_id", $userId)->where("id", $addressId)->first();
        if(!$address){
            return response()->json(['
            success' => false, 
            'message' => 'Address not found'], 404);
        }
        $address->delete();
        $addressList = Address::where('user_id', $userId)->get();
        return response()->json([ 
            'success' => true, 
            'message' => 'Address deleted successfully',
              'data'    => $addressList,
            ], 200);
        }

        catch(Exception $e){
            return response()->json([
                'success' => false, 
                'message' => 'Error' . $e->getMessage()
                ], 500);
        }

    }
}