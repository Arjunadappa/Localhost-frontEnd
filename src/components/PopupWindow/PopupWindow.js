
import capitalize from "../../utils/capitalize";
import React from "react";
import CloseIcon from "../../assets/close_icon.png"

class PopupWindow extends React.Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        
        return (
            <div className="popup-window" ref={this.props.wrapperRef}>
            
                <h3 className="popup-window__title">{capitalize(this.props.popupFile.filename)}</h3>
        
                {!this.props.popupFile.metadata.isVideo ? 
                
                    <div className="popup-window__image__wrapper">
                    
                        {!this.props.popupFile.metadata.hasThumbnail ? <h3 className="popup-window__subtitle">No Preview Available</h3> : undefined}
            
                        {!this.props.popupFile.metadata.hasThumbnail ? <img className={this.props.state.imageClassname} src={this.props.state.image}/> 
                        : <img className={this.props.state.imageClassname} onClick={this.props.setPhotoViewerWindow} src={this.props.state.image}/>}

                        <div className={this.props.state.spinnerClassname}>
                            {!this.props.popupFile.metadata.hasThumbnail ? undefined : <div>Loading...</div>}
                        </div>
                    </div>
                : 
                    <video className="popup-window__video" 
                            src={this.props.state.video}
                            ref={this.props.video} 
                            type="video/mp4"
                            controls>
                        Your browser does not support the video tag.
                    </video>
                } 

                <button className=" popup-window__button" onClick={() => this.props.downloadFile(this.props.popupFile._id)}>Download</button>
                <img className="popup-window__close-button" onClick={this.props.hidePopupWindow} src={CloseIcon}/>
            </div>
        )
    }

}


export default PopupWindow

