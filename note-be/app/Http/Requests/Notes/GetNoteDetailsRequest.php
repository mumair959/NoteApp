<?php

namespace App\Http\Requests\Notes;

use App\Http\Requests\BaseRequest;
use App\Models\Note;

class GetNoteDetailsRequest extends BaseRequest
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
            //
        ];
    }

    public function process($id)  {
        $note = Note::find($id);
        if (empty($note)) {
            return $this->error("Note not found", []);
        }
        return $this->success($note, "Note Details");
    }
}
