import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";


export default function Show ({auth, project, queryParams,tasks}){
    return (
        <Authenticated
            user={auth.user}
            header={<h2
                className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{`Project: ${project.name}`}</h2>}

        >

            <Head title="Projects"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div>
                            <img src={project.image_path}
                                 alt=""
                                 className={"w-full h-64 object-cover"}/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className={"grid gap-1 grid-cols-2 mt-2"}>
                                {/*First Row*/}
                                <div>
                                    {/*Project Id*/}
                                    <div>
                                        <label className={"font-bold text-lg"}>Project ID</label>
                                        <p className={"mt-1"}>{project.id}</p>
                                    </div>
                                    {/*project name*/}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Project Name</label>
                                        <p className={"mt-1"}>{project.id}</p>
                                    </div>
                                    {/*    project status? */}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Project Status</label>
                                        <p className={"mt-1"}>

                                            <span
                                                className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}
                                            >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </p>


                                    </div>
                                    {/*project created by*/}
                                    <div className={"mt-4"}>
                                        <label className={"font-bold text-lg"}>Created By</label>
                                        {/*<pre >{project}</pre>*/}

                                        <p className={"mt-1"}>{project.createdBy.name}</p>
                                    </div>
                                </div>


                                {/*Second Row*/}
                                <div>
                                    <div>
                                        {/*Project Id*/}
                                        <div>
                                            <label className={"font-bold text-lg"}>Project ID</label>
                                            <p className={"mt-1"}>{project.id}</p>
                                        </div>
                                        {/*project name*/}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Project Name</label>
                                            <p className={"mt-1"}>{project.id}</p>
                                        </div>
                                        {/*    project status? */}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Project Status</label>
                                            <p className={"mt-1"}>

                                            <span
                                                className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}
                                            >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                            </p>


                                        </div>
                                        {/*project created by*/}
                                        <div className={"mt-4"}>
                                            <label className={"font-bold text-lg"}>Created By</label>
                                            {/*<pre >{project}</pre>*/}

                                            <p className={"mt-1"}>{project.createdBy.name}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className={"mt-4"}>
                                <label className={"font-bold text-lg"}>Description</label>
                                <p className={"mt-1"}> {project.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className={"py-12"}>
                <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>
                    <div className={"overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg"}>
                        <div className={"p-6 text-gray-900 dark:text-gray-100"}>
                        <TasksTable queryParams={queryParams} tasks={tasks} hideProjectColumn={true}/> </div>
                    </div>
                </div>
            </div>
        </Authenticated>

    );
}
