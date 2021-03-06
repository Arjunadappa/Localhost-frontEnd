import FolderItem from "./FolderItem"
import {startSetSelectedItem, setRightSelected, setLastSelected} from "../../actions/selectedItem"
import mobileCheck from "../../utils/mobileCheck"
import {connect} from "react-redux";
import React from "react";

class FolderItemContainer extends React.Component {

    constructor(props) {
        super(props)

        this.lastTouch = 0;
    }

    shouldComponentUpdate = (nextProp) => {

        return (nextProp.itemSelected !== this.props.itemSelected 
                || nextProp.listView !== this.props.listView 
                || nextProp.rightSelected !== this.props.rightSelected 
                || nextProp.folderName !== this.props.folderName
                || nextProp.quickFilesLength !== this.props.quickFilesLength)
    }

    onTouchStart = () => {
        //alert("Touch start");
        const date = new Date();
        this.lastTouch = date.getTime();
    }

    onTouchMove = () => {

        this.lastTouch = 0;
    }

    onTouchEnd = () => {

        if (this.lastTouch === 0) {

            //alert("last touch 0");
            return;
        }

        const date = new Date();
        const difference = date - this.lastTouch;
        //alert("Touch end: " + difference)
        //alert("touch end: " + difference);
        this.lastTouch = 0;

        if (difference > 500) {
            //alert("Context menu");
            this.getContextMenu();
        }

    }

    getContextMenu = (e) => {

        if (e) e.preventDefault();

        const isMobile = mobileCheck();

        const windowX = window.innerWidth;
        const windowY = window.innerHeight;

        let styleObj = {right:0, left:0, top: "-14px", bottom: 0}

        if (isMobile) {

            styleObj = {bottom: 0, left: "2px", top:"unset"}

        } else {

            const clientY =  e.nativeEvent.clientY;
            const clientX = e.nativeEvent.clientX;


            if (clientY < (windowY / 3)) {

                const bottomSize = this.props.quickFilesLength === 0 ? "-126px" : "-190px"

                styleObj = {bottom: bottomSize, top:"unset"}
            } 

            if (clientY > ((windowY / 4) * 3.5)) {

                styleObj = {bottom:"unset", top: "-190px"}
            }

            if (clientX > windowX / 2) {

                styleObj = {...styleObj, left:"unset", right:0}

            } else {
            
                styleObj = {...styleObj, left:0, right:"unset"}
            }
        }

        this.setState(() => styleObj)

        this.props.dispatch(startSetSelectedItem(this.props._id, false))
        this.props.dispatch(setLastSelected(0));
        this.props.dispatch(setRightSelected(this.props._id))
    
    }

    getClassName = () => {

        let classname = "";

        if (this.props.listView) {

            classname += "file__item__listview"

        } else {

            classname += "folder__item__wrapper"
        } 

        if (this.props._id === this.props.selected) {

            classname += " file__item--selected"
        }

        return classname;
    }


    render() {

        return <FolderItem 
                getContextMenu={this.getContextMenu} 
                getClassName={this.getClassName}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                state={this.state}
                {...this.props}/>
    }

}

const connectPropToState = (state) => ({
    listView: state.filter.listView,
    rightSelected: state.selectedItem.rightSelected,
    resetSelected: state.selectedItem.resetSelected,
    selected: state.selectedItem.selected,
    quickFilesLength: state.quickFiles.length
})

export default connect(connectPropToState)(FolderItemContainer);