import React, { useState, } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Axios from 'axios'
import { message, Spin } from 'antd'
import { postAPI } from '../utils/apiRequest'

export default function Signup() {
    const Navi = useNavigate()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const signupLoad = async (e) => {
        e.preventDefault()
        
        if (isValidPassword(data.password)) {
            setIsLoading(true);
            
            
            const successFn=(res)=>{
                console.log(res);
                if (res.success) {
                    message.success(res.msg||"User Created Successfully")
                    Navi("/login");
                }
                setIsLoading(false);
            }
            const errorFn=(err)=>{
                console.log(err);
                switch (err.status) {
                    case 409:
                        message.error("User Already Exists")
                        break;
                    case 404:
                        message.error("Missing data")
                        break;
                    case 500:
                        message.error("Internal server error")
                        break;
                    default:
                        message.error("Unknown error ")
                        break;
                }
                setIsLoading(false);
            }

            postAPI("auth/usersignup",data,successFn,errorFn)
        } else
            alert("Password not as per specifications")
            
    }
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div  className="h-screen flex flex-col justify-center">

            <Spin spinning={isLoading}><form onSubmit={signupLoad} className='flex flex-col items-center'>
                <h2 className='text-center font-bold text-3xl'>Signup to task Manager</h2>
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter your name' type="text" name="name" id="name" />
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter your email' type="email" name="email" id="email" />
                <input onChange={onChangeHandler} required className=' w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter you password' type="password" name="password" id="password" />
                <em className='w-3/4 sm:w-2/4'><small>Password must contain at least 8 letters containing at least one uppercase, one lowercase, number and a special character</small></em>
                <input className=" w-3/4 sm:w-2/4 my-2 rounded-md cursor-pointer text-white bg-blue-600 py-2" type="submit" value="Signup" />
                <p>Already have an account? <Link className='text-blue-600 font-semibold' to='/login'>Login</Link></p>
            </form>
            </Spin>
        </div>
    )
}
