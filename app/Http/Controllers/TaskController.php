<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Task::query();
        $sortField=request("sort_field",'created_at');
        $sortDirection=request("sort_direction",'desc');

        if(request('name')){
            $query->where("name","like","%".request('name')."%");
        }
        if(request('status')){
            $query->where("status",request('status'));
        }

        $tasks = $query
            ->orderBy($sortField,$sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia('Task/Index',[
            'tasks'=>TaskResource::collection($tasks),
            'queryParams'=>request()->query()?:null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create( )
    {

        $data = request('project');

        // Find the project using the project ID
        $query = Project::query();
        $users = User::all();
        $project = $query->findOrFail($data);
        return inertia('Task/Create',[
            'project'=>$project,
            'users'=>$users
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
        //
        $data = $request->validationData();
        /** @var $image UploadedFile **/
        $image= $data['image']??null;
        $data['created_by']=Auth::id();
        $data['updated_by']=Auth::id();
        $data['updated_at']=time();
        if($image){
            $data['image_path']=$image->store('task/'.$data['project_id'].'/'.Str::random(),'public');
        }

        Task::create($data);


        return to_route('project.show',[
            'project'=>$data['project_id']
        ])
            ->with('success','Task was created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
