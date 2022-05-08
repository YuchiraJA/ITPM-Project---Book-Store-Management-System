import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import AdminNavBar from './AdminNavBar';

export default class CreateOffer extends Component {
        constructor(props){
          super(props);

          this.state={
              otitle:"",
              cemail:"",
              feedmessage:"",

              otitleError:"",
              cemailError:"",
              feedmessageError:""
              
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

        if (this.state.otitle && this.state.cemail && this.state.feedmessage){

        const{otitle,cemail,feedmessage} = this.state;

        const data ={
            otitle:otitle,
            cemail:cemail,
            feedmessage:feedmessage
        }  
        console.log(data);


      axios.post("/offer/save",data).then((res)=>{

        if(res.data.success){

            // alert("Offer is Created Successfully")
            swal({
              icon: 'success',
              title: "Offer is Added Successfully !",
              type: "success"
            }).then(function() {
              window.location = "/manageoffers";
            });
            this.setState({
                otitle:"",
                cemail:"",
                feedmessage:""
            });
        }
});
 }
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


validation = () => {
  let otitleError="";
  let cemailError="";
  let feedmessageError="";

  if(!this.state.otitle){
    otitleError="(Order Title Required!)"
  }

  if(!this.state.cemail){
    cemailError="(Details Required!)"
  }

  if(!this.state.feedmessage){
    feedmessageError="(Image Required!)"
  }
  


  if ( otitleError | cemailError | feedmessageError  ) {
    this.setState({otitleError , cemailError , feedmessageError  });
    return false;
  } else {
    this.setState({otitleError  , cemailError , feedmessageError });
  }
  return true;
}  


//clear form button event
cancelCourse = () => { 
  this.setState({
    otitle: "",
    cemail: "",
    feedmessage: ""
  });
}


  render() {
    return (
      <div><AdminNavBar/>
      <div className="container p-5 mb-2 mx-auto bg-light text-dark"> 
      {/* <div className="col-md-8 mt-4 mx-auto bg-light text-dark">  */}
       <h1 className="h2 mb-3 font-weight-normal">Add Offer Page</h1>
       <br></br>
        <form className='need-validation' noValidate>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Offer Title</label>
              <span style={{color : "red"}}>{this.state.otitleError}</span>
              <input type="text"
              className="form-control"
              name="otitle"
              placeholder="Enter Offer Title"
              value={this.state.otitle}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Offer Descrption</label>
              <span style={{color : "red"}}>{this.state.cemailError}</span>
              <input type="text"
              className="form-control"
              name="cemail"
              placeholder="Enter Offer Descrption"
              value={this.state.cemail}
              onChange={this.handleInputChange}/>
            </div>


            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Offer Image</label>
              <span style={{color : "red"}}>{this.state.feedmessageError}</span>
              <input type="file"
              className="form-control"
              name="feedmessage"
              placeholder="Select the Image"
              onChange={this.onChangeImage}/>
            </div>

        


            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="fa fa-upload"></i>
              &nbsp; Upload Offer
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

