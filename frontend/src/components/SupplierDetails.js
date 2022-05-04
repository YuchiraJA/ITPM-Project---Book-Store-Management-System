import React, { Component } from 'react'
import axios from 'axios';

export default class SupplierDetails extends Component {
  constructor(props){
    super(props);

    this.state={
        supplier:{}
    };
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/supplier/${id}`).then((res)=>{
      if(res.data.success){
          this.setState({
            supplier:res.data.supplier
          });
          console.log(this.state.supplier);
      }
  });
}


  render() {
    const {SupplierID,Fullname,Address,ContactNo,ItemsPurchased}=this.state.supplier;

    return (
      <div>
        <h4>{SupplierID}</h4>
        <hr/>
        <dl>
          <dt>Fullname</dt><dd>{Fullname}</dd> 
          <dt>Address</dt><dd>{Address}</dd>
          <dt>ContactNo</dt><dd>{ContactNo}</dd>
          <dt>ItemsPurchased</dt><dd>{ItemsPurchased}</dd>
        </dl>
      </div>
    )
  }
}
