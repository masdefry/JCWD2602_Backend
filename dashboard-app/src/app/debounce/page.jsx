'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

export default function Page(){
    const [search, setSearch] = useState('')
    const [searchText] = useDebounce(search, 1000)
    const [dataSearch, setDataSearch] = useState([])

    const fetchData = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/foods?name=${searchText}`)
            setDataSearch(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchText])

    return(
        <>
            <div
                className='flex justify-center'
            >
                <input type='text'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Enter your search' 
                    className='input border-gray-300' 
                />
            </div>
            <div className='bg-gray-500 flex justify-center'>
                {
                    dataSearch.length?
                        dataSearch.map((item, index) => {
                            return(
                                <div>
                                    {item.name}
                                </div>
                            )
                        })
                    :
                        null
                }
            </div>
            <div className='flex flex-col items-center'>
                <h6>
                    Actual Value: {search}
                </h6>
                <h6>
                    Debounce Value: {searchText}
                </h6>
            </div>
        </>
    )
}