import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

export default class AdminHome extends Component {
  constructor(props){
    super(props);

    this.state={
      inventrys:[]
    };
  }

componentDidMount(){
  this.retrieveInventrys();
}  

  retrieveInventrys(){
    axios.get("/inventrys").then(res=>{
      if(res.data.success){
        this.setState({
          inventrys:res.data.existingInventrys
        });

        console.log(this.state.inventrys);
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/inventry/delete/${id}`).then((res)=>{
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
            'Your file has been deleted.', 
            'success' 
            ) 
          } 
      })
        this.retrieveInventrys();
    });
  }


/*Search Method*/
  filterData(inventrys,searchkey){
    const result = inventrys.filter((inventry) =>
      inventry.title.toLowerCase().includes(searchkey) || 
      inventry.language.toLowerCase().includes(searchkey) || 
      inventry.isbn.toLowerCase().includes(searchkey)
    )

    this.setState({inventrys:result})
  }


  handleSearchArea = (e) =>{
    const searchkey = e.currentTarget.value;
    axios.get("/inventrys").then(res=>{
        if(res.data.success){
            this.filterData(res.data.existingInventrys,searchkey)
        }
    });
  }



  render() {
    return (
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <center><h1 className="h3 mb-3 font-weight-normal">ALL BOOKS</h1></center>

        
          {/*Search*/}
          
          <div class="d-flex justify-content-around">          
                <button className="btn btn-success">        
                    <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;
                    <a href="/CreateInventry" style={{textDecoration:'none', color:'white'}}>Add Book</a>                
                </button>
                

                
                  <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                </div>
                            
          </div>
          

          <br/>
            <table className="table container bg-light" >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Language</th>
                  <th scope="col">Author</th>
                  <th scope="col">Publisher</th>
                  <th scope="col">ISBN Number</th>
                  <th scope="col">Details</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {this.state.inventrys.map((inventrys,index)=>(
                <tr>
                  <th scope="row">{index+1}</th> 

                  <td>
                    <a href={`/InventryDetails/${inventrys._id}`}>
                      {inventrys.title}
                    </a>
                  </td>

                  <td>{inventrys.price}</td>
                  <td>{inventrys.language}</td>
                  <td>{inventrys.author}</td>
                  <td>{inventrys.publisher}</td>
                  <td>{inventrys.isbn}</td>
                  <td>{inventrys.details}</td>
                  <div class="dropdown">
                                <img src={ "http://localhost:8000/" + inventrys.image } alt={inventrys.name} width="40" height="50"/>                                
                            </div>
                  <td>
                      <a className="btn btn-warning" href={`/EditInventry/${inventrys._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>

                      &nbsp;

                      <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(inventrys._id)}>
                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </a>
                  </td>
                </tr>
                
              ))}
            </tbody>
            </table>
            <br/> 
            <center><a className="btn btn-dark" href="#" >
            GENERATE REPORT
                      </a>  </center>                    
            </div>      
    )
  }
}

