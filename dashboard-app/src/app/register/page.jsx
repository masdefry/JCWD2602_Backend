'use client';

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Link from "next/link";

export default function Page(){

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, 'Username Must be 6 Characters')
            .required('Username is Required')
        , 
        email: Yup.string()
            .email('Invalid Email Address')
            .required('Email is Required')
        , 
        password: Yup.string()
            .min(6, 'Password Must be 6 Characters')
            .max(12, 'Password Maximum 12 Characters')
            .required('Password is Required')
    })

    const {mutate} = useMutation({
        mutationFn: async() => {
            try {
                
            } catch (error) {
            }
        },
        onSuccess: () => {
           
        },
        onError: (error) => {
            
        }
    })

    return(
        <>
            <section className="flex flex-col items-center">
                <Formik
                    initialValues={{username: '', email: '', password: '', role: 'ADMIN'}}
                    validationSchema={registerSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    <Form>
                        <div className="w-[500px] py-20">
                            <div className="pb-3">
                                <h1 className="text-3xl font-bold text-yellow-400">
                                    Register Admin
                                </h1>
                                <p>
                                    Register new admin to join with us!
                                </p>
                            </div>

                            <div className="py-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Username:</span>
                                    </div>
                                    <Field
                                        name="username"
                                        type="text"
                                    >{({field}) => (
                                        <input {...field} 
                                            placeholder="Type Username" 
                                            className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                        />
                                    )}
                                    </Field>
                                    <ErrorMessage 
                                        name="username"
                                    />
                                </label>
                            </div>
                            <div className="py-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Email:</span>
                                    </div>
                                    <Field
                                        name="email"
                                        type="email"
                                    >{({field}) => (
                                        <input {...field} 
                                            placeholder="Type Email" 
                                            className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                        />
                                    )}
                                    </Field>
                                    <ErrorMessage 
                                        name="email"
                                    />
                                </label>
                            </div>
                            <div className="py-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Password:</span>
                                    </div>
                                    <Field
                                        name="password"
                                        type="password"
                                    >{({field}) => (
                                        <input {...field}
                                            type="password" 
                                            placeholder="Type Password" 
                                            className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                        />
                                    )}
                                    </Field>
                                    <ErrorMessage 
                                        name="password"
                                    />
                                </label>
                            </div>
                            <div className="py-3">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Role:</span>
                                    </div>
                                    <Field
                                        as="select"
                                        name="role"
                                    >{({field}) => (
                                        <select {...field} className='border-2 border-gray w-full rounded-md py-2'>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                                        </select>
                                    )}
                                    </Field>
                                </label>
                            </div>
                            <button type="submit" className="btn bg-blue-500 text-white mt-3 w-full py-2 rounded-md">
                                Register 
                            </button>

                            <div className="flex justify-center py-5">
                                Forgot Account?
                            </div>
                        </div>
                    </Form>
                </Formik>
            </section>
        </>
    )
}