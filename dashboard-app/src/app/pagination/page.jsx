'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const fetchData = async({searchParams}) => {
    try {
        const res = await fetch(`http://localhost:5000/product?page=${searchParams}`, {
            method: 'GET',
            cache: 'no-store'
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export default async function Page(){

    const searchParams = useSearchParams().get('page')
    
    const {data} = await fetchData({searchParams})

    const {products, totalPage, arrPage} = data
    
    return(
        <div>
            {
                products?.map((item, index) => {
                    return(
                        <div key={index} className="bg-blue-300">
                            {item.name}
                        </div>
                    )
                })
            }

            <div className="flex gap-3">
                {arrPage.map(item => {
                    return(
                        <div className={searchParams == item? "bg-blue-300 px-3 py-3 rounded-md" : "border border-blue-300 px-3 py-3 rounded-md"}>
                            <Link href={`/pagination?page=${item}`}>
                                {item}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}