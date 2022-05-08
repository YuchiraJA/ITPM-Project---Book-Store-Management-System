
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import AdminNavBar from './AdminNavBar';


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
      alert("Delete successfully");
      this.retrieveOffers();
  });
}

/*Search Method*/
filterData(offers,searchkey){
  const result = offers.filter((offer) =>
    offer.otitle.toLowerCase().includes(searchkey) || 
    offer.cemail.toLowerCase().includes(searchkey) || 
    offer.feedmessage.toLowerCase().includes(searchkey)
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



   render(){
     return (
       <div><AdminNavBar/>
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
               <td>{offers.cemail}</td>
                            <div class="dropdown">
                                <img src={ "http://localhost:8000/" + offers.feedmessage } alt={offers.name} width="100" height="100"/>                                
                            </div>
                            {/* <td>{offers.feedmessage}</td> */}
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


