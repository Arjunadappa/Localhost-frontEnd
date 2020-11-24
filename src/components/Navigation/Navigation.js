import Swal from "sweetalert2";
import {connect} from "react-redux";
import {history} from "../../routers/App";
import React from "react";
import mobileCheck from "../../utils/mobileCheck";
import ArrowImage from "../../assets/right-arrow-svg.svg";
import "./Navigation.css"

class NavigationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.isMobile = mobileCheck();
    }
    itemClick = (id) => {

        if (id === "/") {

            history.push("/home")

        } else {

            history.push(`/folder/${id}`)
        }
        
    }
    render() {
        return (
            <div className="path__wrapper">

                {(this.props.parentList.length !== 1 || this.props.currentlySearching)? 
                    (
                    <div className="path__block">
                    
                    {this.props.parentNameList.map((parent, index) => {

                        const parentID = this.props.parentList[index];

                        return (
                            <div className="path__block" onClick={() => {this.itemClick(parentID, parent, true)}}>
                                <h3 className="path__title">{parent}</h3>

                                {index !== this.props.parentNameList.length - 1 ? (<img className="path__image" src={ArrowImage}/>) : undefined}
                                
                            </div>
                        )
                    })}
                    
                    </div>)
                    
                 : undefined}

                
                
                </div>
        )
    }
}


const connectPropToState = (state) => ({
    auth: state.auth,
    listView: state.filter.listView,
    parentList: state.parent.parentList,
    parentNameList: state.parent.parentNameList,
    parent: state.parent.parent,
    sortBy: state.filter.sortBy,
    currentlySearching: state.filter.currentlySearching,
    search: state.filter.search,
})

export default connect(connectPropToState)(NavigationContainer)