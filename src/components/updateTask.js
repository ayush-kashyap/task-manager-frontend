import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { showBar,hideBar } from 'top-loading-progress-bar'

export default function UpdateTask() {
    const Navi=useNavigate()
    const param = useParams()
    useEffect(() => {
        const efunc = async () => {
            await Axios.get(`https://task-manager-backend-ten-xi.vercel.app/task/readsingle/${param.id}`, { headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
                setData(res.data.tasks)
            }).catch(err => {
                alert("Some Error occured")
            })
        }
        efunc()
    },[])
    const [data, setData] = useState()
    const updateTask = async (e) => {
        e.preventDefault()
        showBar()
        await Axios.put("https://task-manager-backend-ten-xi.vercel.app/task/update", data, { headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
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
        hideBar()
    }
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="h-screen flex flex-col justify-center">
            {data ? <form onSubmit={updateTask} className='flex flex-col items-center'>
                <h2 className='text-center font-bold text-3xl'>Update Task</h2>
                <input onChange={onChangeHandler} className='w-3/4 sm:w-2/4 mx-2 my-2 border-b-2 py-2 px-4  border-blue-600 focus:outline-none' type="text" value={data.title} name='title' required placeholder='Enter Title' disabled />
                <input onChange={onChangeHandler} className='w-3/4 sm:w-2/4 mx-2 my-2 border-b-2 py-2 px-4  border-blue-600 focus:outline-none' type="text" value={data.description} name='description' required placeholder='Enter Description' disabled />
                <select name="status" onChange={onChangeHandler} className='w-3/4 sm:w-2/4 mx-2 my-2 border-b-2 py-2 px-4  border-blue-600 focus:outline-none'>
                    <option value="" disabled selected>Select an option</option>
                    <option value="To Do" >To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <input className="w-3/4 sm:w-2/4 my-2 rounded-md cursor-pointer text-white bg-blue-600 py-2" type="submit" value="Update Task" />
            </form> : null}
        </div>
    )
}
