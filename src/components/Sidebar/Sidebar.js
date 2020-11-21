import React from 'react';
import { connect } from 'react-redux';
import {showAddOptions} from "../../actions/addOptions";
import {startAddFile} from "../../actions/files";
import {startAddFolder} from "../../actions/folders"
import Swal from "sweetalert2";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.wrapperRef = React.createRef();
    }


    createFolder = async(e) => {

        let inputValue = ""

        const { value: folderName} = await Swal.fire({
            title: 'Enter Folder Name',
            input: 'text',
            inputValue: inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Please Enter a Name'
              }
            }
          })

        if (folderName === undefined || folderName === null) {

            return;
        }

        const parentDirectory = this.props.parent;
        const createdBy = this.props.user.id;
        const directoryHierarachy = this.props.parentList;

        this.props.dispatch(startAddFolder(folderName, createdBy, parentDirectory, directoryHierarachy));
    }
    componentDidMount = () => {
        //document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount = () => {
        //document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (e) => {

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target) && this.props.showAddOptions) {
            this.addButtonEvent();
        }
    }
    addButtonEvent = () => {
        
        const currentAddOptions = !this.props.showAddOptions
        this.props.dispatch(showAddOptions(currentAddOptions))
    }

    handleUpload = (e) => {
        e.preventDefault();
        console.log('entered')
        this.props.dispatch(startAddFile(this.fileInput.current, this.props.parent, this.props.parentList))
        this.fileInput.current.value = ""
    }
    render(){
        return(
            <div>
                Sidebar
                <form>
                    <input name='fileInput' ref={this.fileInput} type="file" multiple={true} onChange={this.handleUpload}/>
                </form>
                <div onClick={this.createFolder}>
                    <p>Create Folder</p>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    parent: state.parent.parent,
    parentList: state.parent.parentList,
    storage: state.storage,
    showAddOptions: state.addOptions.showAddOptions
})

export default connect(mapStateToProps)(Sidebar)