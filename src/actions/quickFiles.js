import axios from "axios";


export const setQuickFiles = (files) => ({
    type: "SET_QUICK_FILES",
    files
})

export const startSetQuickFiles = () => {

    return (dispatch) => {

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        };
       
        axios.get(`http://localhost:4000/fileService/quick-list`, config).then((results) => {
        
            dispatch(setQuickFiles(results.data))

        }).catch((err) => {
            console.log(err)
        })
    }
}

export const addQuickFile = (file) => ({
    type: "ADD_QUICK_FILE",
    file
})