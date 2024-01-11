'use client'

import {useEffect} from 'react';
import axios from 'axios';

export default function Page({params}){
    useEffect(() => {
        axios.patch('http://localhost:5000/admin/verified', null, {
            headers: {
                'authorization': params.slug
            }
        })
    }, [])
    return(
        <h1>
            Please Wait...
        </h1>
    )
}