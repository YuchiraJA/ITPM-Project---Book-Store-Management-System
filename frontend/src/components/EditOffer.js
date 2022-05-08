import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class EditOffer extends Component {

      constructor(props){
        super(props);

        this.state={
            otitle:"",
            cemail:"",
            feedmessage:""
              
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

        const id = this.props.match.params.id;

        const{otitle,cemail,feedmessage} = this.state;

        const data ={
            otitle:otitle,
            cemail:cemail,
            feedmessage:feedmessage
        }  
        console.log(data);
 

          axios.put(`/offer/update/${id}`,data).then((res)=>{
                    if(res.data.success){
                        // alert("Feedback Updated Successfully")
                        swal({

                          icon: 'success',
    
                          title: "Feedback Updated Successfully !",
    
                          type: "success"
    
                        }).then(function() {
    
                          window.location = "/manageoffers";
    
                        });
                        
                        this.setState({
                        otitile:"",
                        cemail:"",
                        feedmessage:""
                        });
                        
                    }
                });
            }


            componentDidMount(){
              const id = this.props.match.params.id;
              
              axios.get(`/offer/${id}`).then((res)=>{
                  if(res.data.success){
                      this.setState({
                        otitle:res.data.offer.otitle,
                        cemail:res.data.offer.cemail,
                        feedmessage:res.data.offer.feedmessage
                      });
                      console.log(this.state.offer);
                      
                  }
              });
            }


            
onChangeImage=event=>{
  this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
  }, () => {
      const data = new FormData()
      data.append('file', this.state.selectedFile)
      axios.post("/offer/upload", data, {
      }).then(res => {
          this.setState({feedmessage:res.data.filename})
      })
  })
}


  render() {
    return (
        
        <div className="col-md-8 mt-4 mx-auto"> 
        <h1 className="h3 mb-3 font-weight-normal">Edit Offer Details</h1>
         <form className='need-validation' noValidate>

             <div className="form-group" style={{marginBottom:'15px'}}>
               <label style={{marginBottom:'5px'}}>Offer Title</label>
               <input type="text"
               className="form-control"
               name="cname"
               placeholder="Enter New Offer Tite"
               value={this.state.otitle}
               onChange={this.handleInputChange}/>
             </div>
 
             <div className="form-group" style={{marginBottom:'15px'}}>
               <label style={{marginBottom:'5px'}}>Offer Descrption</label>
               <input type="text"
               className="form-control"
               name="cemail"
               placeholder="Enter New Offer Descrpition"
               value={this.state.cemail}
               onChange={this.handleInputChange}/>
             </div>
 
  


             <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Offer Image</label>
              <input type="file"
              className="form-control"
              name="feedmessage"
              placeholder="Select the Image"
              onChange={this.onChangeImage}/>
            </div>
 
 
             <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
               <i className="fa fa-upload"></i>
               &nbsp; Update Offer Details
             </button>
 
         </form>
       </div>
    )
  }
}
