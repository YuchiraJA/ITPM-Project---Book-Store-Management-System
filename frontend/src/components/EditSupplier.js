import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class EditSuppliers extends Component {

      constructor(props){
        super(props);

        this.state={
            SupplierID:"",
            Fullname:"",
            Address:"",
            ContactNo:"",
            ItemsPurchased:"",

            SupplierIDError:"",
            FullnameError:"",
            AddressError:"",
            ContactNoError:"",
            ItemsPurchasedError:""

        };
      }


      handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })

      }


      onSubmit = (e) =>{   
        
        e.preventDefault();
        this.validation();
        
        if (this.state.SupplierID && this.state.Fullname && this.state.Address && this.state.ContactNo && this.state.ItemsPurchased ){
        
        const id = this.props.match.params.id;

        const{SupplierID,Fullname,Address,ContactNo,ItemsPurchased} = this.state;

          const data ={
            SupplierID:SupplierID,
            Fullname:Fullname,
            Address:Address,
            ContactNo:ContactNo,
            ItemsPurchased:ItemsPurchased
          }  
          console.log(data)

          axios.put(`/supplier/update/${id}`,data).then((res)=>{
                    if(res.data.success){
                        swal({
                          icon: 'success',
                          title: "Supplier Updated Successfully!",
                          type: "success"
                        }).then(function() {
                          window.location = "/AdminSupplier";
                        });
                        
                        this.setState({
                            SupplierID:"",
                            Fullname:"",
                            Address:"",
                            ContactNo:"",
                            ItemsPurchased:""
                        });
                        
                    }
                });
              }
            }

            validation = () => {
                let SupplierIDError="";
                let FullnameError="";
                let AddressError="";
                let ContactNoError="";
                let ItemsPurchasedError="";
         
                if(!this.state.SupplierID){
                    SupplierIDError="(SupplierID Required!)"
                  }
            
                  if(!this.state.Fullname.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
                    FullnameError="(Name must be characters!)"
                  }
                  
                  if(!this.state.Fullname){
                    FullnameError="(Fullname Required!)"
                  }
            
                  if(!this.state.Address){
                    AddressError="(Address Required!)"
                  }
            
                  if(!this.state.ContactNo.length > 10){
                    ContactNoError="(invalid ContactNo!)"
                  }
            
                  if(!this.state.ContactNo){
                    ContactNoError="(ContactNo Required!)"
                  }
            
                  if(!this.state.ItemsPurchased){
                    ItemsPurchasedError="(ItemsPurchased Required!)"
                  }
        
        
              if ( SupplierIDError | FullnameError | AddressError | ContactNoError | ItemsPurchasedError   ) {
        
                this.setState({SupplierIDError , FullnameError , AddressError , ContactNoError , ItemsPurchasedError});
        
                return false;
        
              } else {
        
                this.setState({SupplierIDError , FullnameError , AddressError , ContactNoError , ItemsPurchasedError});
        
              }
        
              return true;
        
            }  

            componentDidMount(){
              const id = this.props.match.params.id;
              
              axios.get(`/supplier/${id}`).then((res)=>{
                  if(res.data.success){
                      this.setState({
                        SupplierID:res.data.supplier.SupplierID,
                        Fullname:res.data.supplier.Fullname,
                        Address:res.data.supplier.Address,
                        ContactNo:res.data.supplier.ContactNo,
                        ItemsPurchased:res.data.supplier.ItemsPurchased
                      });
                      console.log(this.state.supplier);
                      
                  }
              });
            }


  render() {
    return (
      <div className='container p-5 mb-2 bg-light text-dark ' >
        <form className='form-group'>
        <h1>Update SupplierID</h1>
        <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}} >
              <label style={{marginBottom:'5px'}}>SupplierID</label>&nbsp;
              <span style={{color : "red"}}>{this.state.SupplierIDError}</span>
              <input type="text"
              className="form-control"
              name="SupplierID"
              placeholder="Enter SupplierID"
              value={this.state.SupplierID}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Fullname</label>&nbsp;
              <span style={{color : "red"}}>{this.state.FullnameError}</span>
              <input type="text"
              className="form-control"
              name="Fullname"
              placeholder="Enter Fullname"
              value={this.state.Fullname}
              onChange={this.handleInputChange}/>
            </div>
          </div>  
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Address</label>&nbsp;
              <span style={{color : "red"}}>{this.state.AddressError}</span>
              <input type="text"
              className="form-control"
              name="Address"
              placeholder="Enter Address"
              value={this.state.Address}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>ContactNo</label>&nbsp;
              <span style={{color : "red"}}>{this.state.ContactNoError}</span>
              <input type="number"
              className="form-control"
              name="ContactNo"
              placeholder="Enter ContactNo"
              value={this.state.ContactNo}
              onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>ItemsPurchased</label>&nbsp;
              <span style={{color : "red"}}>{this.state.ItemsPurchasedError}</span>
              <input type="text"
              className="form-control"
              name="ItemsPurchased"
              placeholder="Enter ItemsPurchased"
              value={this.state.ItemsPurchased}
              onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-6">
            <button className="btn btn-success btn-lg btn-block" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              Update Supplier
            </button>
            </div>
          </div>
        </form>
        
      </div>
    )
  }
}
