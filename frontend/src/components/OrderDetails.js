import React, { Component } from 'react'
import axios from 'axios';

export default class OrderDetails extends Component {
  constructor(props){
    super(props);

    this.state={
        order:{}
    };
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/order/${id}`).then((res)=>{
      if(res.data.success){
          this.setState({
            order:res.data.order
          });
          console.log(this.state.order);
      }
  });
}


  render() {
    const {BookTitle,Price,PersonName,NIC,TeliphoneNumber,Email,PostalCode,Address}=this.state.order;

    return (
      <div>
        <h4>{BookTitle}</h4>
        <hr/>

        <dl>
          <dt>price</dt><dd>{Price}</dd> 
                    
          <dt>PersonName</dt><dd>{PersonName}</dd>
          <dt>NIC</dt><dd>{NIC}</dd>
          <dt>TeliphoneNumber</dt><dd>{TeliphoneNumber}</dd>
          <dt>Email</dt><dd>{Email}</dd>
          <dt>PostalCode</dt><dd>{PostalCode}</dd>
          <dt>Address</dt><dd>{Address}</dd>
        </dl>
      </div>
    )
  }
}
