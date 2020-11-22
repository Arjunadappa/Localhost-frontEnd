import React from "react";
import ContentHeading from "../ContentHeading/ContentHeading"
import RecentFiles from "../RecentFiles/RecentFiles"

const MainSection = React.forwardRef((props, ref) => {

    return (
        <div className="mainSectionContainer">
                <div className="File_Foldersection">
                    <div className='mainsection' ref={ref}>
                        {(props.quickFiles.length !== 0 && props.parent === "/") ? 
                            <div className="recent_files">
                                <ContentHeading title="Recent Files"/>
                                <RecentFiles 
                                    fileClick={props.fileClick}
                                    downloadFile={props.downloadFile}/>
                            </div> :
                            <div className="recent_files">
                            </div>}

                    </div>
                </div>
        </div>
    )
})

export default MainSection