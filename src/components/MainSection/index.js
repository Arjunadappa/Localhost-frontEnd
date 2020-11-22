import axios from "axios";
import {connect} from "react-redux";
import {history} from "../../routers/App";
import React from "react";
import MainSection from "./MainSection";
import {startSetSelectedItem, setLastSelected} from "../../actions/selectedItem";
import mobileCheck from "../../utils/mobileCheck";
import {setPopupFile} from "../../actions/popupFile";
import {setLoading} from "../../actions/main";
import {startLoadMoreFiles} from "../../actions/files";

class MainSectionContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    folderClick = (id) => {

        const currentDate = Date.now();
        const mobile = mobileCheck();
        const selectedID = this.props.selected;

        if ((currentDate - this.props.lastSelected < 1500 && selectedID === id) || mobile) {

            history.push(`/folder/${id}`)

        } else {
            this.props.dispatch(startSetSelectedItem(id, false));
        }
        
    }
    fileClick = (fileID, file, fromQuickItems=false) => {

        const currentDate = Date.now();

        let selectedFileID = fileID;

        if (fromQuickItems) {
           selectedFileID = "quick-" + fileID;
        }

        if (currentDate - this.props.lastSelected < 1500 && selectedFileID === this.props.selected) {

            this.props.dispatch(setPopupFile({showPopup: true, ...file}))

        } else {

            this.props.dispatch(startSetSelectedItem(fileID, true, fromQuickItems))

        }

    }
    scrollEvent = (e) => {

        if (!mobileCheck()) return;

        const scrollY = window.pageYOffset;
        const windowY = document.documentElement.scrollHeight;

        let limit = window.localStorage.getItem("list-size") || 50
        limit = parseInt(limit)

        if (this.props.loading) return;

        if ((windowY / 2) < scrollY && this.props.allowLoadMoreItems) {
            console.log("Scroll Bottom Mobile");

            if (this.props.files.length >= limit) {
                const parent = this.props.parent;
                const search = this.props.filter.search;
                const sortBy = this.props.filter.sortBy;
                const lastFileDate = this.props.files[this.props.files.length - 1].uploadDate
                const lastFileName = this.props.files[this.props.files.length - 1].filename

                this.props.dispatch(setLoading(true));
                this.props.dispatch(startLoadMoreFiles(parent, sortBy, search, lastFileDate, lastFileName));

            } 
        }
    }
    componentDidMount = () => {
        window.addEventListener("scroll", this.scrollEvent);
    }

    componentWillUnmount = () => {

        window.removeEventListener("scroll", this.scrollEvent);
    }
    downloadFile = (fileID) => {

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        };    

        this.props.dispatch(setLastSelected(0));

        axios.get('http://localhost:4000/fileService/download-token/',config)
        .then((response) => {

            const tempToken = response.data.tempToken;
            const finalUrl = `http://localhost:4000/fileService/download/${fileID}/`

            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = finalUrl;
            link.setAttribute('type', 'hidden');
            link.setAttribute("download", true);
            link.click();

            

        }).catch((err) => {
            console.log(err)
        })
    }

    loadMoreItems = () => {

        if (mobileCheck()) return;

        console.log("loading more items", this.props.loading);

        let limit = window.localStorage.getItem("list-size") || 50
        limit = parseInt(limit)

        if (this.props.loading) {

            return;
        }

        if (this.props.files.length >= limit) {

            const parent = this.props.parent;
            const search = this.props.filter.search;
            const sortBy = this.props.filter.sortBy;
            const lastFileDate = this.props.files[this.props.files.length - 1].uploadDate
            const lastFileName = this.props.files[this.props.files.length - 1].filename

            this.props.dispatch(startLoadMoreFiles(parent, sortBy, search, lastFileDate, lastFileName))  
        } 
    }
    render(){
        return(
            <MainSection
                folderClick={this.folderClick}
                fileClick={this.fileClick}
                downloadFile={this.downloadFile}
                loadMoreItems={this.loadMoreItems}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    filter: state.filter,
    files: state.files,
    allowLoadMoreItems: state.main.loadMoreItems,
    loading: state.main.loading,
    showPopup: state.popupFile.showPopup,
    quickFiles: state.quickFiles,
    selected: state.selectedItem.selected,
    lastSelected: state.selectedItem.lastSelected,
    parent: state.parent.parent,
    moverID: state.mover.id,
})

export default connect(mapStateToProps)(MainSectionContainer)