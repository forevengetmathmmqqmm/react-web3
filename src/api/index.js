
import { request } from "../utils"
export const loginApi = (user,password) => {
    console.log('loginApi',user,password);
    return request({data:{
        token: 'asdfasdfasdf',
        auth: 'asdfasdfasdf'
    }})
}