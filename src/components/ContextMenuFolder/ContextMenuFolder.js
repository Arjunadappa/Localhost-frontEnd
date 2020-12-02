import ContextItemFolder from "../ContextItemFolder";
import React from "react";
import renameImage from "../../assets/rename.svg";
import TrashImage from "../../assets/trash.svg";
import MoveImage from "../../assets/move.svg"


const ContextMenuFolder = React.forwardRef((props, ref) => (

    <div className="context-menu" ref={ref} style={props.style}>
        <ContextItemFolder _id={props._id} title="Rename" image={renameImage} parentList={props.directoryHierarachy} name={props.name}/>
        <ContextItemFolder title="Delete" image={TrashImage} _id={props._id} parentList={props.directoryHierarachy}/>
        <ContextItemFolder title="Move" image={MoveImage} _id={props._id} parent={props.parentDirectory} isFile={false}/>
    </div>
))

export default ContextMenuFolder;

