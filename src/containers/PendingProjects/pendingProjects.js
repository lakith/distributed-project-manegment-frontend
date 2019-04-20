import React,{Component} from 'react';
import axios from '../../axios-base'
import { Segment, Table, Header, Rating, Message, List, Icon } from 'semantic-ui-react';

class PendingProjects extends Component{

    state = {
        projectsLoad:false,
        projectsError:false,
        projects : []
    }

    componentDidMount(){
        this.setState({
            projectsLoad:true
        })
        axios.get("/project/proj/pending-projects")
        .then(response => {
            let projects = [...response.data];

            this.setState({
                projects : projects,
                projectsError:false,
                projectsLoad:false
            })
        })
        .catch(error => {
            this.setState({
                projectsError:false,
                projectsLoad:false
            })
        })
    }

    render(){
        return(
            <Segment>
                <div style={{paddingBottom:10,paddingTop:10}}>
                  <Header as='h2' icon textAlign='center'>
                    <Icon name='product hunt' circular />
                    <Header.Content>Pending Projects</Header.Content>
                    <Header.Subheader>Manage your Projects and tasks.</Header.Subheader>
                 </Header>
                </div>
                  <Table celled padded>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Project Name</Table.HeaderCell>
                        <Table.HeaderCell>Project Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Project End Date</Table.HeaderCell>
                        <Table.HeaderCell>Project Efficacy</Table.HeaderCell>
                        <Table.HeaderCell>Project Tecnologies</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.projects.length?  this.state.projects.map(project=>(
                                <Table.Row key={project.projectId}>
                                    <Table.Cell>
                                        <Header as='h4' textAlign='center'>
                                                {project.projectName}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' singleLine>{project.projectStartDate}</Table.Cell>
                                    <Table.Cell textAlign='center' singleLine >
                                    {project.projectEndDate}
                                    </Table.Cell>
                                    <Table.Cell textAlign='center' singleLine>
                                        <Rating icon='star' defaultRating={Math.floor((Math.random() * 3) + 1)} maxRating={3} />
                                    </Table.Cell>
                                    <Table.Cell >
                                        <List>
                                        {project.tecnologies.map(tec=>(
                                            <List.Item key= {tec.tecnologyId}>
                                                <List.Header>{tec.tecnologyType}</List.Header>
                                                <span style={{paddingLeft:8}}> - {tec.tecnologyName}</span>
                                            </List.Item>
                                        ))}
                                        </List>
                                    </Table.Cell>
                                </Table.Row>
                        ))  :(
                        <React.Fragment>
                        <Message warning>
                        <Message.Header>No Projects To Display Yet!</Message.Header>
                        <p>Please be alarted for projects.</p>
                        </Message>
                        </React.Fragment>
                    )}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }

}

export default PendingProjects;