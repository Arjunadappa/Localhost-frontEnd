import axios from 'axios';
import {history} from '../routers/App';
import {setLoginFailed} from "./main";
import {resetUpload} from "./uploads";
// import history from '../history';


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
        axios.post("https://damp-plains-53200.herokuapp.com/userService/create/",credentials).then((response) => {
            const token = response.data.token;
            const user_id = response.data.user._id;
            console.log(response)
            window.localStorage.setItem("token",token);
            dispatch(login(user_id));
            console.log('hello')
            history.push("/home");


        })
        .catch((error) => {
            console.log(error);
            if (error.response) {

                const errStatus = error.response.status;

                if (errStatus === 401) {

                    dispatch(setLoginFailed("Create Blocked By Admin"))

                } else {

                    dispatch(setLoginFailed("Duplicate Email, or Invalid Password"))
                }

            } else {

                dispatch(setLoginFailed("Duplicate Email, or Invalid Password"))
            }
        })
    }
}

export const createLoginAction = (email,password,currentRoute) => {
    return (dispatch) => {
        const credentials = {email,password};
        axios.post("https://damp-plains-53200.herokuapp.com/userService/login/",credentials).then((response) => {
            const token = response.data.token;
            const user_id = response.data.user._id;
            window.localStorage.setItem("token", token);
            dispatch(setLoginFailed(false))
            dispatch(login(user_id));
            history.push(currentRoute);
        }).catch((error) => {
            console.log(error);
            dispatch(setLoginFailed("Incorrect Email or Password"))
        })

    }
}

export const createLoginWithToken = (token,currentRoute) => {
    return (dispatch) => {
        const bearerToken = {
            headers:{'Authorization':"Bearer " + token}
        }
        axios.get('https://damp-plains-53200.herokuapp.com/userService/me',bearerToken).then((response) => {
            const user_id = response.data._id;
            dispatch(setLoginFailed(false))
            dispatch(login(user_id));
            console.log(history)
            history.push(currentRoute);
        }).catch(e => {
            console.log(e);
            console.log("login check error", e);
            window.localStorage.removeItem("token")
            dispatch(setLoginFailed("Login Expired"))
        }
            ) 
    }
}

export const startLogout = () => {

    return (dispatch) => {

        const token = window.localStorage.getItem("token")

        const config = {
            headers: {'Authorization': "Bearer " + token}
        };
    
        axios.post("https://damp-plains-53200.herokuapp.com/userService/logout/", undefined,config).then(() => {

            window.localStorage.removeItem("token")

            dispatch(resetUpload())
            dispatch(setLoginFailed(false))
            dispatch(logout())

            history.push("/")

        }).catch((err) => {
            console.log(err);
        })

    }
}