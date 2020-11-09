import React from 'react'
import {connect} from 'react-redux';
import {createAccountAction} from '../actions/user'

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
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

    render(){
        return (
            <div>
                <div className='signUpContainer'>
                    <h1 className='title'>Localhost</h1>
                    <form className="form" onSubmit={this.signUp}>
                        <input className='form-input' name='name' type='text' placeholder='Name' value={this.state.name} onChange={this.handleInputChange}/>
                        <input className='form-input' name='email' type='email' placeholder='email' value={this.state.email} onChange={this.handleInputChange}/>
                        <input className='form-input' name='password' type='password' placeholder='password' value={this.state.password} onChange={this.handleInputChange}/>
                        <input className='form-input' name='confirmPassword' type='password' placeholder='Confirm password' value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                        <button className="button">Sign Up</button>
                    </form>
                </div>
            </div>
        );
        
    }
}
// const mapStateToProps = (state) => ({
//     id:state.user.id
// })
function mapStateToProps(state){
    const id = state.user.id;
    return {id};
}
export default connect(mapStateToProps)(SignUp)