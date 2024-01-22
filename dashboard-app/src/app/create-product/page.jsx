'use client';

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

export default function Page(){

    const [files,setFiles] = useState([])

    const onSetFiles = (event) => {
        // {{}, {}, {}}
        const arrFiles = [...event.target.files] // [{}, {}, {}]
        
        if(arrFiles.length > 3 || arrFiles.length === 0) return alert('Maximum 3 Images Only!')

        arrFiles.forEach(item => {
            if(item.type.split('/')[0] !== 'image')  return alert('File Must be Image!')
            if(item.size > 5000000000) return alert(`${item.name} Size too Large. Maximum Size 5Byte!`)
        })

        setFiles(arrFiles)
    }

    const createProductSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Product Name Have Minimum 10 Characters')
            .max(50, 'Product Name Have Maximum 10 Characters')
            .required('Product Name is Required')
        , 
        price: Yup.number()
            .min(1, 'Product Price Minimum = Rp. 1')
            .required('Product Price is Required')
        ,   
        description: Yup.string()
            .min(3, 'Product Description Have Minimum 10 Characters')
            .max(50, 'Product Description Have Maximum 10 Characters')
            .required('Product Description is Required')
        ,
        stock: Yup.number()
            .min(1, 'Product Stock Minimum = 1')
            .required('Product Stock is Required')
    })

    const {mutate} = useMutation({
        mutationFn: async({name, price, description, stock}) => {
            const fd = new FormData()
            fd.append('bebas1', JSON.stringify({name, price, description, stock}))

            /*
                {{key, file}, {key, file}, {key, file}}
            */
            files.forEach(item => {
                console.log(item)
                fd.append('bebas', item)
            })

            const res = await axios.post('http://localhost:5000/product', body, {
                headers: 
                {
                    'auth': 'token'
                }
            })
            console.log(res)
        },
        onSuccess: () => {
            alert('Success')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return(
        <>
            <section className="flex flex-col items-center">
                <Formik
                    initialValues={{name: '', price: '', description: '', stock: ''}}
                    validationSchema={createProductSchema}
                    onSubmit={async(values) => {
                        const {name, price, description, stock} = values

                        if(files.length === 0) return alert('Select Images First!')

                        await mutate({name, price, description, stock})
                    }}
                >
                    {({dirty, isValid}) => (
                        <Form>
                            <div className="w-[500px] py-20">
                                <div className="pb-3">
                                    <h1 className="text-3xl font-bold text-yellow-400">
                                        Create Product
                                    </h1>
                                    <p>
                                        Create new product
                                    </p>
                                </div>

                                <div className="py-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Name:</span>
                                        </div>
                                        <Field
                                            name="name"
                                            type="text"
                                        >{({field}) => (
                                            <input {...field} 
                                                placeholder="Enter Product Name" 
                                                className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                            />
                                        )}
                                        </Field>
                                        <ErrorMessage 
                                            name="name"
                                        />
                                    </label>
                                </div>
                                <div className="py-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Price:</span>
                                        </div>
                                        <Field
                                            name="price"
                                        >{({field}) => (
                                            <input {...field} 
                                                type="number"
                                                placeholder="Enter Product Price" 
                                                className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                            />
                                        )}
                                        </Field>
                                        <ErrorMessage 
                                            name="price"
                                        />
                                    </label>
                                </div>
                                <div className="py-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Description:</span>
                                        </div>
                                        <Field
                                            name="description"
                                            type="text"
                                        >{({field}) => (
                                            <input {...field} 
                                                placeholder="Enter Product Description" 
                                                className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                            />
                                        )}
                                        </Field>
                                        <ErrorMessage 
                                            name="description"
                                        />
                                    </label>
                                </div>
                                <div className="py-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Stock:</span>
                                        </div>
                                        <Field
                                            name="stock"
                                        >{({field}) => (
                                            <input {...field} 
                                                type="number"
                                                placeholder="Enter Product Stock" 
                                                className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                            />
                                        )}
                                        </Field>
                                        <ErrorMessage 
                                            name="stock"
                                        />
                                    </label>
                                </div>
                                <div className="py-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Select Images:</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => onSetFiles(event)}
                                            placeholder="Enter Product Stock" 
                                            className="input border-2 border-gray rounded-md w-full px-2 py-2" 
                                        />
                                    </label>
                                </div>
                                <button type="submit" 
                                    disabled={!(dirty && isValid)}
                                    className="btn bg-blue-500 text-white mt-3 w-full py-2 rounded-md"
                                >
                                    Create Product 
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    )
}