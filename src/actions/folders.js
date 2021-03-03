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

        const body = {folderName, parentDirectory, createdBy, directoryHierarachy:DirectoryHierarachy};

        axios.post(`https://damp-plains-53200.herokuapp.com/folderService/upload`, body, config).then((response) => {

            const folder = response.data;
            console.log(folder);

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

        axios.get(`https://damp-plains-53200.herokuapp.com/folderService/list?parent=${parent}&sortby=${sortby}&search=${search}`, config).then((response) => {
           
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

        const data = {id, directoryHierarachy:parentList};
        console.log(data);

        const headers = {'Authorization': "Bearer " + window.localStorage.getItem("token")}

        axios.delete(`https://damp-plains-53200.herokuapp.com/folderService/delete`, {
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

        axios.patch(`https://damp-plains-53200.herokuapp.com/folderService/rename`, data, config).then((response) => {

            dispatch(editFolder(id, {folderName: title}))

        }).catch((err) => {
            console.log(err)
        })   
    }
}
