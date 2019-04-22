import React,{Component} from 'react'
import { Segment, Form,  TextArea, Button, Breadcrumb, Message, Header, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './CreateProject.css'
import axios from '../../axios-base';
import {connect} from 'react-redux'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate:new Date(),
            tecnologyType : "",
            tecnologyName : "",
            projectTecnologies:[],
            tecnologyError:false,
            validationError:false,
            projectName:"",
            projectClientName:"",
            projectClientEmail:"",
            projectClientMobile:"",
            projectClientWebUrl:"",
            projectDescription:"",
            submitLoad:false,
            submitError:false
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
      }

    handleChangeStart(date) {

        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let formattedDate = [year, month, day].join('-');

        this.setState({
          startDate: formattedDate
        });
    }

    handleChangeEnd(date) {

        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let formattedDate = [year, month, day].join('-');

        this.setState({
          endDate: formattedDate
        });
    }

    tecnologyNamehandler = (event)=>{
        this.setState({
            tecnologyError:false,
            tecnologyName:event.target.value
        })
    }

    tecnologyTypehandler = (event)=>{
        this.setState({
            tecnologyError:false,
            tecnologyType:event.target.value
        })
    }

    projectNameChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectName:event.target.value
        })
    }

    projectClientNameChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectClientName:event.target.value
        })
    }

    projectClientEmailChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectClientEmail:event.target.value
        })
    }

    projectClientMobileChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectClientMobile:event.target.value
        })
    }
    
    projectClientWebChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectClientWebUrl:event.target.value
        })
    }

    projectDescriptionChangeHandler = (event) => {
        this.setState({
            validationError:false,
            projectDescription:event.target.value
        })
    }

    tecnologyHandler= ()=>{
        if(this.state.tecnologyType === "" && this.state.tecnologyName === ""){
            this.setState({
                tecnologyError:true
            })
        } else {
            let tecnology = {
                tecnologyType:this.state.tecnologyType,
                tecnologyName:this.state.tecnologyName
            }
            let tecnologies = [...this.state.projectTecnologies];
            tecnologies = tecnologies.concat(tecnology);

            this.setState({
                tecnologyError:false,
                projectTecnologies:tecnologies
            })
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({
            submitLoad:true,
            submitError:false
        })
        if(this.validateFileds()){
            let submitFormat = {
                projectName:this.state.projectName,
                projectStartDate:this.state.startDate,
                projectEndDate:this.state.endDate,
                projectDescription:this.state.projectDescription,
                tecnologiesDetails:this.state.projectTecnologies,
                clientDetails:{
                    clientName:this.state.projectClientName,
                    clientEmail:this.state.projectClientEmail,
                    clientMobile:this.state.projectClientMobile,
                    clientWebUri:this.state.projectClientWebUrl
                }
            }
            
            axios({
                method:'post',
                url:'/project/proj/project-save',
                data:submitFormat,
                headers: {
                    Authorization: 'Bearer ' + this.props.authToken
                  }
    
            }).then((response) => {
               this.setState({
                    submitLoad:false,
                    submitError:false
               })
               NotificationManager.success('Success message', 'Project saved Successfully');
            }).catch((err)=>{
                this.setState({
                    submitLoad:false,
                    submitError:true
               })
               NotificationManager.error('Error message', 'Something went Wrong!', 5000);
            })

            
        }


    }

    validateFileds = () => {
        if(this.state.projectName === ""){
            return false;
        } else if(this.state.projectClientName === ""){
            return false;
        } else if(this.state.projectClientEmail === ""){
            return false;
        } else if(this.state.projectClientMobile === ""){
            return false;
        } else if(this.state.projectClientWebUrl === ""){
            return false;
        } else if(this.state.projectDescription === ""){
            return false;
        } else if(!this.state.projectTecnologies.length){
            return false;
        } else {
            return true;
        }
    }

    render(){

        const { tecnologyError,validationError } = this.state;

        return(
            <Segment>
                <center><div style={{paddingTop:10,paddingBottom:10}}>
                   <Header  as='h2'>
                        <Icon name='puzzle piece' />
                        <Header.Content>
                        Project Settings
                        <Header.Subheader>Manage your preferences</Header.Subheader>
                        </Header.Content>
                    </Header>
                </div></center>
                 <Form onSubmit={this.submitHandler}>
                    <Form.Input
                        fluid
                        label='Project name'
                        placeholder='Project name'
                        error={validationError?true:false}
                        onChange={this.projectNameChangeHandler}
                        required
                    />
                    <Form.Input
                        fluid
                        label='Project client name'
                        placeholder='Client name'
                        error={validationError?true:false}
                        onChange={this.projectClientNameChangeHandler}
                        required
                    />
                    <Form.Input
                        fluid
                        label='Project client email'
                        placeholder='client email'
                        error={validationError?true:false}
                        onChange={this.projectClientEmailChangeHandler}
                        required
                    />
                    <Form.Input
                        fluid
                        label='Project client mobile'
                        placeholder='client mobile'
                        error={validationError?true:false}
                        onChange={this.projectClientMobileChangeHandler}
                        required
                    />
                    <Form.Input
                        fluid
                        label='Project client web url'
                        placeholder='client web url'
                        error={validationError?true:false}
                        onChange={this.projectClientWebChangeHandler}
                        required
                    />
                    <label><strong>Project Dates</strong></label><br/><br/> 
                    <div style={{paddingRight:"5%",paddingLeft:"2%"}}>
                        <label  style={{paddingRight:"2%",paddingLeft:"2%"}} >Start Date</label>
                        <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            dateFormat="yyyy-MM-dd"
                            showMonthYearPicker
                            onChange={this.handleChangeStart}
                            className="inputWidth"
                        />
                        <label className="lblDisplay" style={{paddingRight:"2%",paddingLeft:"2%"}} ><strong>UTC+5:30 hours - IST - Local- SL</strong></label>
                    </div>
                    <br />
                    <div style={{paddingRight:"5%",paddingLeft:"2%"}}>
                        <label style={{paddingRight:"2.7%",paddingLeft:"2%"}} >End Date</label> 
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            dateFormat="yyyy-MM-dd"
                            showMonthYearPicker
                            onChange={this.handleChangeEnd}
                            className="inputWidth"
                        />
                        <label className="lblDisplay" style={{paddingRight:"2%",paddingLeft:"2%"}} ><strong>UTC+5:30 hours - IST - Local- SL</strong></label>
                    </div>
                    <br/>
                    <br/>
                        <label><strong>Project Tecnologies</strong></label><br/><br/>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Tecnology type'
                                placeholder='Tecnology type'
                                required
                                error={tecnologyError}
                                onChange={this.tecnologyTypehandler}
                            />
                            <Form.Input
                                fluid
                                label='Tecnology Name'
                                placeholder='Tecnology name'
                                required
                                onChange={this.tecnologyNamehandler}
                                error={tecnologyError}
                            />
                            <Button onClick={this.tecnologyHandler} floated="right" style={{height:"50%",marginTop:"2.5%",float:"right"}} primary>Add </Button>
                        </Form.Group>
                        <div style={{paddingTop:"1%",paddingBottom:"1%",paddingLeft:"2%"}}>
                            {this.state.projectTecnologies.map(tec=> (
                                <React.Fragment>
                                    <Breadcrumb>
                                        <Breadcrumb.Section link>{tec.tecnologyType}</Breadcrumb.Section>
                                        <Breadcrumb.Divider icon='right arrow' />
                                        <Breadcrumb.Section active>{tec.tecnologyName}</Breadcrumb.Section>
                                    </Breadcrumb>
                                    <br/>
                                </React.Fragment>
                            ))}
                           
                        </div>
                    <br />
                    <Form.Field onChange={this.projectDescriptionChangeHandler} control={TextArea} label='Project Description' error={validationError?true:false} placeholder='Tell us more about the project....' required />
                    <Button loading={this.state.submitLoad} color='vk' fluid>Submit your project</Button>
                 </Form>
                 <Message
                    error
                    style={{display:tecnologyError?"block":"none"}}
                    header='Please specify one or more project tecnologies'
                    list={[
                    'Project tecnologies must not be empty.',
                    ]}
                />
                <NotificationContainer/>
            </Segment>
        );
    }
}

const mapStateToProps = state => {
    return{
        authToken:state.auth.accessToken
    }
};

export default connect(mapStateToProps)(CreateProject);
