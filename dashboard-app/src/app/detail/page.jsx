'use client';
import { GoClockFill } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { useEffect , useState } from "react";
import TiketCard from "./../../components/tiketCard";
import { BsCalendar2DateFill } from "react-icons/bs";

const gambar = [
    {
        url : '/images/event.webp',
        title : 'Incubus Asia Tour 2024',
        date : '2024-01-01',
        price : '950000',
        publisher : 'CK Star Entertaiment',
        clock : '20.00 - 24.00',
        description : 'INI EVENT TERBAIK',
        logo : '/images/logoincubus.webp'
    }
]

export default function Page(){

    const [data , setData] = useState({})
    const [tabOpen , setTabOpen] = useState(null)
    const [selectedMenu ,setSelectedMenu] = useState('')
    const [ticket, setTicket] = useState({})
    const [buy, setBuy] = useState([])

    const onSelect = (item, operation) => {
        const prevTicket = {...ticket} // {}
        
        // Check, Apakah id category ada di dalam object atau tidak?
        // Kalo ada, ticketExist = true
        // Kalo tidak, ticketExist = false
        let ticketExist = false
        for(let key in prevTicket){
            if(item.id == key) ticketExist = true
            // console.log(key)
            // console.log(prevTicket[key])
        }

        // {
        //     "1": {
        //         category: A, 
        //         quota: 1, 
        //         price: 10000
        //     }
        // }
        
        // Kalo ticketExist === false, Akan mengenerate data baru
        if(ticketExist === false && operation === '+'){
            console.log('If')
            prevTicket[item.id] = {
                category: item.category,
                quota: 1, 
                price: item.price
            }
        // Kalo ticketExist === true, maka akan mengupdate quota dan price
        }else if(ticketExist === true){
            if(operation === '+'){ 
                prevTicket[item.id].quota = prevTicket[item.id].quota + 1 
                prevTicket[item.id].price = item.price * prevTicket[item.id].quota
            }else{
                if(prevTicket[item.id].quota > 0){
                    prevTicket[item.id].quota = prevTicket[item.id].quota - 1
                    prevTicket[item.id].price = item.price * prevTicket[item.id].quota
                }
            }
        }
        
        const tempBuy = [] // [{}] Array of Object
        for(let key in prevTicket){
            prevTicket[key].quota > 0?tempBuy.push(prevTicket[key]):null
        }

        setTicket({...prevTicket})
        setBuy(tempBuy)
    }

    const fetchData = async() => {
        try {
            const res = await axios.get('http://localhost:8001/event/1')
           
            setData(res.data)
            setTabOpen(res.data.description)
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeTabOpen = (e) => {
        setTabOpen(data[e.target.getAttribute('name')])
        setSelectedMenu(e.target.getAttribute('name'))
    console.log()
    }

    useEffect(() =>{
        fetchData()
    },[])
    return (


        <container className="">
            {console.log(buy)}
            {gambar.map((item, index) =>{
                return (
                    <>
                    <div key={index} className=" h-full border">
                    <div className="text-xs breadcrumbs px-9">
                        <ul>
                            <li><a>Home</a></li> 
                            <li><a>Event</a></li> 
                            <li>Event Name</li>
                        </ul>
                    </div>
                        <div className="grid grid-cols-5 card-body">
                            <div className="grid justify-center col-span-3 ">
                                <img src={item.url} className="w-[100vw] h-[25vw] flex justify-center items-center" alt="Shoes" />
                            </div>
                            <div className="flex ml- card col-span-2 bg-base-100 shadow-xl">
                                <div className="card-body col-span-2 text-xxl flex">
                                    <h2 className="card-title">
                                    {item.title}
                                    </h2>
                                    <div className="flex">
                                    <BsCalendar2DateFill className="text-s mt-1 mr-1 " />
                                    {item.date}
                                    </div>
                                    <div className="flex">
                                    <GoClockFill className="text-2 mt-1 mr-1" />
                                    {item.clock}
                                    </div>
                                    <div className="flex">
                                    <IoLocationSharp className="text-2 mt-1 mr-1" />
                                        location
                                    </div>
                                    <div className="card-actions justify-end">
                                    </div>
                                    <hr />
                                    <div className="flex py-2 gap-5">
                                        <div>
                                            <div>
                                            <img src={item.logo} alt="shoes" className="w-[6vw]"/>
                                            </div>
                                        </div>
                                    
                                        <div className="justify-center items-center grid gap-1">
                                            <div className="">Diselenggarakan oleh</div>
                                            <div className="text-lg font-bold">{item.publisher}</div>  
                                        </div>
                                    </div>
                                
                                </div>       
                            </div>
                        </div>


                        <div className="grid grid-cols-5">
                                <div className="col-span-3">
                                    <div className="flex justify-center gap-2">
                                            <div name="description" onClick={(e) => onChangeTabOpen(e)} className={selectedMenu === 'description'?"bg-base-100 rounded-md border-b-4 border-b-indigo-500 h-[2vw] w-full flex justify-center":"bg-base-100 rounded-md border-b-4 h-[2vw] w-full flex justify-center"} >
                                            Description
                                            </div>
                                            <div name='tickets' onClick={(e) => onChangeTabOpen(e)} className={selectedMenu === 'tickets'?"bg-base-100 rounded-md border-b-4 border-b-indigo-500 h-[2vw] w-full flex justify-center":"bg-base-100 rounded-md border-b-4 h-[2vw] w-full flex justify-center"}>
                                            Tiket
                                            </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {
                                        typeof tabOpen === 'string'?
                                                tabOpen
                                            :
                                                typeof tabOpen === 'object'?
                                                    tabOpen?.map((item) => {
                                                        return(
                                                            <div className="">
                                                                <TiketCard item={item} onSelect={onSelect} stat={ticket} />
                                                            </div>
                                                        )
                                                    })
                                                :
                                                    null
                                        }
                                    </div>
                                </div>
                                <div className="flex ml-card col-span-2 bg-base-100 shadow-xl">
                                    <div className="card w-96 h-fit bg-base-100 shadow-xl">
                                            <div className="card-body">
                                                <p>Choose your ticket !!</p>
                                                <div>
                                                    {
                                                        buy?.map((itm, index) => {
                                                            return(
                                                                <div className='flex'>
                                                                    <div>
                                                                        {itm.category}
                                                                    </div>
                                                                    <div>
                                                                        {itm.price}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                    <div className="card-actions justify-center items-center">
                                                        <button className="btn btn-primary w-full">Buy Now</button>
                                                    </div>
                                            </div>
                                    </div>        
                                </div>
                        </div>
                    </div>
                    </>
                )
            })}
            
        </container>
    )
}
