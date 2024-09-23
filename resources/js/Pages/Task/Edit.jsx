import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import colors from "tailwindcss/colors.js";


export default function Edit ({auth,task,users}) {
    // console.log('task is : ');


const {data,setData, post, processing, errors , reset}= useForm({
    image:null,
    name:task.name||'',
    status:task.status|| '',
    priority:task.priority||'',
    description:task.description|| '',
    due_date:task.due_date|| '',
    assigned_user_id: task.assignedUser ? task.assignedUser.id : '',
    _method: 'PUT'
})

    const onSubmit = (e)=>{
    e.preventDefault();
    // console.log("submit requested!");
    console.log(data);
        post(route('task.update', task.id)
            );
}


    return (
        <Authenticated
            header={
                <div className={"flex justify-between items-center"}>

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Task {task.name}</h2>
                </div>

            }
            user={auth.user}

        >
            <Head title="Tasks"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">

                        <form onSubmit={onSubmit}
                              className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"}>
                            {/*Task Image*/}
                            {task.image_path && <div className={"mb-4"}>
                                <img src={task.image_path} alt={""} className={"w-64"}/>
                            </div>}
                            {/*<div>*/}
                            {/*    <img src={task.image_path}*/}
                            {/*         alt=""*/}
                            {/*         className={"w-full h-64 object-cover"}/>*/}
                            {/*</div>*/}
                            <div>
                                <InputLabel htmlFor={"task_image_path"} value={"Task Image"}/>
                                <input id={"task_image_path"}
                                           type={"file"}
                                           name={"image"}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData(// Preserve the rest of the form data
                                               'image', e.target.files[0] // Only update the image field
                                           )}

                                />
                                <InputError message={errors.image} className={"mt-2"}/>
                            </div>
                            {/*Task Name*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"task_name"} value={"Task Name"}/>
                                <TextInput id={"task_name"}
                                           type={"text"}
                                           name={"name"}
                                           value={data.name}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('name', e.target.value)}

                                />
                                <InputError message={errors.name} className={"mt-2"}/>
                            </div>
                            {/*Task Description*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"task_description"} value={"Task Description"}/>

                                <TextAreaInput id={"task_description"}
                                               type={"text"}
                                               name={"description"}
                                               value={data.description}
                                               className={"mt-1 block w-full"}
                                               onChange={e => setData('description', e.target.value)}

                                />
                                <InputError message={errors.description} className={"mt-2"}/>
                            </div>
                            {/*    Task Due Date*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"task_due_date"} value={"Task Deadline"}/>
                                <TextInput id={"task_due_date"}
                                           type={"date"}
                                           name={"due_date"}
                                           value={data.due_date}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('due_date', e.target.value)}

                                />
                                <InputError message={errors.due_date} className={"mt-2"}/>
                            </div>

                            {/*    Task Status*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"task_status"} value={"Task Status"}/>
                                <SelectInput name={"status"}
                                             id={"task_status"}
                                             value={data.status}
                                             className={"mt-1 block w-full"}
                                             onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value={""} disabled={true}>Select Status</option>
                                    <option value={"pending"}>Pending</option>
                                    <option value={"in_progress"}>In Progress</option>
                                    <option value={"completed"}>Completed</option>


                                </SelectInput>

                                <InputError message={errors.status} className={"mt-2"}/>
                            </div>
                            {/*    Task Priority*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"task_priority"} value={"Task Priority"}/>
                                <SelectInput name={"priority"}
                                             id={"task_priority"}
                                             value={data.priority}
                                             className={"mt-1 block w-full"}
                                             onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <option value={""} disabled={true}>Select Priority</option>
                                    <option value={"low"}>low</option>
                                    <option value={"medium"}>medium</option>
                                    <option value={"high"}>high</option>


                                </SelectInput>

                                <InputError message={errors.status} className={"mt-2"}/>
                            </div>
                            <pre className={'text-white'}>{JSON.stringify(users)}</pre>

                            {/* Assigned To */}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"assigned_to"} value={"Assigned To"} />
                                <SelectInput
                                    name={"assigned_user_id"}
                                    id={"assigned_to"}
                                    value={data.assigned_user_id}  // Set default to assigned user
                                    className={"mt-1 block w-full"}
                                    onChange={e => setData('assigned_user_id', e.target.value)}
                                >
                                    <option value={""} disabled={true}>Select User</option>
                                    {users.data.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className={"mt-2"} />
                            </div>


                            <div className={"mt-4 text-right"}>
                                <Link href={route('task.index')}
                                      className={"bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"}
                                >Cancel
                                </Link>

                                <button
                                    className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>
                                    Submit
                                </button>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
