import Axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8000/api/token/";

class AuthService {
    login(username, password){
        return Axios
            .post(API_URL, {
                username, password
            })
            .then(Response => {
                if(Response.data.access){
                    
                    localStorage.setItem("user", JSON.stringify(Response.data.access))
                }
                return Response.data;
            })
    }
    logout(){
        localStorage.removeItem("user");
    }
    getCurrentUser(){
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        return jwt_decode(user);
    }
    isAuthenticated(){
        return localStorage.getItem('user') != null;
    }
}
export default new AuthService();