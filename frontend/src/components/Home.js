import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {
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
            console.log(this.state.inventrys)   
        }
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
              <center>
                <div className="col-lg-3 mt-2 mb-2" >
                        <input
                        className="form-control"
                        type="search"
                        placeholder="search"
                        name="searchQuery"
                        onChange={this.handleSearchArea}/>
                </div>
              </center>   



        
        <div className="row">
                            <main>
                                <div className="row center" >                                    
                                      {this.state.inventrys.map((inventrys,index)=>(
                                        <div className="card" >
                                          <a href={`/InventryDetails/${inventrys._id}`}>                                          
                                          <center><img className="card-img-top" src={ "http://localhost:8000/" + inventrys.image } alt="Card image cap"/></center>
                                          </a>

                                          <div className="card-body">
                                              <a href={`/InventryDetails/${inventrys._id}`}>
                                                  <h6 className="card-title">{inventrys.title}</h6>
                                              </a>

                                              <h6 className="card-price">රු {inventrys.price}</h6>

                                              <a href={`/InventryDetails/${inventrys._id}`}>                                                  
                                                  <center><a href={`/InventryDetails/${inventrys._id}`} class="btn btn-primary">Buy Now</a></center>
                                              </a>
                                          </div>

                                        </div>                                            
                                    ))
                                }                           
                            </div>
                        </main>               
                    </div>                    
      </div>
    )
  }
}
