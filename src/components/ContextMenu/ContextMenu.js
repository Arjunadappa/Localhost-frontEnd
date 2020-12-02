import ContextMenuItem from "../ContextMenuItem/ContextMenuItem";
import React from "react";
import RenameImage from "../../assets/rename.svg";
import ShareImage from "../../assets/share.svg";
import DownloadImage from "../../assets/download.svg";
import TrashImage from "../../assets/trash.svg";
import MoveImage from "../../assets/move.svg"
import "./ContextMenu.css"

const ContextMenu = React.forwardRef((props, ref) => (

    <div className="context-menu" ref={ref} style={props.style}>
                
        <ContextMenuItem _id={props._id} title="Rename" image={RenameImage} filename={props.filename} />
        <ContextMenuItem title="Share" image={ShareImage} _id={props._id} file={props} />
        <ContextMenuItem downloadFile={props.downloadFile} title="Download" image={DownloadImage} _id={props._id}/>
        {props.quickFile ? undefined :
            <ContextMenuItem title="Move" image={MoveImage} _id={props._id} parent={props.metadata.parentDirectory} isFile={true}/>
        }
        <ContextMenuItem title="Delete" image={TrashImage} _id={props._id}/>

    </div>
))

export default ContextMenu