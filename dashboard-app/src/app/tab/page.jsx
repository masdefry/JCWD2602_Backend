'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function Page(){

    const [data, setData] = useState({})
    const [tabOpen, setTabOpen] = useState(null)

    const fetchData = async() => {
        try {
            const res = await axios.get('http://localhost:5000/events/1')
            
            setData(res.data)
            setTabOpen(res.data.description)
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeTabOpen = (e) => {
        setTabOpen(data[e.target.getAttribute('name')])
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div>
            {console.log(data)}
            <div className="flex justify-center gap-10 py-10">
                <div name='description' onClick={(e) => onChangeTabOpen(e)} className="bg-blue-300 px-3 rounded-md">
                    Description 
                </div>
                <div name='tickets' onClick={(e) => onChangeTabOpen(e)} className="bg-blue-500 px-3 rounded-md">
                    Tickets 
                </div>
            </div>
            <div>
                {
                  typeof tabOpen === 'string'?
                        tabOpen
                    :
                        typeof tabOpen === 'object'?
                            tabOpen?.map((item) => {
                                return(
                                    <div>
                                        {item.category}
                                    </div>
                                )
                            })
                        :
                            null
                }
            </div>
        </div>
    )
}