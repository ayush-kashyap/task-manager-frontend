import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMyOwnContext } from '../context/Context';
import { showBar, hideBar } from 'top-loading-progress-bar';
import { message, Spin } from 'antd';
import { postAPI } from '../utils/apiRequest';

export default function Login() {
    const { setLoggedIn } = useMyOwnContext()
    const [isLoading, setIsLoading] = useState(false)
    const Navi = useNavigate()
    const [data, setData] = useState()
    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const loginLoad = async (e) => {
        e.preventDefault()
        
        if (isValidPassword(data.password)) {
            setIsLoading(true);
            

            const successFn=(res)=>{
                if (res.success) {
                    localStorage.setItem("token", res.token)
                    setLoggedIn(res.token);
                    message.success(res.msg)
                    Navi('/')
                } 
                
            }
            const errorFn=(err)=>{
                switch (err.status) {
                    case 401:
                        message.error("Wrong Password")
                        break;
                    case 404:
                        message.error("User not found")
                        break;
                    default:
                        message.error("Unknown error ")
                        break;
                }
                setIsLoading(false);
            }

            postAPI("auth/userlogin",data,successFn,errorFn)
            
        } else
            message.error("Password not as per specifications")
            
    }
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className="h-screen flex flex-col justify-center">
            <Spin spinning={isLoading}>
            <form onSubmit={loginLoad} className='flex flex-col items-center'>
                <h2 className='text-center font-bold text-3xl'>Login to task Manager</h2>
                <input onChange={onChangeHandler} required className='w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter your email' type="email" name="email" id="email" />
                <input onChange={onChangeHandler} required className='w-3/4 sm:w-2/4 my-2 py-2 px-4 border-b-2 border-blue-600 focus:outline-none' placeholder='Enter you password' type="password" name="password" id="password" />
                <input className="w-3/4 sm:w-2/4 my-2 rounded-md cursor-pointer text-white bg-blue-600 py-2" type="submit" value="Login" />
            </form>
            </Spin>
        </div>
    )
}
