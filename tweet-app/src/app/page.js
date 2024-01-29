'use client'
import Image from "next/image";
import {useState} from 'react';

export default function Home() {

  const [tweet, setTweet] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className='flex justify-center w-[100vh] max-w-[100vh]'
      >
        <div
          className='flex flex-col gap-3 w-full'
        >
          <div
            className='flex flex-col gap-2'
          >
            <h1
              className='text-lg font-bold'
            >
              Filtering Your Tweet:
            </h1>
            <p>
              {tweet}
            </p>
          </div>
          <input type='text' 
            onChange={(e) => setTweet(e.target.value)}
            className='px-2 py-2 border-2 border-blue-500 rounded-md'
          />
          <button className='btn bg-blue-500 text-white py-2 rounded-md'>
            Tweet  
          </button>  
        </div>  
      </div>
    </main>
  );
}
