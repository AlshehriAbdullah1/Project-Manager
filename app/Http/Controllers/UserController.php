<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sortField=request("sort_field",'created_at');
        $sortDirection=request("sort_direction",'desc');

        if(request('name')){
            $query->where("name","like","%".request('name')."%");
        }
        if(request('email')){
            $query->where("email","like","%".request('email')."%");
        }

        $users = $query
            ->orderBy($sortField,$sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia('User/Index',[
            'users'=>UserResource::collection($users),
            'queryParams'=>request()->query()?:null,
            'success'=>session('success'),
            'failed'=>session('failed')
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validationData();
        $data['email_verified_at']=time();
        $data['password'] = bcrypt( $data['password']);



        User::create($data);


        return to_route('user.index')
            ->with('success','user was added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        return inertia("User/Edit",[
            'user'=>new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //

        $data = $request->validated();

//        if the updated password is the same as the current password, return error message
//        if($user->getAuthPassword()==bcrypt($data['password'])){
//            // I want to return error message
//        }
        $data['updated_at']=time();
        $data['email_verified_at']=time();
        $password=$data['password']??null;

        if($password){
            $data['password']=  bcrypt($password);
        }
        else{
            unset($data['password']);
        }
       $user->update($data);

        return to_route('user.index')
            ->with('success','user info has been updated successfully');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        if($user->id==Auth::id()){
            return to_route('user.index')->with('failed',"error: you cannot delete yourself :)");

        }
        $name= $user->name;
        $user->delete();





        return to_route('user.index')->with('success',"user: $name was deleted successfully");
    }
}
