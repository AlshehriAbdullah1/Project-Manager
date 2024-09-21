import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Index({auth, users,queryParams=null,success,failed}) {
    queryParams = queryParams || {};
    console.log(failed)
    const searchFiledChanged= (name,value)=>{
        if(value){
            queryParams[name]=value;

        }
        else{
            delete queryParams[name];
        }
        router.get(route('user.index'),queryParams)

    };
    //
    const onKeyPress = (name,e)=>{
        if(e.key !="Enter") return;
        searchFiledChanged(name,e.target.value);
    };

    const sortChanged = (name)=>{
        if(name===queryParams.sort_field){
            if(queryParams.sort_direction==='asc'){
                queryParams.sort_direction= 'desc';
            }
            else{
                queryParams.sort_direction= 'asc';

            }
            router.get(route('user.index'),queryParams)
        }

        else{
            queryParams.sort_field=name;
            queryParams.sort_direction= 'asc';
        }
    }

    const deleteUser = (user)=>{
        // href={route('user.destroy', user.id)}

        if(!window.confirm("Please confirm to delete the user ")){
            return;
        }
        router.delete(route('user.destroy',user.id))

    }

    const ArrowDirection = SortingArrow({direction: queryParams.sort_direction});

    return (
        <AuthenticatedLayout
            header={
                <div className={"flex justify-between items-center"}>

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Users</h2>
                    <Link href={route("user.create")} className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>Add new</Link>
                </div>

            }
            user={auth.user}

        >

            <Head title="Users"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success&& <div className={"bg-emerald-500 py-2 px-4 text-white rounded mb-4"}>
                        {success}


                    </div>}
                    {failed&& <div className={"bg-red-500 py-2 px-4 text-white rounded mb-4"}>
                        {failed}


                    </div>}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/*<pre>{JSON.stringify(users, undefined, 2)}</pre>*/}
                            <div className="overflow-auto">

                                <table
                                    className="w-full text-left rtl:text-right text-sm text-gray-500 dark:text-gray-400">

                                    {/*        for data showing */}
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                     dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className={"text-nowrap "}>
                                        <th onClick={e => sortChanged('id')} className="cursor-pointer px-3 py-3">
                                            ID
                                            {
                                                queryParams?.sort_field?.toLowerCase() === 'id' ?
                                                    <SortingArrow direction={queryParams.sort_direction}/> : null

                                            }

                                        </th>

                                        <th onClick={e => sortChanged('name')} className="px-3 py-3">
                                            Name {
                                            queryParams?.sort_field?.toLowerCase() === 'name' ?
                                                <SortingArrow direction={queryParams.sort_direction}/> : null

                                        }

                                        </th>
                                        <th onClick={e => sortChanged('email')} className="px-3 py-3">
                                            Email
                                            {
                                                queryParams.sort_field?.toLowerCase() === 'email' ?
                                                    <SortingArrow direction={queryParams.sort_direction}/> : null

                                            }

                                        </th>
                                        <th onClick={e => sortChanged('created_at')} className="px-3 py-3">
                                            Create Date
                                        </th>
                                        <th className="px-3 py-3">
                                            Actions

                                        </th>
                                    </tr>
                                    </thead>
                                    {/*        for filter showing */}

                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                     dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className={"text-nowrap"}>
                                        <th className="px-3 py-3"></th>

                                        <th className="px-3 py-3">
                                            <TextInput className="w-full"
                                                       placeholder="User Name"
                                                       defaultValue={queryParams.name}
                                                       onBlur={e => searchFiledChanged("name", e.target.value)}
                                                       onKeyPress={e => onKeyPress("name", e)}

                                            />

                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full"
                                                       placeholder="User Email"
                                                       defaultValue={queryParams.email}
                                                       onBlur={e => searchFiledChanged("email", e.target.value)}
                                                       onKeyPress={e => onKeyPress("email", e)}

                                            />

                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {users.data.map(user => (
                                        <tr className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}
                                            key={user.id}>
                                            <td className={"px-3 py-2"}>{user.id}</td>

                                            <th className={"px-3 py-2 text-white text-nowrap"}>

                                                 {user.name}
                                               </th>
                                            <td className={"px-3 py-2"}>
                                                {user.email}
                                            </td>
                                            <td className={"px-3 py-2"}>


                                                {user.created_at}</td>
                                            <td className={"px-3 py-2"}>
                                                <Link href={route('user.edit', user.id)}
                                                      className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"

                                                >

                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={(e)=>deleteUser(user)}


                                                      className="mx-1 font-medium text-blue-600 hover:underline dark:text-red-500"

                                                >

                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={users.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}


function SortingArrow({direction}) {
    return (

        direction === 'asc' ?
            <span className="ml-1">&uarr;</span> :
            direction === 'desc' ?
                <span className="ml-1">&darr;</span> :
                null

    )
}
