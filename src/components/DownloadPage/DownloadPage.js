//import Spinner from ".././SpinnerLogin";
import React from "react";
import "./DownloadPage.css";
import DownloadIcon from "../../assets/download.svg"

const DownloadPage = ({download,state}) => {

    if (state.size === "" && !state.error) {

        return <div className="downloadpage__box">
            
        </div>
    }

    return (
        
        <div className="downloadpage">

            {!state.error ? 
                
            (<div className="downloadpage__box">
                <p className="downloadpage__box__title">{state.title}</p>
                <p className="downloadpage__box__subtitle">Type: {state.type}</p>
                <p className="downloadpage__box__subtitle">Size: {state.size}</p>
                <button className="download-button" onClick={download}>
                    <img className='Download__icon'src={DownloadIcon}/>
                </button>
            </div>) 
            : 
            <div className="downloadpage__box"> 
                <p>Unauthorized/Not Found Download</p>
            </div>
            }
       
        </div>)
}

export default DownloadPage;

