import axios from "axios";

export const getAPI= async (apiPath,apiParam,successFn,errorFn) => {
    let token = localStorage.getItem("token");
    axios.get(`https://task-manager-backend-ten-xi.vercel.app/${apiPath}`,{
        params:apiParam,
        headers: {
            Authorization: token
        }
    }).then(res => {
        successFn(res.data);
    }).catch(err => {
        errorFn(err);
        if(err.status === 401 || err.status === 403){
            localStorage.removeItem("token");
        }
    })
}
export const postAPI= async (apiPath,apiParam,successFn,errorFn) => {
    let token = localStorage.getItem("token");
    axios.post(`https://task-manager-backend-ten-xi.vercel.app/${apiPath}`,apiParam,{
        headers: {
            Authorization: token
        }
    }).then(res => {
        successFn(res.data);
    }).catch(err => {
        errorFn(err);
        if(err.status === 401 || err.status === 403){
            localStorage.removeItem("token");
        }
    })
}