import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddTask() {
    const Navi=useNavigate()

    const [data, setData] = useState()
    const createTask= async(e)=>{
        e.preventDefault()
        await Axios.post("https://task-manager-backend-ten-xi.vercel.app/task/create", data,{ headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
            alert(res.data.msg)
            Navi("/")
        }).catch(err => {
            switch (err.status) {
                case 404:
                    alert("Missing data")
                    break;
                case 500:
                    alert("Internal server error")
                    break;
                default:
                    alert("Unknown error ")
                    break;
            }
        })
    }
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="h-screen flex flex-col justify-center">
            <form onSubmit={createTask} className='flex flex-col items-center'>
            <h2 className='text-center font-bold text-3xl'>Create a Task</h2>
            <input onChange={onChangeHandler} className='w-3/4 sm:w-2/4 mx-2 my-2 border-b-2 py-2 px-4  border-blue-600 focus:outline-none' type="text" name='title' required placeholder='Enter Title' />
            <input onChange={onChangeHandler} className='w-3/4 sm:w-2/4 mx-2 my-2 border-b-2 py-2 px-4  border-blue-600 focus:outline-none' type="text" name='description' required placeholder='Enter Description' />
            <input className="w-3/4 sm:w-2/4 my-2 rounded-md cursor-pointer text-white bg-blue-600 py-2" type="submit" value="Create Task" />
            </form>
        </div>
    )
}
