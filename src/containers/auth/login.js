import React,{Component} from 'react';
import { Segment, Grid, Header,Form, Button, Message,  Icon} from 'semantic-ui-react';
import {NavLink,Redirect} from 'react-router-dom'
import * as actionTypes from '.././../store/index'
import {connect} from 'react-redux'
import './login.css'

class Login extends Component {

    state = {
        username:{
            value:"",
            touched:false
        },
        password:{
            value:"",
            touched:false
        },
        validationErrors: []
    }

    handleInputErrors = (inputName,errors) => {
        return errors.some(error=>
            error.message.toLowerCase().includes(inputName)
            ) ? "error" : ""
    }

    handleChange = (event)=>{
        if(event.target.name === "username"){
            let updatedUsername = {...this.state.username}
            updatedUsername.value = event.target.value
            this.setState({username:updatedUsername})

        } else if(event.target.name === "password") {
            let updatedPassword = {...this.state.password}
            updatedPassword.value = event.target.value
            this.setState({password:updatedPassword})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.username.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Username"})})
        } else if(this.state.password.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Password"})})
        }
        if(this.isFormValid()){
            this.props.onSubmit(this.state.username.value,this.state.password.value);
        }
        
    }

    isFormValid = () => this.state.username.value !== "" && this.state.password.value !== "";


    
    displayErrors = errors => errors.map((error,index)=>(
        <p key={index}>{error.message}</p>
    ));

    render(){

        let username = this.state.username.value;
        let password = this.state.password.value;

        let setRedirect = null
        if(this.props.isAuthenticated){
            setRedirect = <Redirect to="/" />
        }


        return(
            <div className='login-form'>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
            </style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                {setRedirect}
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  <Icon name="code branch" size="huge" /> Log-in to your account
                </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input 
                                fluid
                                icon='user circle'
                                iconPosition='left'
                                size="large"
                                name="username" 
                                placeholder="Username" 
                                onChange={this.handleChange} 
                                type="text" 
                                value={username}
                                required 
                             />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                size="large"
                                name="password"
                                onChange={this.handleChange}
                                value={password}
                                required
                            />

                            <Button onClick={this.handleSubmit} color='teal' fluid size='large'>
                            Login
                            </Button>
                        </Segment>
                    </Form>
                    {this.state.validationErrors.length > 0? (<Message error><h3>Error</h3>{this.displayErrors(this.state.validationErrors)}</Message>):null} 
                    {this.state.errors ? (<Message error><h3>Error</h3>{this.props.errors}</Message>):null} 
                    <Message>Don't have an account ?  <NavLink to="/register">Signup</NavLink></Message>
                    </Grid.Column>
                    </Grid>
                </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.accessToken !== null,
        loading:state.auth.loading,
        errors:state.auth.errors
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onSubmit : (username,password) => dispatch(actionTypes.authLogin(username,password))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps) (Login)