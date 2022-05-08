import React, { Component } from 'react'
import axios from 'axios';
import NavBar from './NavBar';

export default class InventryDetails extends Component {
  constructor(props){
    super(props);

    this.state={
        inventry:{}
    };
}


componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/inventry/${id}`).then((res)=>{
      if(res.data.success){
          this.setState({
            inventry:res.data.inventry
          });
          console.log(this.state.inventry);
      }
  });
}


  render() {
    const {title,price,language,author,publisher,isbn,details,image}=this.state.inventry;

    return (
<div>
<NavBar/>
      <div className="container">
       

<center>
      <table className="table-medium">
        <th>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <dt></dt><dd><img className="inventry-medium" id="Details-Image" src={ "http://localhost:8000/" + image } alt="gjgjgj" /></dd>
        </th>
        <th>
        <dl>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h4>{title}</h4>
        <hr/>
          <dd><h4>Price : රු {price}</h4></dd>
            <button className="btn btn-success">
              <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
              <a href="/CreateOrder" style={{textDecoration:'none', color:'white'}}>ORDER</a>                
            </button>
            <hr/>         
            <dd>Language : {language}</dd>
          <dd>Author : {author}</dd>
          <dd>Publisher : {publisher}</dd>
          <dd>Isbn : {isbn}</dd>
          <hr/>
          <dd>Details : {details}</dd>
          <hr/>
                          
        </dl>
        </th>        
      </table>

      </center>     
        
      </div>
      </div>
    )
  }
}
