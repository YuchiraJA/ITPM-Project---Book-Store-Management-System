import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export default class AdminOrder extends Component {
  constructor(props){
    super(props);

    this.state={
      orders:[]
    };
  }

componentDidMount(){
  this.retrieveOrders();
}  

retrieveOrders(){
    axios.get("/orders").then(res=>{
      if(res.data.success){
        this.setState({
          orders:res.data.existingOrders
        });

        console.log(this.state.orders);
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/order/delete/${id}`).then((res)=>{
      swal({
        icon: 'success',
        title: "Order is Deleted !",
        type: "success",
      }).then(function() {
        window.location = "/CreateOrder";
      });
        this.retrieveOrders();
    });
  }

  showAlert2 = () => {
     
    swal({
      icon: 'success',
      title: "Order is confirmed !",
      type: "success",
      text: "Back to Home"
  }).then(function() {
      window.location = "/";
  });
}


/*Search Method*/
  filterData(orders,searchkey){
    const result = orders.filter((order) =>
      order.BookTitle.toLowerCase().includes(searchkey) || 
      order.PostalCode.toLowerCase().includes(searchkey)
    )

    this.setState({orders:result})
  }


  handleSearchArea = (e) =>{
    const searchkey = e.currentTarget.value;
    axios.get("/orders").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingOrders,searchkey)
        }
    });
  }

  onSubmit = (e) =>{   

    e.preventDefault();
  
    alert("Order Added Successfully");

    }


  render() {
    return (
      <div className='container'>
        <div >
            &nbsp;
            <center><h3>ORDER</h3></center>
            
        </div>

        <br></br>
        
        <table className="table container bg-light">
          <thead>
            <tr>
              
              <th scope="col">BookTitle</th>
              <th scope="col">Price</th>
              <th scope="col">PersonName</th>
              <th scope="col">NIC</th>
              <th scope="col">TeliphoneNumber</th>
              <th scope="col">Email</th>
              <th scope="col">PostalCode</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {this.state.orders.map((orders,index)=>(
            <tr> 
                <td>{orders.BookTitle}</td>
                <td>{orders.Price}</td>
                <td>{orders.PersonName}</td>
                <td>{orders.NIC}</td>
                <td>{orders.TeliphoneNumber}</td>
                <d>{orders.Email}</d>
                <td>{orders.PostalCode}</td>
                <td>{orders.Address}</td>
                <td>
                  <a className="btn btn-success " href={`/EditOrder/${orders._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Update
                  </a>
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(orders._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
            </tr>
          ))}
          </tbody>
        </table>  
        <br></br>
        <center>
        <button onClick={this.showAlert2} className="btn btn-success" >        
                <i class="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;
                Conform Order                
        </button> 
        </center>    
        <br></br>                
      </div>      
    )
  }
}

