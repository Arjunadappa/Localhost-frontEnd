import React from "react";

import CloseIcon from "../../assets/close_icon.png"
import copyIcon from '../../assets/copy.svg'

const ShareMenu = React.forwardRef((props, ref) => {

    if (props.shareSelected === "") {

        return (
            <div className="sharemenu sharemenu--gone" ref={ref}>
            
            </div>
        )

    } else {
    
        return (
            <div div className="sharemenu"
            ref={ref}>

            {props.shareSelected.metadata.link ? 
                
                <div className="sharemenu--block">
                    <img className="sharemenu__close-button" onClick={props.hide} src={CloseIcon}/>
                    <div className="sharemenu__link__wrapper">
                        <img onClick={props.copyLink} className="sharemenu__image" src={copyIcon}/>
                        <p onClick={props.copyLink} className="sharemenu__title">{'http://localhostdrive.s3-website.ap-south-1.amazonaws.com'}/download-page/{props.shareSelected._id}/{props.shareSelected.metadata.link}</p>
                    </div>
                    <button className="" onClick={props.removeLink}>Remove Link</button>
                
                </div>

                :
                <div className="sharemenu--block">
                    <img className="sharemenu__close-button" onClick={props.hide} src={CloseIcon}/>
                    <button className="" onClick={props.makePublic}>Make Public</button>
                    
                    <button className="" onClick={props.makeOne}>Create One Time Link</button>
                </div>
            }
            
            </div>
        )

    }

})

export default ShareMenu