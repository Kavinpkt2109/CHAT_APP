import React from 'react'

const Home = () => {
    return (
        <div className='mx-10'>
            <div className='justify-center text-center  bg-gray-200 rounded-lg w-full  	'>
                <h1 className='text-left p-5 text-2xl font-bold'>Groups</h1>


            </div>
            <div className='justify-right text-right   '>
                <button className='px-10 rounded-lg m-10 border-solid-100 bg-green-500 py-3'>Create New +</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className=" transition duration-300 hover:bg-blue-200 p-2 border-solid-300 border max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                    <p>jhb </p>
                </div>


            </div>
            <div className="bg-cover bg-center h-72 w-1/3 " style={{ backgroundImage: `url(${require('../vadivel.jpeg')})`, "border-radius": 500, height: '20rem' }}>
                <p> </p>
            </div>


            <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50   ">
                <div
                    className={`bg-white rounded-lg shadow-lg lg:h-96 p-6 w-96 transform transition-all duration-300 ease-in-out translate-y-[-100%] animate-slide-down`}
                >
                    <h2 className="text-2xl font-bold mb-4">Create Group</h2>
                    <form >
                        <div className="mb-4">
                            <label className="block text-gray-700">Name of Group</label>
                            <input
                                type="text"
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="border rounded w-full p-2"
                                required
                            />
                        </div>

                        <div className="flex justify-end ">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>





        </div>
    )
}

export default Home