import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

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
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to delete this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      });
        this.retrieveOrders();
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



  render() {
    return (
      <div>
        <div class="d-flex justify-content-between">
            &nbsp;
            <center><h3>ALL ORDER</h3></center>
            <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
            </div>
            
            &nbsp;
        </div>

        <br></br>
        
        <table className="table container bg-light">
          <thead>
            <tr>
              <th scope="col">#</th>
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
              <th scope="row">{index+1}</th> 
                <td>
                  <a href={`/OrderDetails/${orders._id}`}>
                      {orders.BookTitle}
                  </a>
                </td>
                <td>{orders.Price}</td>
                <td>{orders.PersonName}</td>
                <td>{orders.NIC}</td>
                <td>{orders.TeliphoneNumber}</td>
                <d>{orders.Email}</d>
                <td>{orders.PostalCode}</td>
                <td>{orders.Address}</td>
                <td>
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
                Generate Report                
        </button>  
        </center>   
        <br></br>                 
      </div>      
    )
  }
}

