import axios from 'axios'
import {message} from "antd";


const BASEURL = "http://localhost:3000";

const ajax = (url, data = {}, type='get',baseURl = BASEURL) => {

    return new Promise(resolve => {
        if (type.toLowerCase() === 'get') {
            return axios.get(baseURl+url, {
                params: data
            }).then(response=>{
                //请求成功
                resolve(response.data);
            }).catch(error => {
                message.error('网络异常' + error.message, 2)
            })
        } else if (type.toLowerCase() === 'post') {
            return axios.post(baseURl+url, data).then(response=>{
                //请求成功
                resolve(response.data);
            }).catch(error => {
                message.error('网络异常' + error.message, 2)
            })
        }
    })

};

export default ajax;