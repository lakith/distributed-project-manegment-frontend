import React,{Component} from 'react'
import axios from '../../axios-base'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'; 
class Test extends Component{

    state = {
        description : null
    }

    componentDidMount(){
        axios.get("event-front-page/get-details?event-id=4")
        .then((response)=>{
                let description = response.data.discription
                this.setState({description:description})
            })
        .catch((err)=>{
            console.log(err.response);
        })
    }

    render(){

        return(
            <div>
                {this.state.description?ReactHtmlParser(this.state.description):null}
            </div>
         
        )
    }

}



export default Test;