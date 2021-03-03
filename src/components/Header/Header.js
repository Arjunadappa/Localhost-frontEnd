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
import SearchIcon from '@material-ui/icons/Search';
import {setFiles} from "../../actions/files"
import {setQuickFiles} from "../../actions/quickFiles";
import {setFolders} from "../../actions/folders"
import {resetSelectedItem, setSelected} from "../../actions/selectedItem";
import {resetCurrentRoute} from "../../actions/routes";
import Swal from "sweetalert2"

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

        axios.get(`https://damp-plains-53200.herokuapp.com/fileService/suggested-list/?search=${this.searchBarValue}`, config).then((results) => {
            console.log(results.data)
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
        
        this.props.dispatch(resetCurrentRoute())
        this.props.dispatch(setFolders([]));
        this.props.dispatch(setFiles([]));
        this.props.dispatch(setQuickFiles([]));
        this.props.dispatch(hideSettings())
        this.props.dispatch(startLogout())
    }
    changePassword = () => {

        Swal.mixin({
            input: 'password',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
          }).queue([
            {
              title: 'Enter Current Password',
            },
            'Enter New Password',
            'Confirm New Password'
          ]).then((result) => {

            if (result.value.length !== 3) {return}

            if (result.value[1] !== result.value[2]) {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'New passwords do not match',
                  })

            } else if (result.value[0].length === 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Enter a new password',
                  })

            } else {

                const config = {
                    headers: {'Authorization': "Bearer " + window.localStorage.getItem("token")}
                };

                const data = {
                    newPassword: result.value[1],
                    oldPassword: result.value[0]
                }
        
                axios.post('https://damp-plains-53200.herokuapp.com' +`/userService/changePassword/`, data, config).then((results) => {
                    
                    const newToken = results.newToken;
                    window.localStorage.setItem("token", newToken);

                    Swal.fire(
                        'Password Changed',
                        'All other sessions have been logged out',
                        'success'
                      )


                }).catch((err) => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error changing password',
                      })
                })

            }

          }).catch((e) => {
              console.log(e)
          })
    }
    deleteAll = () => {

        Swal.fire({
            title: 'Delete All?',
            text: "You cannot undo this action.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all'
          }).then((result) => {
            if (result.value) {

                const headers = {'Authorization': "Bearer " + window.localStorage.getItem("token")}

                axios.delete('https://damp-plains-53200.herokuapp.com/folderService/delete-all', {
                    headers
                }).then((results) => {

                    Swal.fire(
                        'Deleted',
                        'All files/folders have been deleted',
                        'success'
                      )
        
                      this.props.dispatch(setFolders([]));
                      this.props.dispatch(setFiles([]));
                      this.props.dispatch(setQuickFiles([]));
                      this.props.dispatch(resetSelectedItem());
                      this.props.dispatch(setSelected(""))
                      
                })

              
            }
          })
    }

    render(){
        return (
            <header className='headerPane'>
                <img className='logo' onclick={this.props.goHome}src={logoIcon}></img>
                <form class='header-form' onSubmit={this.searchEvent}>
                    {/* <SearchIcon color="primary" className="searchIcon"/> */}
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
                <div className="user-option">
                    <div className='option grey-background' onClick={this.logoutUser}>Logout</div>
                    <div className='option erase' onClick={this.deleteAll}>Erase</div>
                </div>
            </header>
        )
    }

}


const mapStateToProps = (state) => ({
    search: state.filter.search
})



export default connect(mapStateToProps)(Header);