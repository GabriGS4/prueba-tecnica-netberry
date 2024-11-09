<?php

use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TasksController::class, 'index']);
Route::get('/list', [TasksController::class, 'list'])->name('tasks.list');
Route::post('/store', [TasksController::class, 'store'])->name('tasks.store');
Route::delete('/{task}', [TasksController::class, 'delete'])->name('tasks.delete');
