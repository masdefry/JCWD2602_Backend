import Image from 'next/image';

const fetchProducts = async() => {
  try {
    const res = await fetch('http://localhost:5000/product', {
      method: 'GET',
      cache: 'no-store'
    })

    return res.json()
  } catch (error) {
    return error
  }
}

export default async function Home() {

  const {data: products} = await fetchProducts()
  console.log('>>>>>>')
  console.log(products)
  console.log('<<<<<<')

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

      <div className='flex'>
        {
          products?.map((item, index) => {
            return(
              <div className='p-10'>
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure>
                    <Image 
                      src={`http://localhost:5000/public/image/${item?.ProductImages[0]?.url}`}
                      width={100}
                      height={100}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-red-500 text-white">Delete Product</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}
