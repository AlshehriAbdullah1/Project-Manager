import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({auth, projects,queryParams=null}) {

    queryParams = queryParams || {};
    const searchFiledChanged= (name,value)=>{
        if(value){
            queryParams[name]=value;

        }
        else{
            delete queryParams[name];
        }
        router.get(route('project.index'),queryParams)

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
            router.get(route('project.index'),queryParams)
        }

        else{
            queryParams.sort_field=name;
            queryParams.sort_direction= 'asc';
        }
    }

    const ArrowDirection = SortingArrow({direction: queryParams.sort_direction});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Projects</h2>}
        >

            <Head title="Projects"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/*<pre>{JSON.stringify(projects, undefined, 2)}</pre>*/}
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
                                        <th className="px-3 py-3">
                                            Image

                                        </th>
                                        <th onClick={e => sortChanged('name')} className="px-3 py-3">
                                            Name {
                                            queryParams?.sort_field?.toLowerCase() === 'name' ?
                                                <SortingArrow direction={queryParams.sort_direction}/> : null

                                        }

                                        </th>
                                        <th onClick={e => sortChanged('status')} className="px-3 py-3">
                                            Status
                                            {
                                                queryParams.sort_field?.toLowerCase() === 'status' ?
                                                    <SortingArrow direction={queryParams.sort_direction}/> : null

                                            }

                                        </th>
                                        <th onClick={e => sortChanged('created_at')} className="px-3 py-3">
                                            Create Date
                                        </th>
                                        <th onClick={e => sortChanged('due_date')} className="px-3 py-3">
                                            Due Date

                                        </th>
                                        <th className="px-3 py-3">
                                            Created By

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
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full"
                                                       placeholder="Project Name"
                                                       defaultValue={queryParams.name}
                                                       onBlur={e => searchFiledChanged("name", e.target.value)}
                                                       onKeyPress={e => onKeyPress("name", e)}

                                            />

                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput className="w-full"
                                                         onChange={e => searchFiledChanged("status", e.target.value)}
                                                         defaultValue={queryParams.status}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>

                                            </SelectInput>

                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>

                                        <th className="px-3 py-3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {projects.data.map(project => (
                                        <tr className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}
                                            key={project.id}>
                                            <td className={"px-3 py-2"}>{project.id}</td>
                                            <td className={"px-3 py-2"}>
                                                <img src={project.image_path} style={{width: 60}}/>
                                            </td>
                                            <th className={"px-3 py-2 text-white hover:underline text-nowrap  cursor-pointer"}>

                                                <Link href={route('project.show',project.id)}> {project.name}</Link>
                                               </th>
                                            <td className={"px-3 py-2"}>
                                            <span
                                                className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                            </td>
                                            <td className={"px-3 py-2"}>{project.created_at}</td>
                                            <td className={"px-3 py-2"}>{project.due_date}</td>
                                            <td className={"px-3 py-2"}>{project.createdBy.name}</td>
                                            <td className={"px-3 py-2"}>
                                                <Link href={route('project.edit', project.id)}
                                                      className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"

                                                >

                                                    Edit
                                                </Link>

                                                <Link href={route('project.destroy', project.id)}
                                                      className="mx-1 font-medium text-blue-600 hover:underline dark:text-red-500"

                                                >

                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={projects.meta.links}/>
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
