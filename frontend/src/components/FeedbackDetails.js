import React, { Component } from 'react'
import axios from 'axios';

export default class FeedbackDetails extends Component {
  constructor(props){
    super(props);

    this.state={
        feedback:{}
    };
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/feedback/${id}`).then((res)=>{
      if(res.data.success){
          this.setState({
            feedback:res.data.feedback
          });
          console.log(this.state.feedback);
      }
  });
}


  render() {
    const {cname,cemail,feedtype,feedmessage}=this.state.feedback;

    return (
      <div>
          <br></br>
        <h4>Feedback Details</h4>
        <hr/>

        <dl className="row">
          <dt className="col-sm-3">Customer's Name</dt>
          <dd className="col-sm-9">{cname}</dd> 

          <dt className="col-sm-3">Customer's Email</dt>
          <dd className="col-sm-9">{cemail}</dd>

          <dt className="col-sm-3">FeedBack Type</dt>
          <dd className="col-sm-9">{feedtype}</dd> 

          <dt className="col-sm-3">Feedback Message</dt>
          <dd className="col-sm-9">{feedmessage}</dd>         
        </dl>
      </div>
    )
  }
}
