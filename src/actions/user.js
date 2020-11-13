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
            window.localStorage.setItem("token",token);
            dispatch(login(user_id));
            history.push("/home");


        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export const createLoginAction = (email,password,currentRoute) => {
    return (dispatch) => {
        const credentials = {email,password};
        axios.post("http://localhost:4000/userService/login/",credentials).then((response) => {
            const token = response.data.token;
            const user_id = response.data.user._id;
            window.localStorage.setItem("token", token);
            dispatch(login(user_id));
            history.push(currentRoute);
        }).catch((error) => {
            console.log(error);
        })

    }
}

export const createLoginWithToken = (token,currentRoute) => {
    return (dispatch) => {
        const bearerToken = {
            headers:{'Authorization':"Bearer " + token}
        }
        axios.get('http://localhost:4000/userService/me',bearerToken).then((response) => {
            const user_id = response.data._id;
            dispatch(login(user_id));
            history.push(currentRoute);
        }).catch(e => console.log(e)) 
    }
}