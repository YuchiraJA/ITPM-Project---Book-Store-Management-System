import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import AdminNavBar from './AdminNavBar';

export default class CreateOffer extends Component {
        constructor(props){
          super(props);

          this.state={
              otitle:"",
              oDes:"",
              oImage:"",

              otitleError:"",
              oDesError:"",
              oImageError:""
              
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

        if (this.state.otitle && this.state.oDes && this.state.oImage){

        const{otitle,oDes,oImage} = this.state;

        const data ={
            otitle:otitle,
            oDes:oDes,
            oImage:oImage
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
                oDes:"",
                oImage:""
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
            this.setState({oImage:res.data.filename})
        })
    })
}


validation = () => {
  let otitleError="";
  let oDesError="";
  let oImageError="";

  if(!this.state.otitle){
    otitleError="(Order Title Required!)"
  }

  if(!this.state.oDes){
    oDesError="(Details Required!)"
  }

  if(!this.state.oImage){
    oImageError="(Image Required!)"
  }
  


  if ( otitleError | oDesError |oImageError  ) {
    this.setState({otitleError , oDesError , oImageError  });
    return false;
  } else {
    this.setState({otitleError  , oDesError , oImageError });
  }
  return true;
}  


//clear form button event
cancelCourse = () => { 
  this.setState({
    otitle: "",
    oDes: "",
    oImage: ""
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
              <span style={{color : "red"}}>{this.state.oDesError}</span>
              <input type="text"
              className="form-control"
              name="oDes"
              placeholder="Enter Offer Descrption"
              value={this.state.oDes}
              onChange={this.handleInputChange}/>
            </div>


            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Offer Image</label>
              <span style={{color : "red"}}>{this.state.oImageError}</span>
              <input type="file"
              className="form-control"
              name="oImage"
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

