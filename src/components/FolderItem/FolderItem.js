import ContextMenuFolder from ".././ContextMenuFolder";
import moment from "moment";
import React from "react";
import FolderImage from "../../assets/folder-svg.svg";
import "./FolderItem.css";

const FolderItem = (props) => {

    const wrapperClassname = props.getClassName();

    return (
        
        <div className={wrapperClassname}>

            {props.listView ? 
            
                <div className={props._id !== props.selected ? "file__item__listview" : "file__item__listview file__item--selected"} 
                onClick={() => props.folderClick(props._id, props.folderName)}
                onContextMenu={(e) => props.getContextMenu(e)}
                onTouchStart={props.onTouchStart}
                onTouchEnd={props.onTouchEnd}
                onTouchMove={props.onTouchMove}>
                    
                    <div className="file__item__listview__title__wrapper file__item__listview__title__wrapper--folder">
                        <img className="file__image__listview" src={FolderImage}/>
                        <h5 className={props._id !== props.selected ? "file__title__listview file__title__listview--no-max" : "file__title__listview file__title__listview--no-max file__title--selected"}>{props.folderName}</h5>
                    </div>
                    <h5 className={props._id !== props.selected ? "file__title__listview" : "file__title__listview file__title--selected"}>{moment(props.createdAt).format("L")}</h5>

                    {(props.rightSelected === props._id && props._id === props.selected) ? 
                    
                        <ContextMenuFolder style={props.state} {...props} downloadFile={props.downloadFile}/>
                    : 
                         undefined}
                </div>

            : 

            <div className="folder__item"
                onClick={() => props.folderClick(props._id, props.folderName)} 
                onContextMenu={(e) => props.getContextMenu(e)}
                onTouchStart={props.onTouchStart}
                onTouchEnd={props.onTouchEnd}
                onTouchMove={props.onTouchMove}>

            <img className="folder__image" src={FolderImage}/>
            <h4 className={props._id !== props.selected ? "folder__title" : "folder__title folder__title--selected"}>{props.folderName}</h4>

            {(props.rightSelected === props._id && props._id === props.selected) ? 
                
                <ContextMenuFolder style={props.state} {...props} downloadFile={props.downloadFile}/>
            : 
                 undefined}

            </div>
            
            }
        
        </div>
    )
}

export default FolderItem;