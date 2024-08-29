import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMyOwnContext } from '../context/Context'
import Axios from 'axios'
export default function Home() {
    const { getUser, handleLogout, setUser, user, getTask } = useMyOwnContext()
    const [loading, setloading] = useState(true)
    const [task, setTask] = useState()
    const [count, setCount] = useState(0)
    useEffect(() => {
        const efunc = async () => {
            await getUser().then(res => {
                setUser(res.details)
                setloading(false)
            }).catch(err => alert("some error occurred"))
        }
        efunc()
    }, [])

    useEffect(() => {
        const efunc2 = async () => {
            await getTask().then(res => {
                setTask(res.tasks)
            }).catch(err => alert("some error occurred"))
        }
        efunc2()
    }, [count])

    const deleteTask = async (e) => {
        await Axios.delete(`https://task-manager-backend-ten-xi.vercel.app/task/delete/${e.target.value}`, { headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
            if (res.status === 204) {
                alert("Deleted!")
                setCount(count + 1)
            }
        }).catch(err => {
            alert('error')
        })
    }
    return (
        <div className='h-screen'>
            {loading ? "Loading..." : <div className='px-8'> <header className='flex justify-between h-24 sm:h-16 items-center'>
                <h2 className='font-bold text-2xl'>Welcome, {user.name}</h2>
                <Link to="/" onClick={handleLogout} className='focus:outline-none bg-blue-600 py-2 px-4 text-white rounded-md'>Logout</Link>
            </header>
                <hr />
                <div>
                    <span className='flex sm:flex-row flex-col justify-between my-2'>
                        <h2 className='font-bold text-xl mb-4 sm:mb-0'>Your tasks</h2>
                        <Link to="/add-new" className='text-center focus:outline-none bg-blue-600 py-2 px-4 text-white rounded-md'>Add New Task</Link>
                    </span>
                    {
                        task ?
                            <div className='flex flex-wrap justify-center  sm:justify-start'>
                                
                                {task.map((item,i) => {
                                    return (
                                            <div className='flex min-w-64 max-w-64 flex-col py-4 px-8 border-2 rounded-md my-2 mx-2'>
                                                <h3 className='text-xl font-bold my-2'>Task {i+1}</h3>
                                                <span className='my-1'><b>Title : </b>{item.title}</span>
                                                <span className='overflow-clip my-1'><b>Description : </b>{item.description}</span>
                                                <span className='my-1'><b>Status : </b>{item.status}</span>
                                                <span className='flex flex-con mt-2'>
                                                {item.status==="Done"?null:<Link to={`/update/${item._id}`} className='mx-2 text-center bg-blue-600 py-2 px-4 text-white rounded-md'>Edit</Link>}
                                                <button onClick={deleteTask} className=' mx-2 bg-blue-600 py-2 px-4 text-white rounded-md' value={item._id}>Delete</button>
                                                </span>
                                            </div>
                                            
                                    )
                                })}</div> : null}
                </div>
            </div>

            }
        </div>
    )
}
