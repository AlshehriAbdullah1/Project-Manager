<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            'name'=>['sometimes', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            "description" => ['sometimes', 'string','max:255'],
            "due_date" => ['sometimes', 'date'],
            'status' => ['sometimes', Rule::in(['pending', 'in_progress', 'completed']),],
            'priority' => ['sometimes', Rule::in(['low', 'medium', 'high']),],
            'assigned_user_id'=>['required','exists:users,id'],


            ];
    }
}



