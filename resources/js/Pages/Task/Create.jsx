import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Create ({auth}) {
const {data,setData, post, processing, errors , reset}= useForm({
    image:'',
    name:'',
    status:'',
    priority:'',
    description:'',
    due_date:''
})

    const onSubmit = (e)=>{
    e.preventDefault();
    post(route('task.store'));
    }


    return (
        <Authenticated
            header={
                <div className={"flex justify-between items-center"}>

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create New Tasks</h2>
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
                            <div>
                                <InputLabel htmlFor={"task_image_path"} value={"Task Image"}/>
                                <TextInput id={"task_image_path"}
                                           type={"file"}
                                           name={"image"}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('image', e.target.files[0])}

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
                                             className={"mt-1 block w-full"}
                                             onChange={(e)=>setData('status',e.target.value)}
                                >
                                    <option value={""} disabled={true}>Select Status</option>
                                    <option value={"pending"}>Pending</option>
                                    <option value={"in_progress"}>In Progress</option>
                                    <option value={"completed"}>Completed</option>



                                </SelectInput>

                                <InputError message={errors.status} className={"mt-2"}/>
                            </div>

                            {/*Task cancel, edit*/}
                            <div className={"mt-4 text-right"}>
                                <Link href={route('task.index')}
                                      className={"bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"}
                                >Cancel
                                </Link>

                                <button className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>
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
