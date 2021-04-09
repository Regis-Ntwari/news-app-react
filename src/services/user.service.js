import Axios from "axios"
import authHeader from "./auth-header"

const API_URL = 'http://localhost:8000/api/test'
class UserService {
    getPublicContent(){
        return Axios.get(API_URL)
    }
    getUserBoard(){
        return Axios.get(API_URL, {headers : authHeader()})
    }
}
export default new UserService();