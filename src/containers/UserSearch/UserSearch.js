import React,{Component} from 'react'
import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/footer'
import { Grid,  Item, Button, Search, Menu, Icon, Segment, Header } from 'semantic-ui-react';
import axios from '../../axios-base'
import _ from 'lodash'

class UserSearch extends Component {

    state = {
        dataset : [],
        isLoading: false,
        results: [],
        buttonLoading:false,
        submitError:null,
        value: '',
        noOFAdmins:0
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {  
        this.setState({ value: result.title,selectPreferance:result.userId })
        this.redirectToUser(result.userId);
     } 
  
    handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value })
  
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()
  
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.title)
  
        this.setState({
          isLoading: false,
          results: _.filter(this.state.dataset, isMatch),
        })
      }, 300)
    }

    componentDidMount(){

        console.log(this.props.match.params.id)

        axios.get("/staffUser/get-all-users")
            .then((response)=>{
                let users = [];
                let one = response.data.map(user => {
                        let newUser = {
                            userId:user.userId,
                            title:user.name,
                            description:user.email,
                            price:user.username,
                            image:user.profilePic
                        }
                        users.push(newUser);
                })
                console.log(one);
                this.setState({
                    dataset:users
                })
            })
            .catch((err)=>{
                console.log(err.response);
            })
    }

    redirectToUser =  (userId) => {
        let quaryParam = encodeURIComponent("user") + '=' + encodeURIComponent(userId);
        this.props.history.push({
            pathname:'/profile',
            search: '?' + quaryParam
        }) 
    }

    render(){
        const { isLoading, value, results } = this.state

        let users = [];
        if(this.state.dataset &&  this.state.dataset.length){
            users = [...this.state.dataset];
        }

        return(
            <React.Fragment>
                <NavBar />
                    <Grid columns={3} style={{marginTop:"2%",marginBottom:"2%"}}>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}>
                        <center><Menu compact >
                            <Menu.Item as='a'>
                            <Icon name='users' /> Search Users
                            </Menu.Item>
                            <Menu.Item as='a'>
                            <Search
                            className="widthIncrese"
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                            </Menu.Item>
                        </Menu></center>
                       
                        
                        <Item.Group relaxed style={{marginTop:"5%"}}>
                            {users.length? 
                                (
                                    <React.Fragment>
                                        {users.map(user => (
                                             <Item>
                                             <Item.Image size='small' src={user.image} />
                                             <Item.Content verticalAlign='middle'>
                                                 <Item.Header>{user.title}</Item.Header>
                                                 <Item.Description>
                                                 <strong>email</strong> : {user.description}<br/>
                                                 <strong>username</strong> : {user.price}
                                                 </Item.Description>
                                                 <Item.Meta>
                                                 <span className='price'>Active {Math.floor(Math.random() * 100)} hours ago</span>
                                                 </Item.Meta>
                                                 <Item.Extra>
                                                 <Button onClick={() =>this.redirectToUser(user.userId)} floated='right'>View This User</Button>
                                                 </Item.Extra>
                                             </Item.Content>
                                             </Item>
                                        ))}
                                    </React.Fragment>
                                )
                            :
                                (  <Segment placeholder>
                                        <Header icon>
                                            <Icon name='search' />
                                               We don't have any Users for display.
                                            </Header>
                                                <Segment.Inline>
                                                    <Button primary>Clear Query</Button>
                                                    <Button>Add Document</Button>
                                                </Segment.Inline>
                                    </Segment>
                                )
                            }
                        </Item.Group>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid>
                <Footer />
            </React.Fragment>
        )
    }
}

export default UserSearch;