<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        try{
            //validation des donnés entrantes
            $validated = $request->validate([
                'username' => 'required|string|max:255|unique:users,name',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => "required|min:4"
            ]);

            //création de l'utilisateur avec mot de passe haché
            $user = User::create([
                'name' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
            return response()->json([
                'message' => 'user created successfully.',
                'user' => $user,
            ], 201);
        }
        catch(Exception $e){
            return response()->json([
                'message' => 'failed to create user.', $e->getMessage()
            ], 400);
        }

    }


public function login(Request $request){
    try {
        // Validation
        $credentials = $request->validate([
            'email' => "required|string|email",
            'password' => "required|min:4"
        ]);

        // Authentification et création de la session
        if (Auth::attempt($credentials)) {
            // Regénère la session pour éviter le Session Fixation attack
            $request->session()->regenerate(); 

            return response()->json([
                'message' => "User connected successfully.",
                'user' => Auth::user()
            ], 200);
        }

        // Si l'authentification a échoué
        return response()->json([
            'message' => "Invalid credentials"
        ], 401);

    } catch (\Exception $e) {
        return response()->json([
            'message' => "An error occured, please try again.",
            'error' => $e->getMessage()
        ], 400);
    }
}


public function logout(Request $request){
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(["message" => "User Logout successfully"], 201);
}
}