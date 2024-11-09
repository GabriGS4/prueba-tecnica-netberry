<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TasksController extends Controller
{
    public function index() {
        $categories = Category::all();
        return view('tasks', compact('categories'));
    }

    public function list(Request $request) {
        $tasks = Task::with('categories');
        return \DataTables::eloquent($tasks)
            ->addColumn('categories', function(Task $task) {
                return view('partials._category-column', ['categories' => $task->categories]);
            })
            ->toJson();
    }

    public function store(Request $request) {
        try {
            $validatedData = $request->validate([
                'name' => 'required',
            ]);

            $task = Task::create($validatedData);

            // Obtenemos los ids de las categorías seleccionadas
            $categories = collect($request->all())
                ->keys() // El uso de keys() nos devuelve un array con las claves del array original
                ->filter(fn($key) => str_starts_with($key, 'category-')) // Filtramos las claves que comienzan con 'category-'
                ->map(fn($key) => substr($key, 9)); // Obtenemos el id de la categoría, a partir del caracter 9

            $task->categories()->sync($categories);

            $response = [
                'status' => true,
                'message' => 'La tarea fue creada'
            ];
        } catch (ValidationException $e) {
            $response = [
                'status' => false,
                'message' => 'La tarea no pudo ser creada',
                'errors' => $e->errors()
            ];
        }
        return response()->json($response);
    }

    public function delete(Task $task) {
        try {
            $task->delete();
            $response = [
                'status' => true,
                'message' => 'La tarea fue eliminada'
            ];
        } catch (\Exception $e) {
            $response = [
                'status' => false,
                'message' => 'La tarea no pudo ser eliminada'
            ];
        }
        return response()->json($response);
    }
}
