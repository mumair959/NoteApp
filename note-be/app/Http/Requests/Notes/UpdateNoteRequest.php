<?php

namespace App\Http\Requests\Notes;

use App\Http\Requests\BaseRequest;
use App\Models\Note;

class UpdateNoteRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:100',
            'content' => 'sometimes|required|string|max:500',
        ];
    }

    public function process($req, $id){
        try {
            $note = Note::find($id);
            $note->update($req);
            
            return $this->success($note, 'Note has been updated successfully');

        } catch (\Exception $ex) {
            return $this->error($ex->getMessage(), []);
        }
    }
}
