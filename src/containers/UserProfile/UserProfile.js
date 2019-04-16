import React,{Component} from 'react'
import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/footer'
import { Grid, Segment, Menu, Modal, Dimmer, Loader, GridColumn, Image, Header, Icon } from 'semantic-ui-react';
import axios from '../../axios-base'

class UserProfile extends Component {

    state = {
        user : null,
        loading: false,
        error : null
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    componentDidMount(){
        let param = new URLSearchParams(this.props.location.search);
        console.log(param.get("user"));
        axios.get("staffUser/get-one-user?user="+param.get("user"))
        .then(response => {
                let user = {
                    userId : response.data.userId,
                    name : response.data.name,
                    email : response.data.email,
                    profilePic : response.data.profilePic,
                    username : response.data.username,
                    userrole : response.data.userRole
                }
                console.log(user) 
                this.setState({
                    loading:false,user:user
                })
                
        })
        .catch(error => {
            console.log(error.response)
            this.setState({
                error:"Server Error",
                loading:false
            })
        })
    }

    handleItemClick = name => this.setState({ activeItem: name })

    render(){
        const { activeItem,open, dimmer } = this.state || {}

        if(this.state.error){
            this.show('blurring')
        }
        let dimmerVal = false;
        if(this.state.loading){
            dimmerVal = true;
        }

        let oneUser =  null
        if(this.state.user){
            oneUser = {...this.state.user}
        }

        return(
            <React.Fragment>
                 <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Something Went Wrong</Modal.Header>
                    <Modal.Content >
                        <div>Plese Check Your Internet Connectivity</div>
                    </Modal.Content>
                </Modal>
                <NavBar />
                    <Grid columns={3} stackable style={{marginTop:"4%",marginBottom:"4%"}}>
                        <Dimmer active={dimmerVal}>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <GridColumn width={3}></GridColumn>
                        <Grid.Column width={10}>
                            <center><Header as='h2' color="blue" icon>
                                <Icon name='settings' />
                                Account Settings
                                <Header.Subheader>Manage account settings and set e-mail preferences.</Header.Subheader>
                            </Header></center>
                            <Menu vertical fluid>
                            <center> <Menu.Item>
                                <Image src={oneUser?oneUser.profilePic:null} />
                                <br/>
                                <Menu.Header> {oneUser?oneUser.name:null}</Menu.Header>

                                </Menu.Item></center>

                                <Menu.Item>
                                <Menu.Header>Name</Menu.Header>

                                <Menu.Menu>
                                    <Menu.Item
                                    name={oneUser?oneUser.name:null}
                                    active={activeItem === oneUser?oneUser.name:null}
                                    onClick={this.handleItemClick}
                                    />
                                </Menu.Menu>
                                </Menu.Item>

                                <Menu.Item>
                                <Menu.Header>Email</Menu.Header>

                                <Menu.Menu>
                                    <Menu.Item
                                    name={oneUser?oneUser.email:null}
                                    active={activeItem === oneUser?oneUser.email:null}
                                    onClick={this.handleItemClick}
                                    />
                                </Menu.Menu>
                                </Menu.Item>

                                <Menu.Item>
                                <Menu.Header>Username</Menu.Header>

                                <Menu.Menu>
                                    <Menu.Item name={oneUser?oneUser.username:null} active={activeItem === oneUser?oneUser.username:null} onClick={this.handleItemClick}>
                                        {oneUser?oneUser.username:null}
                                    </Menu.Item>
                                </Menu.Menu>
                                </Menu.Item>

                                <Menu.Item>
                                <Menu.Header>User Role</Menu.Header>

                                <Menu.Menu>
                                    <Menu.Item name={oneUser?oneUser.userrole:null} active={activeItem === oneUser?oneUser.userrole:null} onClick={this.handleItemClick}>
                                        {oneUser?oneUser.userrole:null}
                                    </Menu.Item>
                                </Menu.Menu>
                                </Menu.Item>

                                
                            </Menu>
                        </Grid.Column>
                        <GridColumn width={3}></GridColumn>
                    </Grid>
                <Footer />
            </React.Fragment>
        )
    }

}

export default UserProfile;