import ContextMenuItem from "../ContextMenuItem/ContextMenuItem";
import React from "react";

const ContextMenu = React.forwardRef((props, ref) => (

    <div className="context-menu" ref={ref} style={props.style}>
                
        <ContextMenuItem _id={props._id} title="Rename" image="/images/rename.svg" filename={props.filename} />
        <ContextMenuItem title="Share" image="/images/share.svg" _id={props._id} file={props} />
        <ContextMenuItem downloadFile={props.downloadFile} title="Download" image="/images/download.svg" _id={props._id}/>
        {props.quickFile ? undefined :
            <ContextMenuItem title="Move" image="/images/move.svg" _id={props._id} parent={props.metadata.parent} isFile={true}/>
        }
        <ContextMenuItem title="Delete" image="/images/trash.svg" _id={props._id}/>

    </div>
))

export default ContextMenu