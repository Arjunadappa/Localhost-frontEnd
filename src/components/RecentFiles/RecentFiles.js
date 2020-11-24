import {connect} from "react-redux";
import React from "react";
import RecentFileItem from "../RecentFileItem/index";
import "./RecentFiles.css"

class RecentFilesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(<div className="quickaccess">

        {this.props.quickFiles
            .map((file) => <RecentFileItem
                                key={file._id} 
                                downloadFile={this.props.downloadFile} 
                                fileClick={this.props.fileClick}
                                {...file}/>)}

        </div>)
    }

}

const connectStateToProp = (state) => ({
    quickFiles: state.quickFiles
})

export default connect(connectStateToProp)(RecentFilesContainer)