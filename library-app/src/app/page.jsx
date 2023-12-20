'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState(0)
  const [stocks, setStocks] = useState([])

  const {data} = useQuery({
    queryFn: async() => {
      try {
        let findCategoryAndBranch = await fetch('http://localhost:5000/category-branch')
        findCategoryAndBranch = await findCategoryAndBranch.json()
        
        return findCategoryAndBranch.data // {findCategories, findBranches}
      } catch (error) {
        console.log(error)
      }
    }
  })

  const onAddStock = (e) => {
    setSelectedBranch(e.target.value)
  }

  const onInputStocks = (e) => {
    const currentStocks = [...stocks] 
    currentStocks[selectedBranch] = e.target.value
    setStocks(currentStocks) 
  }

  return (
    <main className="flex flex-col items-center gap-5 w-full py-10">
          <h1 className="text-3xl">
            Create New Book
          </h1>
          <div>
            <input type="text" placeholder="Input Book Title" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <div>
            <input type="text" placeholder="Input Publisher" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <div>
            <input type="text" placeholder="Input Publish Year" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <select onChange={(e) => onAddStock(e)} className="border border-gray-300 w-[500px] h-[40px] rounded px-5">
            {
              data?.findBranch?.map((item, index) => {
                return(
                  <option value={index}>{item.name}</option>
                )
              })
            }
          </select> 
          <div className='pb-10'>
            <input value={typeof(stocks[selectedBranch]) === 'undefined'? '' : stocks[selectedBranch]} onChange={(e) => onInputStocks(e)} type="text" placeholder="Stocks Branch" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <select className="border border-gray-300 w-[500px] h-[40px] rounded px-5">
            {
              data?.findCategories?.map((item, index) => {
                return(
                  <option>{item.name}</option>
                )
              })
            }
          </select> 
          <button className="btn bg-blue-500 text-white w-[500px] h-[40px] rounded px-5">
            Create New Book
          </button>
    </main>
  )
}
