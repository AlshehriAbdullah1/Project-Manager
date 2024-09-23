<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    //
    public function index(){
        $user=auth()->user();
        $pendingTasksCount= Task::query()->where('status','pending')->count();
        $myPendingTasksCount= Task::query()->where('status','pending')
            ->where('assigned_user_id',$user->id)
            ->count();
        $inProgressTasksCount= Task::query()->where('status','in_progress')->count();
        $myInProgressTasksCount= Task::query()->where('status','in_progress')
            ->where('assigned_user_id',$user->id)
            ->count();
        $completedTasksCount= Task::query()->where('status','completed')->count();
        $myCompletedTasksCount= Task::query()->where('status','completed')
            ->where('assigned_user_id',$user->id)
            ->count();
        $activeTasks= Task::query()->whereIn('status',['in_progress','pending'])
            ->where('assigned_user_id',$user->id)
            ->limit(5)->get();

        $activeTasks=TaskResource::collection($activeTasks);
        return inertia('Dashboard',
            compact('pendingTasksCount','myPendingTasksCount','inProgressTasksCount','myInProgressTasksCount','completedTasksCount','myCompletedTasksCount','activeTasks')

        );



    }
}
