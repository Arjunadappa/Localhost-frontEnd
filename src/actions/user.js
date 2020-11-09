import axios from 'axios';
import {history} from '../routers/App'

export const login = (id) => ({
    type: "LOGIN",
    id
})

export const logout = () => ({
    type: "LOGOUT"
})

export const createAccountAction = (name,email,password) => {
    return (dispatch) => {
        const credentials = {name,email,password};
        axios.post("http://localhost:4000/userService/create/",credentials).then((response) => {
            const token = response.data.token;
            const user_id = response.data.user._id;
            console.log(response)
            //window.localStorage.setItem("token",token);
            dispatch(login(user_id));


        })
        .catch((error) => {
            console.log(error);
        })
    }
}