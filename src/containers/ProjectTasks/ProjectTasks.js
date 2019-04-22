import React,{Component} from 'react';
import axios from '../../axios-base';
import _ from 'lodash';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Segment, Header, Icon, Form, TextArea, Dropdown, Button,  Breadcrumb } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

class ProjectTasks extends Component{

    constructor(props) {
        super(props);
        this.state = {
                startDate: new Date(),
                endDate:new Date(), 
                dropDownData : [],
                viewData : [],
                currentProject : null,
                projectTasks : [],
                projectError: false,
                projectLoad: false,
                validationError:false,
                userList:[],
                devList:[],
                submitLoad:false,
                submitError:false,
                taskName : "",
                taskDescription : ""
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

    componentDidMount(){
        this.setState({
            projectLoad : true,
            projectError:false
        })
        axios.get("/user/staffUser/get-all-users")
            .then(response=>{
                let userList = []
                if(response.data){
                    response.data.map(user=>{
                        let newUser = {
                            key: user.userId,
                            text: user.name,
                            value: user.userId,
                            image: { avatar: true, src: user.profilePic},
                        }
                        userList.push(newUser);
                        return userList;
                    })
                    this.setState({
                        projectLoad : false,
                        userList:userList
                    })
                }
            })
            .catch(error=>{
                this.setState({
                    projectLoad : false,
                    projectError: true
                })
            })

        axios({
            method:'get',
            url:'/project/project-user',
            headers: {
                Authorization: 'Bearer ' + this.props.authToken
              }
        }).then((response) => {
                console.log("projects");
                console.log(response);
    
                let myProjectsDropDown = [];
                let myProjects = [];
    
                response.data.adminProjects.map(data => {
                    let newData = {
                        key:data.projectId,
                        text:data.projectName,
                        value:data.projectId
                    }               
                    let myData = {
                        projectId : data.projectId,
                        projectName : data.projectName,
                        projectStartDate : data.projectStartDate,
                        projectEndDate : data.projectEndDate,
                        projectDescription : data.projectDescription,
                        projectUserType:"Admin",
                        projectAdmins : [...data.projectAdmins],
                        projectTasks : [...data.projectTasks],
                        tecnologies : [...data.tecnologies],
                        projectClient : {...data.projectClient}
                    }
    
                    myProjectsDropDown.push(newData);
                    myProjects.push(myData);
                    return myProjects;
                })
    
                response.data.devProjects.map(data => {
                    let newData = {
                        key:data.projectId,
                        text:data.projectName,
                        value:data.projectId
                    }
    
                    let myData = {
                        projectId : data.projectId,
                        projectName : data.projectName,
                        projectStartDate : data.projectStartDate,
                        projectEndDate : data.projectEndDate,
                        projectDescription : data.projectDescription,
                        projectAdmins : [...data.projectAdmins],
                        projectTasks : [...data.projectTasks],
                        projectUserType:"Devoloper",
                        tecnologies : [...data.tecnologies],
                        projectClient : {...data.projectClient}
                    }
    
                    myProjectsDropDown.push(newData);
                    myProjects.push(myData);
                    return myProjects;
                })
    
                response.data.devAdminProjects.map(data => {
                    let newData = {
                        key:data.projectId,
                        text:data.projectName,
                        value:data.projectId
                    }
    
                    let myData = {
                        projectId : data.projectId,
                        projectName : data.projectName,
                        projectStartDate : data.projectStartDate,
                        projectEndDate : data.projectEndDate,
                        projectDescription : data.projectDescription,
                        projectAdmins : [...data.projectAdmins],
                        projectUserType:"Admin-Dev",
                        projectTasks : [...data.projectTasks],
                        tecnologies : [...data.tecnologies],
                        projectClient : {...data.projectClient}
                    }
                    
                    myProjectsDropDown.push(newData);
                    myProjects.push(myData);
    
                    this.setState({
                        dropDownData : myProjectsDropDown,
                        viewData : myProjects,
                        projectLoad:false,
                        projectError:false
                    })
                    return myProjects;
                })
        }).catch((err)=>{
            this.setState({
                projectLoad : false,
                projectError: true
            })
        })
      }

    handleChange= (e, { value })=>{
        let dataList = [...this.state.viewData];

        let currentData = _.find(dataList, (o)=>{
          return o.projectId === value
        });
        this.setState({
            currentProject:currentData
        })
    }

    handleChangeUser= (e, { value })=>{
        let dataList = [...this.state.userList];

        let currentData = _.find(dataList, (o)=>{
          return o.value === value
        });

        let devList = [...this.state.devList];
        devList = devList.concat(currentData);

        this.setState({
            devList:devList
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitLoad:true,
            submitError:false
        })
        if(this.validateFields()){

            let devList = [...this.state.devList];
            let modifiedList = [];
            devList.map(dev=> {
                modifiedList.push(dev.key);
                return modifiedList;
            })

            let submitFormat = {
                projectId : this.state.currentProject.projectId,
                taskName : this.state.taskName,
                taskStartTime : this.state.startDate,
                taskEndTime : this.state.endDate,
                taskDescription: this.state.taskDescription,
                devList : modifiedList
            }

            axios({
                method:'post',
                url:'/project/tasks/tasks',
                data:submitFormat
            }).then((response) => {
               this.setState({
                    submitLoad:false,
                    submitError:false
               })
               NotificationManager.success('Success message', 'Task saved Successfully');
            }).catch((err)=>{
                this.setState({
                    submitLoad:false,
                    submitError:true
               })
               NotificationManager.error('Error message', 'Task went Wrong!', 5000);
            })
        }

    }

    validateFields = ()=>{
        if(this.state.taskName === ""){
            return false;
        } else if(this.state.taskDescription === "") {
            return false;
        } else if(!this.state.currentProject){
            return false;
        } else if(!this.state.devList.length){
            return false;
        } else return true;
    }

    taskNameHandler = (event)=>{
        this.setState({
            taskName:event.target.value,
            validationError:false
        })
    }

    taskDescriptionHandler = (event)=>{
        this.setState({
            taskDescription:event.target.value,
            validationError:false
        })
    }

    render(){
        let stateOptions = [...this.state.dropDownData];
        let validationError = this.state.validationError;
        let userList = [...this.state.userList];
        return(
            <Segment>
            <center><div style={{paddingTop:10,paddingBottom:10}}>
               <Header  as='h2'>
                    <Icon name='puzzle piece' />
                    <Header.Content>
                    Task Settings
                    <Header.Subheader>Manage your preferences</Header.Subheader>
                    </Header.Content>
                </Header>
            </div></center>
             <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    fluid
                    label='Task name'
                    placeholder='Task name'
                    error={validationError?true:false}
                    onChange={this.taskNameHandler}
                    required
                />
                <label><strong>Select your project</strong></label><br/>
                <Dropdown onChange={this.handleChange} placeholder='Manege your projects....' fluid search selection options={stateOptions} />

                <br/><label><strong>Task Dates</strong></label><br/><br/> 
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
                <label><strong>Select your project</strong></label><br/>
                <Dropdown onChange={this.handleChangeUser} placeholder='Manege your projects....' fluid search selection options={userList} />
                <br/>
                <div>
                {this.state.devList.length?this.state.devList.map(user=>(
                    <React.Fragment>
                        <Breadcrumb>
                            <Breadcrumb.Section link>Dev</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active>{user.text}</Breadcrumb.Section>
                        </Breadcrumb>
                        <br />
                    </React.Fragment>
                )):null}

                </div>
                <br/>
                <Form.Field onChange={this.taskDescriptionHandler} control={TextArea} label='Task Description' error={validationError?true:false} placeholder='Tell us more about the task....' required />  
                       
                <br />
                <Button loading={this.state.submitLoad} color='vk' fluid>Submit your task</Button>
             </Form>
            <NotificationContainer/>
        </Segment>
        )
    }

}

const mapStateToProps = state => {
    return{
        authToken:state.auth.accessToken
    }
};

export default connect(mapStateToProps)(ProjectTasks);