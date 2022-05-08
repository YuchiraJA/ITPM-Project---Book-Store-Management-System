import React, { Component } from 'react';
import axios from 'axios';
//import swal from 'sweetalert2';
import AdminNavBar from './AdminNavBar';

import jspdf from 'jspdf'


import "jspdf-autotable"

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

          
   if(window.confirm('Are you sure?'))
   {
     fetch('http://localhost:3000/AdminSupplier#' +id,{
       method:'DELETE',
       header:{'Accept':'application/json',
      'Content-Type':'application/json'
    }
     })
     
   }
   else(window.cancel('cancel'))
   {
     fetch('http://localhost:3000/AdminSupplier'+id,{
       method:'CANCEL',
       header:{'Denied':'application/json',
     'Content-Type':'application/json'}
     })
   }

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


  //report
generateReport = (tickets) => {
  const doc = new jspdf();

  const tableColumn = ["Supplier ID", "Full name", "Address", "Contact No","Items Purchased"];

  const tableRows = [];

  tickets.map(ticket => {

    const ticketData = [

        ticket.SupplierID,

        ticket.Fullname,

        ticket.Address,    

        ticket.ContactNo,  

        ticket.ItemsPurchased 

    ];
    tableRows.push(ticketData);
  })

 
    doc.text("All Suppliers Report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`allsuppliers_report_.pdf`);



}

//

  render() {
    return (
      <div>
        <AdminNavBar/>
        <div>
        <div class="d-flex justify-content-between">
            &nbsp;
            <center><h3>ALL Suppliers</h3></center>
            
            <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search by supplier id"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                        
            </div>
            <button className="btn btn-secondary"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
            <a href="/CreateSupplier" style={{textDecoration:'none', color:'white'}}>Add Supplier</a></button>
           
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
                  
                      {suppliers.SupplierID}
                  
                </td>
                <td>{suppliers.Fullname}</td>
                <td>{suppliers.Address}</td>
                <td>{suppliers.ContactNo}</td>
                <td>{suppliers.ItemsPurchased}</td>
                <td>
                  <a className="btn btn-success " href={`/EditSupplier/${suppliers._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Update</a>
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(suppliers._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
            </tr>
          ))}

          
          </tbody>
        </table>&nbsp;
        <div class="d-flex justify-content-between">
        &nbsp;  
            <button onClick={()=>this.generateReport(this.state.suppliers)} className="btn btn-secondary">
            <i class="fa fa-print" aria-hidden="true"></i>
          <a style={{textDecoration:'none',color:'white'}}>Generate Report</a></button>&nbsp;
            </div>    
              
            
      </div>   
      </div>   
    )
  }
}

