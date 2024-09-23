import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";


export default function Show ({auth, task}){

    console.log(task);
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className={'flex justify-between items-center'}>

                    <h2
                        className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Task: ${task.name}`}</h2>

                    <Link href={route("task.edit",task.id)} className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>Edit Task</Link>

                </div>
            }

        >


            <Head title="Tasks"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div>
                            <img src={task.image_path}
                                 alt=""
                                 className={"w-full h-64 object-cover"}/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className={"grid gap-1 grid-cols-2 mt-2"}>
                                {/*First Row*/}
                                <div>
                                    {/*Task Id*/}
                                    <div>
                                        <label className={"font-bold text-lg"}>Task ID</label>
                                        <p className={"mt-1"}>{task.id}</p>
                                    </div>
                                    {/*task name*/}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Task Name</label>
                                        <p className={"mt-1"}>{task.id}</p>
                                    </div>
                                    {/*    task status? */}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Task Status</label>
                                        <p className={"mt-1"}>

                                            <span
                                                className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}
                                            >{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                        </p>


                                    </div>
                                    {/*task created by*/}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Created By</label>
                                        {/*<pre >{task}</pre>*/}

                                        <p className={"mt-1"}>{task.createdBy.name}</p>
                                    </div>
                                </div>


                                {/*Second Row*/}
                                <div>
                                    <div>
                                        {/*Project Id*/}
                                        <div>
                                            <label className={"font-bold text-lg"}>Project ID</label>
                                            <p className={"mt-1"}>{task.project.id}</p>
                                        </div>
                                        {/*project name*/}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Project Name</label>
                                            <p className={"mt-1"}>{task.project.name}</p>
                                        </div>
                                        {/*    task priority? */}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Priority</label>
                                            <p className={"mt-1"}>

                                            <span
                                                className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}
                                            >{TASK_PRIORITY_TEXT_MAP[task.priority]}</span>
                                            </p>


                                        </div>
                                        {/*task Assigned to*/}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Assigned to</label>
                                            {/*<pre >{task}</pre>*/}

                                            <p className={"mt-1"}>{task.assignedUser.name}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className={"mt-4"}>
                                <label className={"font-bold text-lg"}>Description</label>
                                <p className={"mt-1"}> {task.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/*<div className={"py-12"}>*/}
            {/*    <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>*/}
            {/*        <div className={"overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"}>*/}
            {/*            <div className={"p-6 text-gray-900 dark:text-gray-100"}>*/}
            {/*            <TasksTable queryParams={queryParams} tasks={tasks} hideTaskColumn={true}/> </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Authenticated>

    );
}
