
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import jspdf from 'jspdf'
import "jspdf-autotable"
import NavBar from './NavBar';


export default class ManageOffers extends Component {
constructor(props){
  super(props);

  this.state={
    offers:[]
  };

}

componentDidMount(){
  this.retrieveOffers();
}

retrieveOffers(){
  axios.get("/offers").then(res =>{
    if(res.data.success){
      this.setState({
        offers:res.data.existingOffers
      });
      console.log(this.state.offers)
    }
  });
}

onDelete = (id) =>{
  axios.delete(`/offer/delete/${id}`).then((res)=>{
      // alert("Delete Successfully");
      swal.fire({ title: 'Are you sure?',

      text: "You won't be able to revert this!",

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {

      if (result.isConfirmed) {

        swal.fire( 'Deleted!',

        'Offer has been deleted.',

        'success'

        )

      }

  })


      this.retrieveOffers();
  });
}

/*Search Method*/
filterData(offers,searchkey){
  const result = offers.filter((offer) =>
    offer.otitle.toLowerCase().includes(searchkey) || 
    offer.oDes.toLowerCase().includes(searchkey) || 
    offer.oImage.toLowerCase().includes(searchkey)
  )

  this.setState({offers:result})
}


handleSearchArea = (e) =>{
  const searchkey = e.currentTarget.value;
  axios.get("/offers").then(res=>{
      if(res.data.success){
          this.filterData(res.data.existingOffers,searchkey)
      }
  });
}

generateReport = (tickets) => {
  const doc = new jspdf();

  const tableColumn = ["Offer Title", "Descrption", "Image"];

  const tableRows = [];

  tickets.map(ticket => {

    const ticketData = [

        ticket.otitle,

        ticket.oDes,

        ticket.oImage    

    ];
    tableRows.push(ticketData);
  })

 
    doc.text("All Offers Report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`offers_report_.pdf`);



}



   render(){
     return (

       <div>   

         <NavBar></NavBar>     
       <div className="container">
      
      <center><h1>Manage Offers</h1>
      
                        {/*Search*/}
                        <div className="col-lg-3 mt-2 mb-2" >
                    <input
                    className="form-control"
                    type="search"
                    placeholder="search offer title"
                    name="searchQuery"
                    onChange={this.handleSearchArea}/>
        </div>
        </center>
         <br></br>
      <table>
           <tr>
          

        <td>
        <button className="btn btn-success"><a href="/addOffer" style={{textDecoration:'none',color:'white'}}>Create New Offer</a></button>
        <button onClick={()=>this.generateReport(this.state.offers)} className="btn btn-success"><a style={{textDecoration:'none',color:'white'}}>Generate Report</a></button>
        </td>
        </tr>
        </table>


         <table className="table">
           <thead>
             <tr>
               <th scope="col"></th>
               <th scope="col">Offer Title</th>
               <th scope="col">Descrption</th>
               <th scope="col">Image</th>
             </tr>
           </thead>
           <tbody>
           {this.state.offers.map((offers,index) =>(
           <tr key={index}>
             <th scope="row">{index+1}</th>
               <td>
                 <a href={`/offer/${offers._id}`} style={{textDecoration:'none'}}>
                 {offers.otitle}
                 </a>
               </td>
               <td>{offers.oDes}</td>
                            <div class="dropdown">
                                <img src={ "http://localhost:8000/" + offers.oImage} alt={offers.name} width="100" height="100"/>                                
                            </div>
                            {/* <td>{offers.oImage}</td> */}
               <td width="18%">
                 <a className="btn btn-warning" href={`/edit/${offers._id}`}>
                   <i className="fas fa-edit"></i>&nbsp;Edit
                 </a>
                 &nbsp;
                 <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(offers._id)}>
                   <i className="fas fa-trash-alt"></i>&nbsp;Delete
                 </a>
               </td>
           </tr>
         ))}
        </tbody>
         </table>
       </div>
      </div>
     )
   }
}


