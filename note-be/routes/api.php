<?php

use App\Http\Controllers\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('notes', NoteController::class);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
