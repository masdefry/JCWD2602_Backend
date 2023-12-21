'use client';

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState([])
  const [stocks, setStocks] = useState([])
  const [categoryId, setCategoryId] = useState([])

  const inputTitle = useRef()
  const inputPublisher = useRef()
  const inputPublishYear = useRef()

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

  const {mutate} = useMutation({
    mutationFn: async() => {
      try {
        await fetch('http://localhost:5000/admin', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: inputTitle.current.value,
            publisher: inputPublisher.current.value, 
            publish_year: inputPublishYear.current.value, 
            branch_id: stocks, 
            category_id: categoryId
          }),
        })
      } catch (error) {
        console.log(error)
      }
    }
  })

  const onAddStock = (e) => {
    setSelectedBranch([e.target.value.split(',')[0], e.target.value.split(',')[1]]) // [1, 0]
  }

  const onInputStocks = (e) => {
    console.log(selectedBranch)
    const currentStocks = [...stocks] 
    currentStocks[selectedBranch[0]] = [selectedBranch[1], e.target.value]
    console.log(currentStocks)
    setStocks(currentStocks) 
  }

  const onAddCategory = (e) => {
    const currentCategoryId = [...categoryId]
    currentCategoryId.push([e.target.value])
    setCategoryId(currentCategoryId)
  }

  return (
    <main className="flex flex-col items-center gap-5 w-full py-10">
          <h1 className="text-3xl">
            Create New Book
          </h1>
          <div>
            <input type="text" ref={inputTitle} placeholder="Input Book Title" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <div>
            <input type="text" ref={inputPublisher} placeholder="Input Publisher" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <div>
            <input type="text" ref={inputPublishYear} placeholder="Input Publish Year" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          <select onChange={(e) => onAddStock(e)} className="border border-gray-300 w-[500px] h-[40px] rounded px-5">
            <option>Select Your Branch</option>
            {
              data?.findBranch?.map((item, index) => {
                return(
                  <option value={`${index},${item.id}`}>{item.name}</option>
                )
              })
            }
          </select> 
          <div className='pb-10'>
            <input value={typeof(stocks[selectedBranch[0]]) === 'undefined'? '' : stocks[selectedBranch]} onChange={(e) => onInputStocks(e)} type="text" placeholder="Stocks Branch" className="border border-gray-300 w-[500px] h-[40px] rounded px-5" />
          </div>
          {JSON.stringify(categoryId)}
            {
              data?.findCategories?.map((item, index) => {
                return(
                  <div className='flex'>
                    <input type='checkbox' value={item.id} onChange={(e) => onAddCategory(e)} />{item.name}
                  </div>
                )
              })
            }
          <button onClick={() => mutate()} className="btn bg-blue-500 text-white w-[500px] h-[40px] rounded px-5">
            Create New Book
          </button>
    </main>
  )
}
