import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Image, Header } from 'semantic-ui-react';
import logo from '../../assessts/rsvpster-logo (1).png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  

  render() {
    let user = {...this.props.user}
    console.log(user.profileUrl)

    let signIn = null;
    if(this.props.isAthenticated){
        signIn = (
          <NavItem>
            <NavLink><Link to="/account"><span style={{color:"#808080",fontSize:16}}>
            
            <Header as='h4' >
              <Image circular src={user.profileUrl} /><span>Signed in as {user.username} </span>
            </Header>

             </span></Link></NavLink>
          </NavItem>
        )
    }

    return (
       <div>
        <Navbar style={{backgroundColor:"#cce2ff",height:80}} expand="md">
          <NavbarBrand><Link to="/"><Image src={logo} style={{width:170,paddingLeft:30}}  wrapped /></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {signIn}
              <NavItem>
                <NavLink><Link to="/test"><span style={{color:"#808080",fontSize:16}}>My events</span></Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/event-categories"><span style={{color:"#808080",fontSize:16}}>Event categories</span></Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <span style={{color:"#808080",fontSize:16}}>More options</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                       <span >{this.props.isAthenticated?<Link to="/logout">logout.</Link>:<Link to="/login">login.</Link>}</span> 
                  </DropdownItem>
                  <DropdownItem>
                       <span>Email api.</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <span>Push notifications.</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.auth.userData,
    isAthenticated: state.auth.accessToken != null
  }
}

const mapDispatchToProp = (dispatch) => {
  return{
  }
}

export default connect(mapStateToProps,mapDispatchToProp)(NavBar);