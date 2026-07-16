<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
        try{
            //validation des entrées 
            $validated = $request->validate([
            'email' => "required|string|email",
            'password' => "required|min:4"
        ]);

        //récupération de l'utilisateur 
        $user = User::where("email", $validated["email"])->first();

        //vérification des identifiants
        if(!$user || !Hash::check($validated["password"], $user->password)){
            throw ValidationException::withMessages([
                'email' => "Invalid credentials"
            ]);
        }

        //génération du token 
        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            'message' => "User connected successfully.",
            'user' => $user, 
            'token' => $token 
        ]);
        }
        catch(Exception $e){
            return response()->json([
                'message' => "An error occured, please try again.", $e->getMessage()
            ], 400);
        }

    }
}