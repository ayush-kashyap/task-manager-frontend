import React, { useEffect, useState } from 'react'
import {  Link ,useNavigate} from 'react-router-dom'
import { useMyOwnContext } from '../context/Context'
import Axios from 'axios'
import {Input,Form, Modal, Select,Spin,message, Button, Row,Col, Card} from "antd";
import {getAPI} from "../utils/apiRequest";
import { useForm } from 'antd/es/form/Form';
import { DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function Home() {
    const Navi=useNavigate();
    const [formRef]=useForm();
    const [messageAPI,contextHolder]=message.useMessage();
    const { getUser, handleLogout, setUser, user } = useMyOwnContext()
    const [loading, setloading] = useState(true)
    const [value, setValue] = useState('')
    const [modalLoading, setModalLoading] = useState(false)
    const [taskEditLoader, setTaskEditLoader] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [task, setTask] = useState()
    const [modalData, setModalData] = useState(null)
    const [count, setCount] = useState(0)
    const createTask= async(values)=>{
        setModalLoading(true);
        await Axios.post("https://task-manager-backend-ten-xi.vercel.app/task/create", values,{ headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
            message.success(res.data.msg)
            formRef.resetFields()
            setModalOpen(false)
        }).catch(err => {
            switch (err.status) {
                case 404:
                    message.error("Bad request")
                    break;
                case 500:
                    message.error("Internal server error")
                    break;
                default:
                    message.error("Unknown error ")
                    break;
            }
        })
        setModalLoading(false);
    }
    const updateTask = async (taskData,status) => {
        setTaskEditLoader(true);
        taskData.status=status;
        await Axios.put("https://task-manager-backend-ten-xi.vercel.app/task/update", taskData, { headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
            message.success(res.data.msg)
        }).catch(err => {
            switch (err.status) {
                case 404:
                    message.error("Bad request")
                    break;
                case 500:
                    message.error("Internal server error")
                    break;
                default:
                    message.error("Unknown error ")
                    break;
            }
        })
        setTaskEditLoader(false);
    }
    useEffect(() => {
        const efunc = async () => {
            await getUser().then(res => {
                setUser(res.details)
                setloading(false)
            }).catch(err => message.error("some error occurred"))
        }
        efunc()
    }, [])

    useEffect(() => {
        getTasks();
    },[])


    const getTasks = async () => {
        const apiParams = {
        };
        const successFn=(res)=>{
            setTask(res?.tasks)
        };
        const errorFn=(err)=>{
            messageAPI.open({
                type:"error",
                content:err.response.data.detail});
        };

        getAPI("task/read",apiParams,successFn,errorFn);
    }
    const deleteTask = async (e) => {
        setTaskEditLoader(true);
        await Axios.delete(`https://task-manager-backend-ten-xi.vercel.app/task/delete/${e._id.toString()}`, { headers: { "Authorization": localStorage.getItem("token") } }).then(res => {
            if (res.status === 204) {
                message.success("Deleted!")
                getTasks();
            }
        }).catch(err => {
            message.error('Error deleting')
        })
        setTaskEditLoader(false);
    }
    return (
        <div className='h-screen'>
            <Spin spinning={loading}> 
            <div className='px-8'> <header className='flex justify-between h-24 sm:h-16 items-center'>
                <h2 className='font-bold text-2xl'>Welcome, {user?.name}</h2>
                <Button onClick={()=>{
                    handleLogout();
                    Navi("/")
                    }}  type='primary'>Logout</Button>
            </header>
                <hr />
                <div>
                    <span className='flex sm:flex-row flex-col justify-between my-2'>
                        <h2 className='font-bold text-xl mb-4 sm:mb-0'>Your tasks</h2>
                        <Button type='primary' onClick={()=>setModalOpen(true)}>Add New Task</Button>
                    </span>
                    {
                        task ?
                        <Spin spinning={taskEditLoader}>
                            <Row gutter={[10,10]}>
                                
                                {task.map((item,i) => {
                                    return (
                                        
                                            <Col xs={24} md={8} xl={6}>
                                                
                                            <Card
                                            key={item.id}
                                            title={<Row align={"middle"} justify={"space-between"}> <h3 className='text-xl font-bold my-2'>Task {i+1}</h3> <Button danger onClick={()=>deleteTask(item)} >Delete <DeleteOutlined/></Button></Row>}
                                            >
                                                
                                                <Row ><Col md={8} xs={24}><b>Title :</b></Col><Col md={16} xs={24}>{item.title}</Col></Row>
                                                <Row ><Col md={8} xs={24}><b>Description :</b> </Col><Col md={16} xs={24} onClick={()=>setModalData(item)} className="truncate cursor-pointer">{item?.short_description}</Col></Row>
                                                <Row align={"middle"} ><Col md={8} xs={24}><b>Status : </b> </Col><Col md={16} xs={24}><Select
                                                style={{ width: "100%" }}
                                                onChange={(val)=>{
                                                    updateTask(item,val);
                                                }}
                                                
                                                defaultValue={item?.status}
                                                options={[
                                                    {
                                                        "label":"In Progress",
                                                        "value":"In Progress"
                                                    },
                                                    {
                                                        "label":"To Do",
                                                        "value":"To Do"
                                                    }
                                                    ,
                                                    {
                                                        "label":"Done",
                                                        "value":"Done"
                                                    }
                                                ]}
                                                >

                                                </Select></Col></Row>
                                                
                                                <span className='flex flex-con mt-2'>
                                               
                                                </span>
                                            </Card>
                                            
                                            </Col>
                                            
                                            
                                    )
                                })}</Row>
                                </Spin> : null}
                </div>
            </div>

            </Spin> 

            <Modal
            afterClose={getTasks}
            open={modalOpen}
            footer={null}
            onCancel={()=>{
                setModalOpen(false);
            }}
            
            onOk={formRef.submit}
            title={<h2 className='font-bold text-xl'>Create a Task</h2>}
            >
                <Spin spinning={modalLoading}>
            
            <Form form={formRef} onFinish={createTask} layout='vertical'  l>
            <Form.Item
            label="Title"
            name="title"
            rules={[
                {
                    required:true,
                    message:"Please enter a title"
                }
            ]}
            >
            <Input placeholder='Enter Title' />
            </Form.Item>
            <Form.Item
            label="Short Description"
            name="short_description"
            rules={[
                {
                    required:true,
                    message:"Please enter a short description"
                }
            ]}
            >
            <Input placeholder='Enter Short Description'/>
            </Form.Item>
            <Form.Item
            label="Description"
            name="description"
            rules={[
                {
                    required:true,
                    message:"Please enter a description"
                }
            ]}
            >
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Enter Description'/>
            </Form.Item>
            <Row justify={'end'}>
            <Button loading={modalLoading} onClick={formRef.submit} type='primary'>Create</Button>
            </Row>
        
            </Form>
            </Spin>
            </Modal>

            <Modal
            open={modalData!=null}
            title={modalData?.title}
            onCancel={()=>setModalData(null)}
            footer={null}
            >
                <span dangerouslySetInnerHTML={{__html:modalData?.description}}></span>
                


            </Modal>
        </div>
    )
}
