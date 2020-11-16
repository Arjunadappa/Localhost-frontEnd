import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {startLogout} from "../../actions/user"
//import {showSettings} from "../../actions/settings";
import {setSearch} from "../../actions/filter"
import {loadMoreItems} from "../../actions/main";
import {setParent, resetParentList} from "../../actions/ParentSetters";
import {history} from '../../routers/App';
import {showSettings,hideSettings} from "../../actions/settings";
import settingIcon from '../../assets/gear_icon.png';
import logoIcon from '../../assets/cloudLogo.png'
import {v4 as uuid} from  'uuid';
import SuggestedItem from '../SuggestedItem/suggestedItem';
import "./Header.css";


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.searchBarValue = '';
        this.state = {
            focused:false,
            suggestedList: {
                fileList: [],
                folderList: []
            }
        }
    }
    searchEvent = (e) => {
        e.preventDefault();

        const value = this.props.search;
        
        const parent = "/"
        this.props.dispatch(setParent(parent))
        this.props.dispatch(loadMoreItems(true))
        //this.props.dispatch(startSetFiles(undefined, undefined, value));
        //this.props.dispatch(startSetFolders(undefined, undefined, value));
        this.props.dispatch(resetParentList())

   
    }
    searchOnChange = (e) => {

        const value = e.target.value;
        this.searchBarValue = value;

        this.props.dispatch(setSearch(value))
        this.searchSuggested()
    }

    showSuggested = () => {
        
        this.setState(() => {
            return {
                ...this.state,
                focused: true
            }
        })
    }

    hideSuggested = () => {

        this.setState(() => {
            return {
                ...this.state,
                focused: false
            }
        })
    }
    selectSuggested = (value) => {

        history.push(`/search/${value}`)

        this.setState(() => {
            return {
                ...this.state, 
                suggestedList: {
                    fileList: [],
                    folderList: []
                }
            }
        })
    }
    searchSuggested = () => {

        const config = {
            headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
        };
       

        if (this.searchBarValue === "") {
            
            return this.setState(() => {
                return {
                    ...this.state, 
                    suggestedList: {
                        fileList: [],
                        folderList: []
                    }
                }
            })
        }

        axios.get(`http://localhost:4000/fileService/suggested-list/?search=${this.searchBarValue}`, config).then((results) => {

            this.setState(() => {
                return {
                    ...this.state, 
                    suggestedList: results.data
                }
            })
           

        }).catch((err) => {
            console.log(err)
        })
    }
    showSettings = () => {

        this.props.dispatch(showSettings())
    }

    logoutUser = () => {
        
        this.props.dispatch(startLogout())
    }

    render(){
        return (
            <header className='headerPane'>
                <img className='logo' src={logoIcon}></img>
                <form class='header-form' onSubmit={this.searchEvent}>
                    <input class="header-input"value={this.searchBarValue} placeholder="Search" type="text" onFocus={this.showSuggested} onBlur={this.hideSuggested} onChange={this.searchOnChange}></input>
                    <div className={(this.state.focused && (this.state.suggestedList.folderList.length !== 0 || this.state.suggestedList.fileList.length !== 0)) ? "header__input__suggested" : "header__input__suggested header__input__suggested--gone"}>

                        {this.state.suggestedList.folderList.map((suggested) => {

                            return <SuggestedItem key={uuid()} itemClick={this.selectSuggested} suggested={suggested} folder={true}/>
                        })}

                        {this.state.suggestedList.fileList.map((suggested) => {

                            return <SuggestedItem key={uuid()} itemClick={this.selectSuggested} suggested={suggested} folder={false}/>
                        })}

                    </div>
                </form>
                <img className="header-setting" onClick={this.showSettings} src={settingIcon} />
            </header>
        )
    }

}


const mapStateToProps = (state) => ({
    search: state.filter.search
})



export default connect(mapStateToProps)(Header);