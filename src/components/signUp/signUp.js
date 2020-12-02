import React from 'react'
import {connect} from 'react-redux';
import {createAccountAction,createLoginAction,createLoginWithToken} from '../../actions/user';
import './signUp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cloudLogo from "../../assets/cloudLogo.png";
import errorIcon from "../../assets/error-red.png";

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            isLogin:true,
            email:"",
            password:"",
            confirmPassword:""
        }

    }
    signUp = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword;
        if(this.state.isLogin){
            this.props.dispatch(createLoginAction(email,password,this.props.currentRoute))
        }
        if(password==confirmPassword){
            this.props.dispatch(createAccountAction(name,email,password))
        }
    }
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }
    formChange = () => {
        this.setState(() => {
            return{
                ...this.state,
                isLogin:!this.state.isLogin
            }
        })
    }

    loginWithToken = () => {
        const token = window.localStorage.getItem("token");
        this.props.dispatch(createLoginWithToken(token,this.props.currentRoute));
    }
    notify = () => toast("Incorrect Email or Password");

    render(){
        if (window.localStorage.getItem("token")) {
            this.loginWithToken()
            console.log('done')
        }
        return (
            <div>
            {  (window.localStorage.getItem("token")) ? 
                <div>
         
                <div className="box-container">

                    <div>
                        Loading....
                    </div>
                </div>


                </div> 
                :
                <div className="box-container">
                                
                    <div className='signUpContainer'>
                        <img className="logo"src={cloudLogo}></img>
                        <form className="form" onSubmit={this.signUp}>
                            {this.state.isLogin ? undefined : 
                                <input className='form-input' name='name' type='text' placeholder='Name' value={this.state.name} onChange={this.handleInputChange}/>
                            }
                            <input className='form-input' name='email' type='email' placeholder='email' value={this.state.email} onChange={this.handleInputChange}/>
                            <input className='form-input' name='password' type='password' placeholder='password' value={this.state.password} onChange={this.handleInputChange}/>
                            {this.state.isLogin ? undefined :
                                <input className='form-input' name='confirmPassword' type='password' placeholder='Confirm password' value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                            }
                            
                        <button className="button">{this.state.isLogin ? "Login" : "SignUp"}</button>
                        {/* <p className='form-change' onClick={this.formChange}>{this.state.isLogin ? "Sign Up" : "Back to Login"}</p> */}
                        <div onClick={this.formChange} className="cta">
                            <span>{this.state.isLogin ? "Sign Up" : "Back to Login"}</span>
                            <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </div>
                        </form>
                    </div>
                    {this.props.loginFailed ? 
                        
                        <div className="login__image__wrapper"> 
                            <img className="login__image" src={errorIcon}/>
                            <p className="login__title">{this.props.loginFailed}</p>
                        </div>

                    :

                    undefined}
                </div>
            }
            </div>
            
            
        );
        
    }
}
// const mapStateToProps = (state) => ({
//     id:state.user.id
// })
function mapStateToProps(state){
    const id = state.user.id;
    const currentRoute = state.routes.currentRoute
    const loginFailed = state.main.loginFailed
    return {id,currentRoute,loginFailed};
}
export default connect(mapStateToProps)(SignUp)