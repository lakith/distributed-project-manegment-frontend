import React from 'react'
import {
    Container,
    Header,
    Segment,
    Grid,
    List,
    Divider,
    Image
  } from 'semantic-ui-react'

import logo from '../../assessts/rsvpster-logo (1).png'
import footerImage from '../../assessts/shutterstock_510365542_Web.jpg'
  

const Footer = (props) => {
    return(
    <div>
    <Segment inverted vertical style={{ padding: '5em 0em',backgroundImage:"url("+footerImage+")"}}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item><span style={{color:"#808080"}}>Sitemap</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>Contact Us</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>Religious Ceremonies</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>Gazebo Plans</span></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item><span style={{color:"#808080"}}>Banana Pre-Order</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>DNA FAQ</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>How To Access</span></List.Item>
                <List.Item><span style={{color:"#808080"}}>Favorite X-Men</span></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
              Footer Header
              </Header>
              <p>
              <span style={{color:"#808080"}}>Extra space for a call to action inside the footer that could help re-engage users.</span>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider inverted section />
        <Image centered size='small' src={logo} />
        <Header style={{textAlign:"center"}} size='tiny'>© 2019 rsvp ster, Inc</Header>
      </Container>
    </Segment>
    </div>
    )
}

export default Footer;