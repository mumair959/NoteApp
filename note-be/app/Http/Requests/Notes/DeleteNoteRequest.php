<?php

namespace App\Http\Requests\Notes;

use App\Http\Requests\BaseRequest;
use App\Models\Note;

class DeleteNoteRequest extends BaseRequest
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

    public function process($id){
        try {
            $note = Note::find($id);
            $note->delete();
            $notes = Note::paginate(config('app.pagination'));

            return $this->success($notes, 'Note has been deleted successfully');

        } catch (\Exception $ex) {
            return $this->error($ex->getMessage(), []);
        }
    }
}
