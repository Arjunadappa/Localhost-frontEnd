import {history} from "../../routers/App";
import uuid from "uuid";
import {connect} from "react-redux";
import React from "react";
import {setParent,resetParentList, startSetParentList, setParentList} from "../../actions/ParentSetters";
import {setCurrentRoute, resetCurrentRoute} from "../../actions/routes";
import {enableListView, setSearch, setCurrentlySearching, resetCurrentlySearching} from "../../actions/filter";
import {startSetQuickFiles, setQuickFiles} from "../../actions/quickFiles";
import {startSetFiles} from "../../actions/files";
import {startSetFolders} from "../../actions/folders";
import Header from '../Header/Header';


class HomePage extends React.Component{
    constructor(props) {
        super(props);

        this.lastLocationKey = "";
    }

    loginCheck = () => {

        console.log("login check", this.props.isAuthenticated);

        const pathname = history.location.pathname;

        if (this.props.isAuthenticated) {

            if (pathname === "/home") {
                this.getFiles(); 
                this.props.dispatch(setParent("/"))
                this.props.dispatch(resetParentList());

            } else if (pathname.includes("/search")) {
                this.props.dispatch(startSetQuickFiles());
            }

            this.props.dispatch(resetCurrentRoute());
            //this.props.dispatch(startSetStorage());
            this.props.dispatch(resetCurrentlySearching());
            //this.props.dispatch(startSetStorage());

        } else {

            const currentPath = history.location.pathname;
            console.log("hisory", currentPath);
            this.props.dispatch(setCurrentRoute(currentPath))
            history.push("/")
        }

    }
    // historyUpdateCheck = () => {

    //     console.log("history update check");

    //     const pathname = history.location.pathname

    //     if (pathname === "/home") {

    //         this.getFiles();
    //         //this.props.dispatch(startSetStorage());
    //         this.props.dispatch(resetCurrentlySearching());
    //         this.props.dispatch(setParent("/"))
    //         this.props.dispatch(resetParentList());
    //         //this.props.dispatch(startSetStorage());

    //     } else if (pathname.includes("/folder"))  {

    //         const sortBy = this.props.sortBy
    //         const idSplit = history.location.pathname.split("/folder/");
    //         const id = idSplit[1];

    //         this.props.dispatch(setQuickFiles([]));
    //         this.props.dispatch(setLastSelected(0));
    //         this.props.dispatch(resetSelectedItem())
    //         this.props.dispatch(resetCurrentlySearching());
    //         this.props.dispatch(setLastSelected(0));
    //         this.props.dispatch(resetSelected());
    //         this.props.dispatch(setParent(id));
    //         this.props.dispatch(startSetParentList(id))
    //         this.props.dispatch(startSetFolders(id, sortBy));
    //         this.props.dispatch(startSetFiles(id, sortBy));
    //         this.props.dispatch(setRightSelected(""))
    //         this.props.dispatch(startSetStorage());
    //         this.props.dispatch(loadMoreItems(true))

    //     } else {

    //         const currentPathnameSplit = pathname.split("/search/");
    //         const value = currentPathnameSplit[1];
    //         const parent = "/"

    //         this.props.dispatch(setCurrentlySearching());
    //         this.props.dispatch(setParent(parent))
    //         this.props.dispatch(loadMoreItems(true))
    //         this.props.dispatch(startSetFiles(undefined, undefined, value));
    //         this.props.dispatch(startSetFolders(undefined, undefined, value));
    //         this.props.dispatch(setParent)
    //         this.props.dispatch(setParentList(["/"], ["Home"]))   
    //         this.props.dispatch(setSearch(""))
    //         //this.props.dispatch(startSetStorage());

    //     }

    // }
    componentDidMount = () => {

        console.log("Homepage mounted");
        //window.addEventListener("resize", () => {this.props.dispatch(goneSideBar())}) 
       
        //this.listStyleCheck();
        this.loginCheck();
        //this.setSessionStorage();
        // this.historyUpdateCheck();
    }
    getFiles = () => {
    
        this.props.dispatch(startSetQuickFiles())
        // this.props.dispatch(startSetFolders());
        // this.props.dispatch(startSetFiles())
    }

    goHome = () => {
        history.push("/home")
    }

    render(){
        return (
            <div>
                <Header goHome={this.goHome}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    sortBy: state.filter.sortBy,
    isAuthenticated: !!state.user.id,
    photoID: state.photoViewer.id
})
export default connect(mapStateToProps)(HomePage);