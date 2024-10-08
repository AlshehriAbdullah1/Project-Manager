<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
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
//        $query=$task->project();

//        dd(new TaskResource($task));
        $project = $task->project();

        return inertia('Task/Show',[

            'task'=>new TaskResource($task),
            'project'=>$project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = UserResource::collection(User::all());
        $projects=ProjectResource::collection(Project::all());
        return inertia('Task/Edit',[
            'task'=>new TaskResource($task),
            'users'=>$users,
            'projects'=>$projects
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
        $data = $request->validated();


        $data['updated_by'] = Auth::id();
        $data['updated_at']=time();

        if ($request->hasFile('image')) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
//            $data['image_path'] = $request->file('image')->store('task/' . Str::random(), 'public');
            $data['image_path'] = '/storage/' . $request->file('image')->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.show',$task)->with('success', "Task $task->name was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $name= $task->name;
        $task->delete();


        if($task->image_path){
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }


        return to_route('task.index')->with('success',"task $name was deleted successfully");

    }


    public function myTasks(){

        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
