<?php

namespace App\Http\Controllers;

use App\Http\Requests\Notes\CreateNoteRequest;
use App\Http\Requests\Notes\DeleteNoteRequest;
use App\Http\Requests\Notes\GetAllNoteRequest;
use App\Http\Requests\Notes\GetNoteDetailsRequest;
use App\Http\Requests\Notes\UpdateNoteRequest;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetAllNoteRequest $request)
    {
        $response = $request->process($request->all());
        return $response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateNoteRequest $request)
    {
        $response = $request->process($request->all());
        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(GetNoteDetailsRequest $request, string $id)
    {
        $response = $request->process($id);
        return $response;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, string $id)
    {
        $response = $request->process($request->all(), $id);
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteNoteRequest $request, string $id)
    {
        $response = $request->process($id);
        return $response;
    }
}
