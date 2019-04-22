import React,{ Component } from "react";
import axios from '../../axios-base';
import {connect} from 'react-redux';
import _ from 'lodash'
import { Segment, Dropdown, Card, Table, Icon, Header, Menu, List, Message } from "semantic-ui-react";

class MyProjects extends Component {

    state = { 
        visible: false,
        dropDownData : [],
        viewData : [],
        currentProject : null,
        projectTasks : [],
        projectAdminsDisplay : [],
        projectError: false,
        projectLoad: false
       };

    componentDidMount(){
        this.setState({
            projectLoad : true,
            projectError:false
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
    
                    console.log(myProjectsDropDown);
                    console.log(myProjects);
    
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
        let modifiedTasks = [];
        if(currentData.projectUserType !== "Admin" && currentData.projectTasks && currentData.projectTasks.length){
          let projectTasks = [...currentData.projectTasks];
          
          projectTasks.map(task => {
            let devList = [...task.taskDevList];
            let modifiedDevList = [] ;
            let taskData = {
              taskName : task.taskName,
              taskDescription : task.taskStartTime,
              taskStartTime : task.taskEndTime,
              taskEndTime : task.taskDescription
            }
            devList.map(dev => {
              {
                let newDev= {
                key: dev.userId,
                text: dev.name,
                value: dev.userId,
                image: { avatar: true, src: dev.profilePic },
              }
              modifiedDevList.push(newDev);
              return modifiedDevList;
            }
            })
            taskData.devList = modifiedDevList;
            modifiedTasks.push(taskData)
            return modifiedTasks;
          })
          
        }

        let cloneProjectAdmins = [...currentData.projectAdmins];
        let modifiedAdmins = [];

        cloneProjectAdmins.map(admin => {
            let newAdmin = {
                key: admin.userId,
                text: admin.name,
                value: admin.userId,
                image: { avatar: true, src: admin.profilePic},
            }
            modifiedAdmins.push(newAdmin);
            return modifiedAdmins;
        });
        

          console.log(modifiedTasks);
            if(currentData.projectUserType !== "Admin"  &&  modifiedTasks.length){
              this.setState({
                currentProject : currentData,
                projectTasks : modifiedTasks,
                projectAdminsDisplay:modifiedAdmins
              })
            } else {
              this.setState({
                currentProject : currentData,
                projectAdminsDisplay:modifiedAdmins,
                projectTasks:[]
              })
              console.log(currentData);
            }
      }

      render(){

        let stateOptions = [...this.state.dropDownData];
          return(
              <React.Fragment>
                   <Segment>
                    <Dropdown onChange={this.handleChange} placeholder='Manege your projects....' fluid search selection options={stateOptions} />
                    <div style={{paddingTop:20}}>
                        <Card fluid>
                        <Card.Content textAlign="center" header={this.state.currentProject? "Project - "+this.state.currentProject.projectName : "no header" } />
                            <Card.Content extra>
                                <Table>
                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell collapsing>
                                        <Icon name='tag' style={{paddingRight:5}} />
                                        Project Id &nbsp;&nbsp;&nbsp;            
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectId : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing>
                                        <Icon name='map' style={{paddingRight:5}} />
                                        Project Name &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectName : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing>
                                        <Icon name='calendar alternate' style={{paddingRight:5}} />
                                        Project Start Date &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectStartDate : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='calendar outline' style={{paddingRight:5}} />
                                        Project End Date &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectEndDate : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='file text' style={{paddingRight:5}} />
                                        Project Description &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectDescription : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='user circle' style={{paddingRight:5}} />
                                        Project Admins &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span>
                                                View Admin by{' '}
                                                <Dropdown
                                                inline
                                                options={this.state.projectAdminsDisplay}
                                                />
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='universal access' style={{paddingRight:5}} />
                                        Project User Type &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectUserType : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='user circle outline' style={{paddingRight:5}} />
                                        Project - Client Name &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectClient.clientName : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='phone' style={{paddingRight:5}} />
                                        Project - Client Contact No. &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectClient.clientMobile : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell collapsing >
                                        <Icon name='mail' style={{paddingRight:5}} />
                                        Project - Client Email &nbsp;&nbsp;&nbsp;&nbsp;
                                        </Table.Cell>
                                        <Table.Cell>{this.state.currentProject? this.state.currentProject.projectClient.clientEmail : "Choose your Project" }</Table.Cell>
                                    </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                        </Card>
                    </div>
                    <center>
                        <div style={{paddingTop:20,paddingBottom:20}}>
                            <Header as='h2'>
                                <Icon name='settings' />
                                <Header.Content>
                                Project Tasks
                                <Header.Subheader>Manage your tasks</Header.Subheader>
                                </Header.Content>
                            </Header>
                            </div>
                        </center>
                        <Menu fluid vertical>
                        {this.state.projectTasks.length? this.state.projectTasks.map(task => 
                                (
                                <Menu.Item 
                                name='promotions'
                                >
                                <List animated verticalAlign='middle'>
                                    <List.Item>
                                    <List.Content>
                                        <List.Header className="displayClass" >Task Name<span style={{paddingRight:5,paddingLeft:5 }}>-</span></List.Header>
                                        <List.Description  className="displayClass" >{task.taskName}</List.Description>
                                    </List.Content>
                                    </List.Item>
                                    <List.Item>
                                    <List.Content>
                                        <List.Header className="displayClass" >Task Start Time<span style={{paddingRight:5,paddingLeft:5 }}>-</span></List.Header>
                                        <List.Description  className="displayClass" >{task.taskDescription}</List.Description>
                                    </List.Content>
                                    </List.Item>
                                    <List.Item>
                                    <List.Content>
                                        <List.Header className="displayClass" >Task End Time<span style={{paddingRight:5,paddingLeft:5 }}>-</span></List.Header>
                                        <List.Description  className="displayClass" >{task.taskStartTime}</List.Description>
                                    </List.Content>
                                    </List.Item>
                                    <List.Item>
                                    <List.Content>
                                        <List.Header className="displayClass" >Task Description<span style={{paddingRight:5,paddingLeft:5 }}>-</span></List.Header>
                                        <List.Description  className="displayClass" >{task.taskEndTime}</List.Description>
                                    </List.Content>
                                    </List.Item>
                                    <List.Item>
                                    <List.Content>
                                        <List.Header className="displayClass" >Task Dev List<span style={{paddingRight:5,paddingLeft:5 }}>-</span> {' '}</List.Header>
                                        <List.Description  className="displayClass" >
                                                <Dropdown
                                                inline
                                                options={task.devList}
                                                />
                                        </List.Description>
                                    </List.Content>
                                    </List.Item>
                                </List>
                                </Menu.Item>
                            ) 
                            ) : (
                            <Message warning>
                            <Message.Header>No Tasks To Display Yet!</Message.Header>
                            <p>Please be alarted for tasks.</p>
                            </Message>
                            )}
                        </Menu>
                    </Segment>
              </React.Fragment>
          )
      }
}

const mapStateToProps = state => {
    return {
        authToken:state.auth.accessToken  
    }
}

export default connect(mapStateToProps)(MyProjects);
