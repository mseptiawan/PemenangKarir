<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Dashboard/Category/Index', [
            'categories' => $categories,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'slug' => 'required|string|max:150|unique:categories,slug',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'category' => $category,
            'categories' => Category::all(),
            'flash' => ['success' => 'Kategori berhasil dibuat!'],
        ]);
    }



    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $category->id,
            'slug' => 'required|string|max:150|unique:categories,slug,' . $category->id,
        ]);

        $category->update($validated);

        $categories = Category::all();

        return Inertia::render('Dashboard/Category/Index', [
            'categories' => $categories,
        ]);
    }
    public function destroy(Category $category)
    {
        $category->forceDelete();

    return redirect()
        ->route('categories.index')
        ->with('success', 'Kategori berhasil dihapus!');
    }
}
