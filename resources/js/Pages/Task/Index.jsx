import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Index({auth, tasks,queryParams=null}) {

    queryParams = queryParams || {};
    const searchFiledChanged= (name,value)=>{
        if(value){
            queryParams[name]=value;

        }
        else{
            delete queryParams[name];
        }
        router.get(route('task.index'),queryParams)

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
            router.get(route('task.index'),queryParams)
        }

        else{
            queryParams.sort_field=name;
            queryParams.sort_direction= 'asc';
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Tasks</h2>}
        >

            <Head title="Tasks"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/*<pre>{JSON.stringify(tasks, undefined, 2)}</pre>*/}
                            <TasksTable tasks={tasks} queryParams={queryParams}/>
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
