import React from 'react'

export default function AddConfessionForm() {
    return (
        
        <div className=' overflow-y-auto overflow-x-hidden'
        style={{
          scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
        }}>

            <div className="flex justify-center">
                <img src='./images/confession.jpg' alt='confession' className='rounded-lg '
                    width='auto' height='auto'
                />
            </div>
            <div className="flex flex-col gap-4 p-4">


                {/* // select name profile name or anonymous */}
                <select className="w-full p-4 border-2 border-gray-300 rounded-lg">
                    <option value="Profile Name">Profile Name</option>
                    <option value="Anonymous">Anonymous</option>
                </select>


                <textarea placeholder="Confession" className="w-full p-4 border-2 border-gray-300 rounded-lg" rows={4} />
                <button className="p-2 bg-blue-500 text-white rounded-lg">Submit</button>
            </div>




        </div>
    )
}
