import ShareMenu from "./ShareMenu";
import {editFile} from "../../actions/files"
import {editSelectedItem, setShareSelected, editShareSelected} from "../../actions/selectedItem"
import axios from "axios";
import Swal from "sweetalert2"
import copy from "copy-text-to-clipboard";
import {connect} from "react-redux";
import React from "react";
import "./ShareMenu.css";



class ShareMenuContainer extends React.Component {

    constructor(props) {
        super(props);
     
        this.wrapperRef = React.createRef();

        this.showingSwal = false;

        this.state = {
            title: "No Link"
        }
    }

    handleClickOutside = (e) => {

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target) && !this.showingSwal) {

            this.props.dispatch(setShareSelected(""))
        }
    }

    hide = () => {

        this.props.dispatch(setShareSelected(""))
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    makePublic = () => {

        this.showingSwal = true;

        Swal.fire({
            title: 'Are you sure?',
            text: "Making this public, will allow anyone to have access to it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make public'
          }).then((result) => {

            this.showingSwal = false;
            
            if (result.value) {

                const config = {
                    headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
                };
        
                axios.patch('https://damp-plains-53200.herokuapp.com' +`/fileService/make-public/${this.props.shareSelected._id}`, undefined,config).then((results) => {
                    
                    this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "public"
                    }}))

                    this.props.dispatch(editSelectedItem({link: results.data,
                        linkType: "public"}))
                    

                    this.props.dispatch(editShareSelected({"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "public"
                    }}))
        
                }).catch((err) => {
                    console.log(err)
                })
              

            }
          })
    }

    makeOne = () => {

        this.showingSwal = true;

        Swal.fire({
            title: 'Are you sure?',
            text: "One time link, will allow anyone to access this file once",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create link'
          }).then((result) => {

            this.showingSwal = false;
            
            if (result.value) {

                const config = {
                    headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
                };
        
                axios.patch('https://damp-plains-53200.herokuapp.com' +`/fileService/make-one/${this.props.shareSelected._id}`, undefined,config).then((results) => {
                    
                    this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "one"
                    }}))

                    this.props.dispatch(editSelectedItem({link: results.data,
                        linkType: "one"}))
                    

                    this.props.dispatch(editShareSelected({"metadata": {
                        ...this.props.shareSelected.metadata,
                        link: results.data,
                        linkType: "one"
                    }}))
        
                }).catch((err) => {
                    console.log(err)
                })
              

            }
          })

    }

    removeLink = () => {

        const headers = {'Authorization': "Bearer " + window.localStorage.getItem("token")}

        axios.delete('https://damp-plains-53200.herokuapp.com' +`/fileService/remove-link/${this.props.shareSelected._id}`, {
            headers
        }).then(() => {

            this.props.dispatch(editFile(this.props.shareSelected._id,{"metadata": {
                ...this.props.shareSelected.metadata,
                link: undefined,
                linkType: undefined
            }}))

            this.props.dispatch(editSelectedItem({link: undefined,
                linkType: undefined}))
            

            this.props.dispatch(editShareSelected({"metadata": {
                ...this.props.shareSelected.metadata,
                link: undefined,
                linkType: undefined
            }}))
        }).catch((err) => {
            console.log(err)
        })
    }

    copyLink = () => {

        const link = 'http://localhostfrontend.s3-website-us-east-1.amazonaws.com' + "/download-page/" + this.props.shareSelected._id + "/" + this.props.shareSelected.metadata.link;

        copy(link)

        Swal.fire("Link Copied")
    }

    render() {

        return <ShareMenu 
                hide={this.hide}
                removeLink={this.removeLink}
                makeOne={this.makeOne}
                makePublic={this.makePublic}
                removeLink={this.removeLink}
                copyLink={this.copyLink}
                ref={this.wrapperRef}
                state={this.state}
                {...this.props}/>
    }
}

const connectStateToProps = (state) => ({

    shareSelected: state.selectedItem.shareSelected
})

export default connect(connectStateToProps)(ShareMenuContainer);
