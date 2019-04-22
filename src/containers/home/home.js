import React, { Component } from "react";

 import {
  Grid,
  Button,
  Sidebar,
  Menu,
  Icon,
  Segment,
  Card,
  Feed
} from "semantic-ui-react";
import {Route} from 'react-router-dom'

import {connect} from 'react-redux';
import './home.css'
import MyProjects from "../MyProjects/MyProjects";
import AllProjects from "../AllProjects/AllProjects";
import CompletedProjects from "../CompletedProjects/CompletedProjects";
import PendingProjects from "../PendingProjects/pendingProjects";
import CreateProject from "../CreateProject/CreateProject";
import ProjectTasks from "../ProjectTasks/ProjectTasks";

class Home extends Component {
  state = { 
      visible: false,
      dropDownData : [],
      viewData : [],
      currentProject : null,
      projectTasks : [],
      projectError: false,
      projectLoad: false
     };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  componentDidMount(){
  }

  render() {
    const { visible } = this.state;
 
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
                        <Route path="/projects/my-projects" component={MyProjects}/>
                        <Route path="/projects/all-projects" component={AllProjects}/>
                        <Route path="/projects/completed-projects" component={CompletedProjects}/>
                        <Route path="/projects/pending-projects" component={PendingProjects}/>
                        <Route path="/projects/create-projects" component={CreateProject}/>
                        <Route path="/projects/project-tasks" component={ProjectTasks} />
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
