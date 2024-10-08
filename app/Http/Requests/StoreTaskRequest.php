<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
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
            "name"=>['required', 'max:255'],
            'image'=>['nullable','image','max:2048'],
            "description"=>['nullable'],
            "due_date"=>['nullable','date'],
            'status'=>['required',Rule::in(['pending','in_progress','completed'])],
            'priority'=>['required',Rule::in(['low','medium','high'])],
            'assigned_user_id'=>['required',Rule::exists("users",'id')],
            'project_id'=>['required',Rule::exists('projects','id')]

        ];
    }
}
