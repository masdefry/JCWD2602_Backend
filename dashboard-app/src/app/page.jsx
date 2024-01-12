import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className='px-10 py-10 flex justify-between items-center border border-bottom'>
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li><a>Home</a></li>
            </ul>
          </div>
          <div>
            <h1 className='font-bold text-2xl'>
              Create Product
            </h1>
          </div>
        </div>

        <div>
          {/* Create Product */}
          <button className="btn btn-primary w-[150px]">
            Create Product
          </button>
        </div>
      </div>

      <div className='p-10'>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
