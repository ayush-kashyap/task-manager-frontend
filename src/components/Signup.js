import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

export default function Signup() {
    const [data, setData] = useState()
    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const signupLoad = async (e) => {
        e.preventDefault()
        if (isValidPassword(data.password)) {
            await Axios.post("https://task-manager-backend-ten-xi.vercel.app/auth/usersignup", data).then(res => {
                if (res.data.success) {
                    alert(res.data.msg)
                }
            }).catch(err => {
                switch (err.status) {
                    case 409:
                        alert("User Already Exists")
                        break;
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
        } else
            alert("password not as per specifications")

    }
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="h-screen flex flex-col justify-center">

            <form onSubmit={signupLoad} className='flex flex-col items-center'>
                <h2 className='text-center font-bold text-3xl'>Signup to task Manager</h2>
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter your name' type="text" name="name" id="name" />
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter your email' type="email" name="email" id="email" />
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter you password' type="password" name="password" id="password" />
                <em className='w-3/4 sm:w-2/4'><small>Password must contain at least 8 letters containing at least one uppercase, one lowercase, number and a special character</small></em>
                <input className=" w-3/4 sm:w-2/4 my-2 rounded-md cursor-pointer text-white bg-blue-600 py-2" type="submit" value="Signup" />
                <p>Already have an account? <Link className='text-blue-600 font-semibold' to='/login'>Login</Link></p>
            </form>
        </div>
    )
}
