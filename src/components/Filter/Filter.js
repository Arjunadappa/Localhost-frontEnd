import React from "react";
import downArrow from "../../assets/down-arrow-grey-small.png";
import upArrow from "../../assets/up-arrow-grey-small.png";
import "./Filter.css";

const Filter = (props) => {

    const filterOptionType = props.getFilterOptionType();
    const filterOptionValue = props.getFilterOptionValue();
    
    return (

            <div className="filter">
        
                <div className="filter__folder-title-wrapper">
        
                    {props.folderListLength === 0 ? 
                        
                        undefined 
                        : 
                        (<div className="filter__folder-wrapper">
                            <p className="filter__folder-title">Folders</p>
                        </div>)}
        
                </div>
            
                <div className="filters__wrapper">
                        
                    <div className="filter__select-wrapper"> 
        
                        <select className="filter__select" value={filterOptionType} onChange={props.selectedOnChange}>
                            <option value="date">Last Modified</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
        
                    <div className="filter__select-image-wrapper">
        
                        <img className="filter__select-image"  src={filterOptionValue ?  
                        downArrow : upArrow}
                        onClick={props.changeSortBy}/>
                    </div>
        
                </div>
        
            </div>
        )
}


export default Filter
