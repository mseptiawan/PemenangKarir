<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubscribeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        Mail::raw("Terimakasih sudah subscribe!", function ($message) use ($request) {
            $message->to($request->email)
                ->subject("Konfirmasi Subscribe");
        });

        return response()->json([
            'message' => "Email {$request->email} berhasil dikirim!"
        ]);
    }
}
