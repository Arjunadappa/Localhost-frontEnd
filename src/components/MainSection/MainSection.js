import React from "react";
import ContentHeading from "../ContentHeading/ContentHeading"
import RecentFiles from "../RecentFiles/RecentFiles";
import "./MainSection.css";
import InfiniteScroll from 'react-infinite-scroller';
import DataForm from '../Dataform';
import Filter from '../Filter';

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
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={props.loadMoreItems}
                        hasMore={props.allowLoadMoreItems}
                        loader={<div className="loader" key={0}></div>}
                        useWindow={false}
                        getScrollParent={() => props.scrollParentRef}
                    >


                        <Filter/>
                        <DataForm 
                            folderClick={props.folderClick}
                            fileClick={props.fileClick}
                            downloadFile={props.downloadFile}/>
                    
                    </InfiniteScroll>
                        

                    </div>
                </div>
        </div>
    )
})

export default MainSection