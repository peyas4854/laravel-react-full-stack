<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Registration
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'=>$user,
            'token' => $token,
            'message'=>'Sign Up Successfully'
        ], 200);
    }

    public function login(LoginRequest $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if (auth()->attempt($data)) {
            $token = auth()->user()->createToken('main')->plainTextToken;
            return response()->json([
                'user' => auth()->user(),
                'token' => $token,
            ], 200);
        } else {
            return response()->json(
                ['error' => 'Provide valid email and password'],

                401);
        }

    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['status' => 'success', 'message' => 'Successfully logout',], 204);


    }
}
