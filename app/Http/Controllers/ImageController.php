<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ImageController extends Controller
{
public function upload(Request $request)
{
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
        $file->storeAs('public/uploads', $filename);
        return response()->json(['url' => asset('storage/uploads/' . $filename)]);
    }
    return response()->json(['message' => 'No image uploaded'], 400);
}

}
