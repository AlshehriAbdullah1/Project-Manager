import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks,queryParams, hideProjectColumn =false,projectId}){

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
   return(
       <>
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

                       {!hideProjectColumn &&  <th onClick={e => sortChanged('name')} className="px-3 py-3">
                          Project Name

                       </th>}
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
                                      placeholder="Task Name"
                                      defaultValue={queryParams.name}
                                      onBlur={e => searchFiledChanged("name", e.target.value)}
                                      onKeyPress={e => onKeyPress("name", e)}

                           />

                       </th>

                       {!hideProjectColumn &&  <th  className="px-3 py-3"></th>}

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

                       <th className="px-3 py-3">
                           {/*<Link href={route("task.create",{'project':projectId})} className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>Add Task</Link>*/}

                       </th>
                   </tr>
                   </thead>
                   <tbody>

                   {tasks.data.map(task => (
                       <tr className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}
                           key={task.id}>
                           <td className={"px-3 py-2"}>{task.id}</td>
                           <td className={"px-3 py-2"}>
                               <img src={task.image_path} style={{width: 60}}/>
                           </td>
                           <td className={"px-3 py-2"}>{task.name}</td>
                           {!hideProjectColumn&&<td className={"px-3 py-2"}>{task.project.name}</td>}
                           <td className={"px-3 py-2"}>
                                            <span
                                                className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                           </td>
                           <td className={"px-3 py-2"}>{task.created_at}</td>
                           <td className={"px-3 py-2"}>{task.due_date}</td>
                           <td className={"px-3 py-2"}>{task.createdBy.name}</td>
                           <td className={"px-3 py-2"}>
                               <Link href={route('task.edit', task.id)}
                                     className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"

                               >

                                   Edit
                               </Link>

                               <Link href={route('task.destroy', task.id)}
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

           <Pagination links={tasks.meta.links}/>

       </>);
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
