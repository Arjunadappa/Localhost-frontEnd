import {startSetQuickFiles} from "./quickFiles";
const axios = require("axios");


export const addFolder = (folder) => ({
    type: "ADD_FOLDER",
    folder
})

export const startAddFolder = (folderName, createdBy, parentDirectory, DirectoryHierarachy) => {

    return (dispatch) => {

        if (folderName.length === 0) {
            return;
        }

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        };

        const body = {folderName, parentDirectory, createdBy, DirectoryHierarachy};

        axios.post(`http://localhost:4000/folderService/upload`, body, config).then((response) => {

            const folder = response.data;

            dispatch(addFolder(folder))

        }).catch((err) => {
            console.log(err)
        })
    }
}

export const setFolders = (folders) => ({
    type: "SET_FOLDERS",
    folders
})

export const startSetFolders = (parent = "/", sortby="DEFAULT", search="") => {

    return (dispatch) => {

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        }

        dispatch(setFolders([]))

        axios.get(`http://localhost:4000/folderService/list?parent=${parent}&sortby=${sortby}&search=${search}`, config).then((response) => {
           
            const folders = response.data;
            dispatch(setFolders(folders))

        }).catch((err) => {
            console.log(err);
        })
    }
}

export const removeFolder = (id) => ({
    type: "REMOVE_FOLDER",
    id
})

export const startRemoveFolder = (id, parentList) => {

    return (dispatch) => {

        const data = {id, parentList};

        const headers = {'Authorization': "Bearer " + window.localStorage.getItem("token")}

        axios.delete(`http://localhost:4000/folderService/delete`, {
            headers,
            data
        }).then((response) => {
           
            dispatch(removeFolder(id));
            dispatch(startSetQuickFiles())

        }).catch((err) => {
            console.log(err);
        })
    }
}

export const editFolder = (id, folder) => ({
    type: "EDIT_FOLDER",
    id, 
    folder
})

export const startRenameFolder = (id, title) => {
    
    return (dispatch) => {

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        };

        const data = {id, title}

        axios.patch(`http://localhost:4000/folderService/rename`, data, config).then((response) => {

            dispatch(editFolder(id, {name: title}))

        }).catch((err) => {
            console.log(err)
        })   
    }
}
