import React from 'react'

export default function TrendingCards() {
    return (

        <div className='shadow-lg p-4 my-4 h-full  bg-white rounded-lg'>

            {/* // trending confesssions */}

            <h1 className='text-lg font-bold'>Trending Confessions</h1>

            <div className='mt-2 overflow-y-auto h-96 overflow-x-hidden'
                style={{
                    paddingBottom: '120px',
                    scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent',
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                }}>

                <div className='shadow-lg  bg-white rounded-lg mb-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <img
                                src='./images/Avatar.jpg'
                                alt='profile'
                                className='rounded-full'
                                width='40'
                                height='40'
                            />
                            <div>
                                <p className='font-semibold text-sm'>John Doe</p>
                                {/* time */}
                                <p className='text-gray-500 text-xs'>2 hours ago</p>
                            </div>
                        </div>

                    </div>
                    <div className='mt-2'>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                            voluptatibus, quibusdam, doloribus, quos officiis quia
                            exercitationem quas voluptate quod aperiam
                        </p>

                        {/* // read more gray color text */}
                        <p className='text-gray-500 text-xs '>Read More</p>

                    </div>


                </div>
                <div className='shadow-lg  bg-white rounded-lg mb-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <img
                                src='./images/Avatar.jpg'
                                alt='profile'
                                className='rounded-full'
                                width='40'
                                height='40'
                            />
                            <div>
                                <p className='font-semibold text-sm'>John Doe</p>
                                {/* time */}
                                <p className='text-gray-500 text-xs'>2 hours ago</p>
                            </div>
                        </div>

                    </div>
                    <div className='mt-2'>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                            voluptatibus, quibusdam, doloribus, quos officiis quia
                            exercitationem quas voluptate quod aperiam
                        </p>

                        {/* // read more gray color text */}
                        <p className='text-gray-500 text-xs '>Read More</p>

                    </div>


                </div>
                <div className='shadow-lg  bg-white rounded-lg mb-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <img
                                src='./images/Avatar.jpg'
                                alt='profile'
                                className='rounded-full'
                                width='40'
                                height='40'
                            />
                            <div>
                                <p className='font-semibold text-sm'>John Doe</p>
                                {/* time */}
                                <p className='text-gray-500 text-xs'>2 hours ago</p>
                            </div>
                        </div>

                    </div>
                    <div className='mt-2'>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                            voluptatibus, quibusdam, doloribus, quos officiis quia
                            exercitationem quas voluptate quod aperiam
                        </p>

                        {/* // read more gray color text */}
                        <p className='text-gray-500 text-xs '>Read More</p>

                    </div>


                </div>



            </div>

            
        </div>
    )
}
