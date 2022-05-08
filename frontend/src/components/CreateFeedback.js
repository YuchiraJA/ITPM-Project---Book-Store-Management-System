import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import NavBar from './NavBar';

export default class CreateFeedback extends Component {
        constructor(props){
          super(props);

          this.state={
              cname:"",
              cemail:"",
              feedtype:"",
              feedmessage:"",

              cnameError:"",
              cemailError:"",
              feedtypeError:"",
              feedmessageError:""
              
          };

          this.handleChange = this.handleChange.bind(this);
      }


      handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })

      }

      handleChange(event) {
        this.setState({value: event.target.feedtype});
      }


      onSubmit = (e) =>{   

        e.preventDefault();
        this.validation();

        if (this.state.cname && this.state.cemail && this.state.feedtype && this.state.feedmessage){

        

        const{cname,cemail,feedtype,feedmessage} = this.state;

        const data ={
            cname:cname,
            cemail:cemail,
            feedtype:feedtype,
            feedmessage:feedmessage
        }  
        console.log(data);

        axios.post("/feedback/save",data).then((res)=>{
                  if(res.data.success){
                      // alert("Feedback is Sent Successfully")
                      swal({

                        icon: 'success',
  
                        title: "Feedback is Sent Successfully !",
  
                        type: "success"
  
                      }).then(function() {
  
                        window.location = "/feedbackform";
  
                      });
                      
                      this.setState({
                        cname:"",
                        cemail:"",
                        Feedtype:"",
                        feedmessage:""
                      });   
              }
        });
      }
      }


      
validation = () => {
  let cnameError="";
  let cemailError="";
  let feedtypeError="";
  let feedmessageError="";

  if(!this.state.cname.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
    cnameError="(Customer Name Required! & Customer Name must be characters!)"
  }

  if(!this.state.cemail.includes('@')){
    cemailError="(Invalid Email, Correct Email Format Required !)"
  }

  if(!this.state.feedtype){
    feedtypeError="(Feedback Type Required!)"
  }

  if(!this.state.feedmessage){
    feedmessageError="(Feedback message Required!)"
  }
  


  if ( cnameError | cemailError | feedtypeError | feedmessageError ) {
    this.setState({cnameError , cemailError , feedtypeError , feedmessageError });
    return false;
  } else {
    this.setState({cnameError  , cemailError , feedtypeError , feedmessageError });
  }
  return true;
}  


cancelCourse = () => { 
  this.setState({
    cname: "",
    cemail: "",
    feedtype: "",
    feedmessage: ""
  });
}



  render() {
    return (
      <div><NavBar/>
      <div className="container p-5 mb-2 bg-light text-dark"> 
       <h1 className="h2 mb-3 font-weight-normal">FeedBack Form</h1>
        <form className='need-validation' noValidate>
        <br></br>
            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Customer Name</label>
              <span style={{color : "red"}}>{this.state.cnameError}</span>
              <input type="text"
              className="form-control"
              name="cname"
              placeholder="Enter Customer Name"
              value={this.state.cname}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Customer Email</label>
              <span style={{color : "red"}}>{this.state.cemailError}</span>
              <input type="text"
              className="form-control"
              name="cemail"
              placeholder="Enter Customer Email (Ex: yja@gmail.com)"
              value={this.state.cemail}
              onChange={this.handleInputChange}/>
            </div>

             <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Feedback Type</label>
              <span style={{color : "red"}}>{this.state.feedtypeError}</span>
              {/* <input type="text"
              className="form-control"
              name="feedtype"
              placeholder="Enter Feedback Type (Ex:Positive/Negative/Neutral)"
              value={this.state.feedtype}
              onChange={this.handleInputChange}/> */}
            
      
         <select name="feedtype" value={this.state.feedtype} onChange={this.handleInputChange} className="form-select">
            <option value="">Select the feedback type</option>
            <option value="Positive">Positive	&#128516;</option>
            <option value="Negative">Negative &#128543;</option>
            <option value="Neutral">Neutral	&#128528;</option>
          </select>
          </div>  

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Feedback Message</label>
              <span style={{color : "red"}}>{this.state.feedmessageError}</span>
              <input type="text"
              className="form-control"
              name="feedmessage"
              placeholder="Enter Feedback Message"
              value={this.state.feedmessage}
              onChange={this.handleInputChange}/>
            </div>


            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            
              <i className="fa fa-upload"></i>
              &nbsp; Send Feedback
            </button>
            &nbsp;

            <input className="btn btn-danger" style={{marginTop:'15px'}} type="button" name="cancelCourse" value="Clear the Form" onClick={this.cancelCourse} />

        </form>
        <br></br>
      </div>
      </div>
    )
  }
}

