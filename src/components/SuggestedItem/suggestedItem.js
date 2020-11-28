import moment from "moment"
import React from "react";
import folderImage from "../../assets/folder-svg.svg";
import fileImage from "../../assets/file-svg.svg";

export default ({suggested, folder, itemClick}) => { 
    
    const name = folder ? suggested.folderName : suggested.filename;
    
    return(
        <div onMouseDown={() => itemClick(name)} className="header__input__suggested__item">

            <div className="header__input__suggested__item__title__wrapper">
            
                <img className="header__input__suggested__item__image" src={folder ? folderImage : fileImage}/>
                <h3 className="header__input__suggested__item__title">{name}</h3>

            </div>

            <h3 className="header__input__suggested__item__subtitle">{folder ? moment(suggested.createdAt).format("L") :  moment(suggested.uploadDate).format("L")}</h3>
        
        </div>
    )

}