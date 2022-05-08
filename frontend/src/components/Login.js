import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import NavBar from './NavBar';

export default class Login extends Component {
        constructor(props){
          super(props);

          this.state={
              cname:"",
              cemail:"",
  

              // cnameError:"",
              // cemailError:""

              
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

        if (this.state.cname && this.state.cemail){

        

        const{cname,cemail} = this.state;

        const data ={
            cname:cname,
            cemail:cemail
        }  
        console.log(data);

        axios.post("/feedback/save",data).then((res)=>{
                  if(res.data.success){
                      // alert("Feedback is Sent Successfully")
                      swal({

                        icon: 'success',
  
                        title: "Login Successfully !",
  
                        type: "success"
  
                      }).then(function() {
  
                        window.location = "/Home";
  
                      });
                      
                      this.setState({
                        cname:"",
                        cemail:""
                      });   
              }
        });
      }
      }


      
validation = () => {
  let cnameError="";
  let cemailError="";

  // if(!this.state.cname.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
  //   cnameError="(Password Required!)"
  // }

  // if(!this.state.cemail.includes('@')){
  //   cemailError="(Invalid Email, Correct Email Format Required !)"
  // }


  


  if ( cnameError | cemailError ) {
    this.setState({cnameError , cemailError  });
    return false;
  } else {
    this.setState({cnameError  , cemailError });
  }
  return true;
}  


cancelCourse = () => { 
  this.setState({
    cname: "",
    cemail: ""
  });
}





  render() {
    return (
      <div>
         <nav class="p-3 mb-2 bg-dark text-white  d-flex justify-content-around">
          <a class="navbar-brand" href="/">
            <img src="./bookstore.png" width="115px" height="40px"/>
          </a>
          <nav class="e d-flex justify-content-center">
            <a class="btn btn-primary btn-lg btn-block"  href="/">Customer Login</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-primary btn-lg btn-block" href="/adminlogin">Admin Login</a>&nbsp;&nbsp;&nbsp;&nbsp;

          </nav>
          
         
        </nav>

      
      <div className="container p-5 mb-2 bg-light text-dark"> 
       <h1 className="h2 mb-3 font-weight-normal">Customer Login</h1>
        <form className='need-validation' noValidate>
        <br></br>

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
              <label style={{marginBottom:'5px'}}>Password</label>
              <span style={{color : "red"}}>{this.state.cnameError}</span>
              <input type="text"
              className="form-control"
              name="cname"
              placeholder="Enter Password"
              value={this.state.cname}
              onChange={this.handleInputChange}/>
            </div>



   



            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            
              <i className="fa fa-upload"></i>
              &nbsp; Login
            </button>
            &nbsp;

            <input className="btn btn-danger" style={{marginTop:'15px'}} type="button" name="cancelCourse" value="Clear" onClick={this.cancelCourse} />

        </form>

        
        <br></br>
      </div>
      <br></br><center>
      Sample Login Email: user@gmail.com<br></br>
      Sample Login Password: user123
      </center>
      </div>
    )
  }
}

