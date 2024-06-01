import Cookies from 'js-cookie';
import { apiService } from '../api/apiService';

export default async function useInitialAuth(){
    const token = Cookies.get('DD_token');
    const userType = Cookies.get('user_type');

    var result = {
        isLogin: false,
        token: "",
        userType:"",
        data:null,
    };
    if(token) {
        await apiService.get("/user/checkuser")
        .then(res => {
            result = {
                isLogin: true,
                token: token,
                userType:userType,
                user: res.data,
            }
        }).catch(err => console.log(err))
    }

    if(!result.isLogin){
        Cookies.remove('DD_token') ;
        Cookies.remove('user_type') ;
    }
    return result;
    
}