import React, { Component } from 'react'
import axios from 'axios';

export default class EditFeedback extends Component {

      constructor(props){
        super(props);

        this.state={
            cname:"",
            cemail:"",
            feedtype:"",
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

        const{cname,cemail,feedtype,feedmessage} = this.state;

        const data ={
            cname:cname,
            cemail:cemail,
            feedtype:feedtype,
            feedmessage:feedmessage
        }  
        console.log(data);
 

          axios.put(`/feedback/update/${id}`,data).then((res)=>{
                    if(res.data.success){
                        alert("Feedback Updated Successfully")
                        
                        this.setState({
                        cname:"",
                        cemail:"",
                        feedtype:"",
                        feedmessage:""
                        });
                        
                    }
                });
            }


            componentDidMount(){
              const id = this.props.match.params.id;
              
              axios.get(`/feedback/${id}`).then((res)=>{
                  if(res.data.success){
                      this.setState({
                        cname:res.data.feedback.cname,
                        cemail:res.data.feedback.cemail,
                        feedtype:res.data.feedback.feedtype,
                        feedmessage:res.data.feedback.feedmessage
                      });
                      console.log(this.state.feedback);
                      
                  }
              });
            }


  render() {
    return (
        
        <div className="col-md-8 mt-4 mx-auto"> 
        <h1 className="h3 mb-3 font-weight-normal">Edit FeedBack Form</h1>
         <form className='need-validation' noValidate>

             <div className="form-group" style={{marginBottom:'15px'}}>
               <label style={{marginBottom:'5px'}}>Customer Name</label>
               <input type="text"
               className="form-control"
               name="cname"
               placeholder="Enter Customer Name"
               value={this.state.cname}
               onChange={this.handleInputChange}/>
             </div>
 
             <div className="form-group" style={{marginBottom:'15px'}}>
               <label style={{marginBottom:'5px'}}>Customer Email</label>
               <input type="text"
               className="form-control"
               name="cemail"
               placeholder="Enter Customer Email"
               value={this.state.cemail}
               onChange={this.handleInputChange}/>
             </div>
 
             <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Feedback Type</label>
              
              <input type="text"
              className="form-control"
              name="feedtype"
              placeholder="select Feedback Type"
              value={this.state.feedtype}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Feedback Message</label>
              <input type="text"
              className="form-control"
              name="feedmessage"
              placeholder="Enter Feedback Message"
              value={this.state.feedmessage}
              onChange={this.handleInputChange}/>
            </div>
 
 
             <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
               <i className="fa fa-upload"></i>
               &nbsp; Update Feedback Details
             </button>
 
         </form>
       </div>
    )
  }
}
