import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Edit ({auth,project}) {
    // console.log('project is : ');
    // console.log(project);

const {data,setData, post, processing, errors , reset}= useForm({
    image:null,
    name:project.name||'',
    status:project.status|| '',
    description:project.description|| '',
    due_date:project.due_date|| '',
    _method: 'PUT'
})

    const onSubmit = (e)=>{
    e.preventDefault();
    // console.log("submit requested!");
    console.log(data);
        post(route('project.update', project.id)
            );
}


    return (
        <Authenticated
            header={
                <div className={"flex justify-between items-center"}>

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit Project {project.name}</h2>
                </div>

            }
            user={auth.user}

        >
            <Head title="Projects"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">

                        <form onSubmit={onSubmit}
                              className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"}>
                            {/*Project Image*/}
                            {project.image_path && <div className={"mb-4"}>
                                <img src={project.image_path} alt={""} className={"w-64"}/>
                            </div>}
                            {/*<div>*/}
                            {/*    <img src={project.image_path}*/}
                            {/*         alt=""*/}
                            {/*         className={"w-full h-64 object-cover"}/>*/}
                            {/*</div>*/}
                            <div>
                                <InputLabel htmlFor={"project_image_path"} value={"Project Image"}/>
                                <input id={"project_image_path"}
                                           type={"file"}
                                           name={"image"}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData(// Preserve the rest of the form data
                                               'image', e.target.files[0] // Only update the image field
                                           )}

                                />
                                <InputError message={errors.image} className={"mt-2"}/>
                            </div>
                            {/*Project Name*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"project_name"} value={"Project Name"}/>
                                <TextInput id={"project_name"}
                                           type={"text"}
                                           name={"name"}
                                           value={data.name}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('name', e.target.value)}

                                />
                                <InputError message={errors.name} className={"mt-2"}/>
                            </div>
                            {/*Project Description*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"project_description"} value={"Project Description"}/>

                                <TextAreaInput id={"project_description"}
                                               type={"text"}
                                               name={"description"}
                                               value={data.description}
                                               className={"mt-1 block w-full"}
                                               onChange={e => setData('description', e.target.value)}

                                />
                                <InputError message={errors.description} className={"mt-2"}/>
                            </div>
                            {/*    Project Due Date*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"project_due_date"} value={"Project Deadline"}/>
                                <TextInput id={"project_due_date"}
                                           type={"date"}
                                           name={"due_date"}
                                           value={data.due_date}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('due_date', e.target.value)}

                                />
                                <InputError message={errors.due_date} className={"mt-2"}/>
                            </div>

                            {/*    Project Status*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"project_status"} value={"Project Status"}/>
                                <SelectInput name={"status"}
                                             id={"project_status"}
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


                            <div className={"mt-4 text-right"}>
                                <Link href={route('project.index')}
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
