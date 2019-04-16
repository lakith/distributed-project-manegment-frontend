import React, { Component } from 'react';
import Party from '../../assessts/Fotolia_FAS.jpg'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

class HomeBase extends Component {

    render() {
        return(
            <div className='login-form' style={{backgroundImage:"url("+Party+")",paddingTop:"1%"}} >
                       <style>
          {`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Icon name="puzzle" size="massive" /> Register in to OPUS
            </Header>
            <Segment.Group>
                <Segment>Top</Segment>
                <Segment>Middle</Segment>
                <Segment>Middle</Segment>
                <Segment>Middle</Segment>
                <Segment>Bottom</Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
            </div>
        )
    }
    

}

export default HomeBase;