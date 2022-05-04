import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

export default class AdminSupplier extends Component {
  constructor(props){
    super(props);

    this.state={
      suppliers:[]
    };

  }

componentDidMount(){
  this.retrieveSuppliers();
}  

retrieveSuppliers(){
    axios.get("/suppliers").then(res=>{
      if(res.data.success){
        this.setState({
            suppliers:res.data.existingSuppliers
        });

        console.log(this.state.suppliers);
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/supplier/delete/${id}`).then((res)=>{
      
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
        })

        this.retrieveSuppliers();
    });
  }


/*Search Method*/
  filterData(suppliers,searchkey){
    const result = suppliers.filter((supplier) =>
        supplier.SupplierID.toLowerCase().includes(searchkey) || 
        supplier.ContactNo.toLowerCase().includes(searchkey)
    )

    this.setState({suppliers:result})
  }


  handleSearchArea = (e) =>{
    const searchkey = e.currentTarget.value;
    axios.get("/suppliers").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingSuppliers,searchkey)
        }
    });
  }



  render() {
    return (
      <div>
        <div class="d-flex justify-content-between">
            &nbsp;
            <center><h3>ALL Suppliers</h3></center>
            <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
            </div>
            <button className="btn btn-success">        
                <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                <a href="/CreateSupplier" style={{textDecoration:'none', color:'white'}}>Add Supplier</a>                
            </button>
            &nbsp;
        </div>

        <br></br>
        
        <table className="table container bg-light">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">SupplierID</th>
              <th scope="col">Fullname</th>
              <th scope="col">Address</th>
              <th scope="col">ContactNo</th>
              <th scope="col">ItemsPurchased</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {this.state.suppliers.map((suppliers,index)=>(
            <tr>
              <th scope="row">{index+1}</th> 
                <td>
                  <a href={`/SupplierDetails/${suppliers._id}`}>
                      {suppliers.SupplierID}
                  </a>
                </td>
                <td>{suppliers.Fullname}</td>
                <td>{suppliers.Address}</td>
                <td>{suppliers.ContactNo}</td>
                <td>{suppliers.ItemsPurchased}</td>
                <td>
                  <a className="btn btn-success " href={`/EditSupplier/${suppliers._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Update
                  </a>
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(suppliers._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
            </tr>
          ))}
          </tbody>
        </table>                       
      </div>      
    )
  }
}

