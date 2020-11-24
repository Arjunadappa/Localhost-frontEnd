import axios from "axios";
import {connect} from "react-redux";
import React from "react";
import mobileCheck from "../../utils/mobileCheck";
import {setRightSelected, setLastSelected, setSelected} from "../../actions/selectedItem"
import capitalize from "../../utils/capitalize";
import moment from "moment";
import RecentFileItem from "./RecentFileItem"
import fileImage from "../../assets/file-svg.svg"
class RecentFileItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.failedToLoad = false;
        this.lastTouch = 0;

        this.state = {
            contextMenuPos: {},
            image: fileImage,
            imageClassname: "quickaccess__item__image"
        }
    }
    componentDidMount = () => {

        const hasThumbnail = this.props.metadata.hasThumbnail;

        if (hasThumbnail && !this.failedToLoad) {
            this.getThumbnail();
        }
    }
    getThumbnail = async() => {

        const thumbnailID = this.props.metadata.thumbnailID;
        const imageClassname = "quickaccess__item__image quickaccess__item__image--no-opacity"

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")},
            responseType: 'arraybuffer'
        };

        await this.setState(() => ({
            ...this.state,
            image: fileImage,
            imageClassname: "quickaccess__item__image"
        }))
    
        axios.get( `http://localhost:4000/fileService/thumbnail/${thumbnailID}`, config).then((results) => {
     
            const imgFile = new Blob([results.data]);
            const imgUrl = URL.createObjectURL(imgFile);
           
            this.setState(() => ({
                ...this.state,
                image: imgUrl,
                imageClassname: imageClassname
            }))
            
        }).catch((err) => {
            console.log(err)
        })
    }
    onTouchStart = () => {
        const date = new Date();
        this.lastTouch = date.getTime();
    }

    onTouchMove = () => {

        this.lastTouch = 0;
    }

    onTouchEnd = () => {

        if (this.lastTouch === 0) {

            return;
        }

        const date = new Date();
        const difference = date - this.lastTouch;
        this.lastTouch = 0;

        if (difference > 500) {
            this.getContextMenu();
        }

    }

    getContextMenu = (e) => {

        if (e) e.preventDefault();

        const isMobile = mobileCheck()
    
        const windowX = window.innerWidth;
        const windowY = window.innerHeight;

        let styleObj = {right:0, left:0, top: "-3px", bottom: 0}

        if (isMobile) {

            styleObj = {bottom: 0, left: "2px"};

        } else {

            const clientY =  e.nativeEvent.clientY;
            const clientX = e.nativeEvent.clientX;
    
            if (clientX > windowX / 2) {
    
                styleObj = {...styleObj, left:"unset", right:0}
    
            } else {
             
                styleObj = {...styleObj, left:0, right:"unset"}
            }

        }

        this.setState(() => ({
            ...this.state,
            contextMenuPos: styleObj
        }))

        this.props.dispatch(setSelected("quick-"+this.props._id))
        this.props.dispatch(setRightSelected("quick-"+this.props._id))
        this.props.dispatch(setLastSelected(0));
    }
    render(){
        return(
                <RecentFileItem
                getContextMenu={this.getContextMenu} 
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                state={this.state} 
                {...this.props}/>
        )
    }
}

const connectStateToProp = (state) => ({
    rightSelected: state.selectedItem.rightSelected,
    selected: state.selectedItem.selected
})

export default connect(connectStateToProp)(RecentFileItemContainer);