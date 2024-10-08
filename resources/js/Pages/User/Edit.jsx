import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";


export default function Edit ({auth,user}) {
    // console.log('user is : ');

const {data,setData, post, processing, errors , reset}= useForm({
    name:user.name||'',
    email:user.email|| '',
    password: '',
    password_confirmation: '',
    _method:"PUT",

})

    const onSubmit = (e)=>{
    e.preventDefault();
    // console.log("submit requested!");
        post(route('user.update', user.id)
            );
}


    return (
        <Authenticated
            header={
                <div className={"flex justify-between items-center"}>

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Edit User {user.name}</h2>
                </div>

            }
            user={auth.user}

        >
            <Head title="Users"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">

                        <form onSubmit={onSubmit}
                              className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"}>
                            {/*User Image*/}

                            {/*<div>*/}
                            {/*    <img src={user.image_path}*/}
                            {/*         alt=""*/}
                            {/*         className={"w-full h-64 object-cover"}/>*/}
                            {/*</div>*/}
                            {/*User Name*/}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"user_name"} value={"User Name"}/>
                                <TextInput id={"user_name"}
                                           type={"text"}
                                           name={"name"}
                                           isFocused={true}
                                           value={data.name}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('name', e.target.value)}

                                />
                                <InputError message={errors.name} className={"mt-2"}/>
                            </div>
                            {/* User email  */}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"user_email"} value={"User Email"}/>
                                <TextInput id={"user_email"}
                                           type={"text"}
                                           name={"email"}
                                           value={data.email}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('email', e.target.value)}

                                />
                                <InputError message={errors.email} className={"mt-2"}/>
                            </div>
                            {/* User password  */}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"user_password"} value={"Password"}/>
                                <TextInput id={"user_password"}
                                           type={"password"}
                                           name={"password"}
                                           value={data.password}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('password', e.target.value)}

                                />
                                <InputError message={errors.password} className={"mt-2"}/>
                            </div>
                            {/* User password confirm */}
                            <div className={"mt-4"}>
                                <InputLabel htmlFor={"user_password_confirmation"} value={"Confirm Password"}/>
                                <TextInput id={"user_password_confirmation"}
                                           type={"password"}
                                           name={"user_password_confirmation"}
                                           value={data.password_confirmation}
                                           className={"mt-1 block w-full"}
                                           onChange={e => setData('password_confirmation', e.target.value)}

                                />
                                <InputError message={errors.email} className={"mt-2"}/>
                            </div>



                            <div className={"mt-4 text-right"}>
                                <Link href={route('user.index')}
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
