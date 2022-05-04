import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class EditOrder extends Component {

      constructor(props){
        super(props);

        this.state={
          BookTitle:"",
          Price:"",
          PersonName:"",
          NIC:"",
          TeliphoneNumber:"",
          Email:"",            
          PostalCode:"",
          Address:"",

          BookTitleError:"",
          PriceError:"",
          PersonNameError:"",
          NICError:"",
          TeliphoneNumberError:"",
          EmailError:"",            
          PostalCodeError:"",
          AddressError:""

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
        
        if (this.state.BookTitle && this.state.Price && this.state.PersonName && this.state.NIC && this.state.TeliphoneNumber && this.state.Email && this.state.PostalCode && this.state.Address){
        
        const id = this.props.match.params.id;

        const{BookTitle,Price,PersonName,NIC,TeliphoneNumber,Email,PostalCode,Address} = this.state;

          const data ={
            BookTitle:BookTitle,
            Price:Price,
            PersonName:PersonName,
            NIC:NIC,
            TeliphoneNumber:TeliphoneNumber,
            Email:Email,            
            PostalCode:PostalCode,
            Address:Address
          }  
          console.log(data)

          axios.put(`/order/update/${id}`,data).then((res)=>{
                    if(res.data.success){
                      swal({
                        icon: 'success',
                        title: "Order is Updated !",
                        type: "success",
                      }).then(function() {
                        window.location = "/customerDetail";
                      });

                        
                        
                        this.setState({
                          BookTitle:"",
                          Price:"",
                          PersonName:"",
                          NIC:"",
                          TeliphoneNumber:"",
                          Email:"",            
                          PostalCode:"",
                          Address:""
                        });
                        
                    }
                });
              }
            }

            validation = () => {
              let BookTitleError="";
              let PriceError="";
              let PersonNameError="";
              let NICError="";
              let TeliphoneNumberError="";
              let EmailError="";
              let PostalCodeError="";
              let AddressError="";
         
              if(!this.state.BookTitle){
                BookTitleError="(Book Title Required!)"
              }
              
              if(!this.state.Price){
                PriceError="(Price Required!)"
              }
        
              if(!this.state.PersonName.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
                PersonNameError="(Person Name must be characters!)"
              }
        
              if(!this.state.PersonName){
                PersonNameError="(Person Name Required!)"
              }
        
              if(!this.state.NIC.length > 12){
                NICError="(invalid NIC!)"
              }
        
              if(!this.state.NIC){
                NICError="(NIC Required!)"
              }
        
              if(!this.state.TeliphoneNumber.length > 10){
                TeliphoneNumberError="(invalid Teliphone Number!)"
              }
        
              if(!this.state.TeliphoneNumber){
                TeliphoneNumberError="(Teliphone Number Required!)"
              }
        
              if(!this.state.Email.includes('@')){
                EmailError="(invalid Email !)"
              }
        
              if(!this.state.Email){
                EmailError="(Email Required!)"
              }
        
              if(!this.state.PostalCode.length > 5){
                PostalCodeError="(invalid PostalCode!)"
              }
        
              if(!this.state.PostalCode){
                PostalCodeError="(PostalCode Required!)"
              }
        
              if(!this.state.Address){
                AddressError="(Address Required!)"
              }
        
        
              if ( BookTitleError | PriceError | PersonNameError | NICError | TeliphoneNumberError | EmailError | PostalCodeError | AddressError  ) {
        
                this.setState({BookTitleError , PriceError , PersonNameError , NICError , TeliphoneNumberError , EmailError , PostalCodeError , AddressError  });
        
                return false;
        
              } else {
        
                this.setState({BookTitleError , PriceError , PersonNameError , NICError , TeliphoneNumberError , EmailError , PostalCodeError , AddressError  });
        
              }
        
              return true;
        
            }  

            componentDidMount(){
              const id = this.props.match.params.id;
              
              axios.get(`/order/${id}`).then((res)=>{
                  if(res.data.success){
                      this.setState({
                        BookTitle:res.data.order.BookTitle,
                        Price:res.data.order.Price,
                        PersonName:res.data.order.PersonName,
                        NIC:res.data.order.NIC,
                        TeliphoneNumber:res.data.order.TeliphoneNumber,
                        Email:res.data.order.Email,
                        PostalCode:res.data.order.PostalCode,
                        Address:res.data.order.Address
                      });
                      console.log(this.state.order);
                      
                  }
              });
            }


  render() {
    return (
      <div className='container p-5 mb-2 bg-light text-dark ' >
        <form className='form-group'>
        <h1>Update Order</h1>
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}} >
              <label style={{marginBottom:'5px'}}>BookTitle</label>&nbsp;
              <span style={{color : "red"}}>{this.state.BookTitleError}</span>
              <input type="text"
              className="form-control"
              name="BookTitle"
              placeholder="Enter BookTitle"
              value={this.state.BookTitle}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Price</label>&nbsp;
              <span style={{color : "red"}}>{this.state.PriceError}</span>
              <input type="text"
              className="form-control"
              name="Price"
              placeholder="Enter Price"
              value={this.state.Price}
              onChange={this.handleInputChange}/>
            </div>
          </div>  
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>PersonName</label>&nbsp;
              <span style={{color : "red"}}>{this.state.PersonNameError}</span>
              <input type="text"
              className="form-control"
              name="PersonName"
              placeholder="Enter PersonName"
              value={this.state.PersonName}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>NIC</label>&nbsp;
              <span style={{color : "red"}}>{this.state.NICError}</span>
              <input type="text"
              className="form-control"
              name="NIC"
              placeholder="Enter NIC"
              value={this.state.NIC}
              onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>TeliphoneNumber</label>&nbsp;
              <span style={{color : "red"}}>{this.state.TeliphoneNumberError}</span>
              <input type="text"
              className="form-control"
              name="TeliphoneNumber"
              placeholder="Enter TeliphoneNumber"
              value={this.state.TeliphoneNumber}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Email</label>&nbsp;
              <span style={{color : "red"}}>{this.state.EmailError}</span>
              <input type="text"
              className="form-control"
              name="Email"
              placeholder="Enter Email"
              value={this.state.Email}
              onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>PostalCode</label>&nbsp;
              <span style={{color : "red"}}>{this.state.PostalCodeError}</span>
              <input type="text"
              className="form-control"
              name="PostalCode"
              placeholder="Enter PostalCode"
              value={this.state.PostalCode}
              onChange={this.handleInputChange}/>
            </div>
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
          </div>
          <div className='row'>
            <div className="col-lg-6">
            <button className="btn btn-success btn-lg btn-block" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              Update Order
            </button>
            </div>
          </div>
        </form>
        
      </div>
    )
  }
}
