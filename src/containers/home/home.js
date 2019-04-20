import React, { Component } from "react";
import {
  Grid,
  Button,
  Sidebar,
  Menu,
  Icon,
  Segment,
  Card,
  Feed,
  Dropdown,
  Table
} from "semantic-ui-react";

import {connect} from 'react-redux';
import axios from '../../axios-base'
import _ from 'lodash'

class Home extends Component {
  state = { 
      visible: false,
      dropDownData : [],
      viewData : [],
      currentProject : null,
      projectError: false,
      projectLoad: false
     };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

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
                    projectUserType:"admin",
                    projectAdmins : [...data.projectAdmins],
                    projectTasks : [...data.projectTasks],
                    tecnologies : [...data.tecnologies],
                    projectClient : {...data.projectClient}
                }

                myProjectsDropDown.push(newData);
                myProjects.push(myData);
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
      // if(this.state.currentProject){
      //   if(this.state.currentProject.projectId !== currentData.projectId){
          this.setState({
            currentProject : currentData
          })
          console.log(currentData);
      //   }
      // }
  }

  render() {
    const { visible } = this.state;

    let stateOptions = [...this.state.dropDownData];

    return (
      <div>
        <Grid columns={1}>
          <Grid.Column width={16}>
            <div>
              <Sidebar.Pushable>
                <div style={{ padding: 10 }}>
                  <Button
                    disabled={visible}
                    /*style={{display:visible?"none":""}}*/ onClick={
                      this.handleShowClick
                    }
                    icon="sidebar"
                  />
                </div>

                <Sidebar
                  as={Menu}
                  animation="overlay"
                  icon="labeled"
                  inverted
                  onHide={this.handleSidebarHide}
                  vertical
                  visible={visible}
                  width="thin"
                >
                  <Menu.Item as="a">
                    <Icon name="home" />
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="gamepad" />
                    Games
                  </Menu.Item>
                  <Menu.Item as="a">
                    <Icon name="camera" />
                    Channels
                  </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher>
                  <Segment basic style={{ minHeight: 600 }}>
                    <Grid relaxed>
                      <Grid.Column computer="4" tablet="8" mobile="16">
                        <Card color="red" href="#card-example-link-card">
                          <Card.Content>
                            <Card.Header content="My Prtojects" />
                            <Card.Meta content="Musicians" />
                            <Card.Description content="Jake is a drummer living in New York." />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                      <Grid.Column computer="4" tablet="8" mobile="16">
                        <Card color="red" href="#card-example-link-card">
                          <Card.Content>
                            <Card.Header content="Completed Projects" />
                            <Card.Meta content="Musicians" />
                            <Card.Description content="Jake is a drummer living in New York." />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                      <Grid.Column computer="4" tablet="8" mobile="16">
                        <Card color="red" href="#card-example-link-card">
                          <Card.Content>
                            <Card.Header content="Pending Projects" />
                            <Card.Meta content="Musicians" />
                            <Card.Description content="Jake is a drummer living in New York." />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                      <Grid.Column computer="4" tablet="8" mobile="16">
                        <Card color="red" href="#card-example-link-card">
                          <Card.Content>
                            <Card.Header content="Total Users" />
                            <Card.Meta content="Musicians" />
                            <Card.Description content="Jake is a drummer living in New York." />
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid>
                    <Grid relaxed>
                      <Grid.Column computer="12" tablet="16" mobile="14" >
                      <Segment>

                      <Dropdown onChange={this.handleChange} placeholder='State' fluid search selection options={stateOptions} />
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
                                          <Table.Cell>Choose your Project</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.Cell collapsing >
                                            <Icon name='universal access ' style={{paddingRight:5}} />
                                            Project User Type &nbsp;&nbsp;&nbsp;&nbsp;
                                          </Table.Cell>
                                          <Table.Cell>{this.state.currentProject? this.state.currentProject.projectUserType : "Choose your Project" }</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.Cell collapsing >
                                            <Icon name='user circle outline' style={{paddingRight:5}} />
                                            Project - Client Name &nbsp;&nbsp;&nbsp;&nbsp;
                                          </Table.Cell>
                                          <Table.Cell>Choose your Project</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.Cell collapsing >
                                            <Icon name='phone' style={{paddingRight:5}} />
                                            Project - Client Contact No. &nbsp;&nbsp;&nbsp;&nbsp;
                                          </Table.Cell>
                                          <Table.Cell>Choose your Project</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.Cell collapsing >
                                            <Icon name='mail' style={{paddingRight:5}} />
                                            Project - Client Email &nbsp;&nbsp;&nbsp;&nbsp;
                                          </Table.Cell>
                                          <Table.Cell>Choose your Project</Table.Cell>
                                        </Table.Row>
                                      </Table.Body>
                                    </Table>
                                </Card.Content>
                            </Card>
                        </div>
                      </Segment>
                      </Grid.Column>
                      <Grid.Column computer="4" tablet="16" mobile="14" >
                        <Card >
                          <Card.Content>
                            <Card.Header>Recent Activity</Card.Header>
                          </Card.Content>
                          <Card.Content>
                            <Feed style={{padding:0}}>
                              <Feed.Event>
                                <Feed.Label image="https://www.w3schools.com/w3images/avatar2.png" />
                                <Feed.Content>
                                  <Feed.Date content="1 day ago" />
                                  <Feed.Summary>
                                    You added Jenny Hess to your coworker group.
                                  </Feed.Summary>
                                </Feed.Content>
                              </Feed.Event>

                              <Feed.Event>
                                <Feed.Label image="https://www.w3schools.com/w3images/avatar2.png" />
                                <Feed.Content>
                                  <Feed.Date content="3 days ago" />
                                  <Feed.Summary>
                                    You added Molly Malone as a friend.
                                  </Feed.Summary>
                                </Feed.Content>
                              </Feed.Event>

                              <Feed.Event>
                                <Feed.Label image="https://www.w3schools.com/w3images/avatar2.png" />
                                <Feed.Content>
                                  <Feed.Date content="4 days ago" />
                                  <Feed.Summary>
                                    You added Elliot Baker to your musicians
                                    group.
                                  </Feed.Summary>
                                </Feed.Content>
                              </Feed.Event>
                            </Feed>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        authToken:state.auth.accessToken  
    }
}

export default connect(mapStateToProps)(Home);
