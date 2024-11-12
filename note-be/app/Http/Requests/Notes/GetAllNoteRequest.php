<?php

namespace App\Http\Requests\Notes;

use App\Http\Requests\BaseRequest;
use App\Models\Note;

class GetAllNoteRequest extends BaseRequest
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

    public function process($req) {
        $query = Note::query();

        if (!empty($req['search'])) {
            $search = $req['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                ->orWhere('content', 'LIKE',"%{$search}%");
            });
        }
        
        $notes = $query->orderByDesc('id')->paginate(config('app.pagination'));
        
        return $this->success($notes, 'All Notes');
    }
}
