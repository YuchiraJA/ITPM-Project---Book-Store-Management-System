import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import AdminNavBar from './AdminNavBar';

export default class CreateInventry extends Component {
        constructor(props){
          super(props);

          this.state={
              title:"",
              price:"",
              language:"",
              author:"",
              publisher:"",
              isbn:"",            
              details:"",
              image:"",

              titleError:"",
              priceError:"",
              languageError:"",
              authorError:"",
              publisherError:"",
              isbnError:"",            
              detailsError:"",
              imageError:""

              
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
        
        if (this.state.title && this.state.price && this.state.language && this.state.author && this.state.publisher && this.state.isbn && this.state.details && this.state.image){

        const{title,price,language,author,publisher,isbn,details,image} = this.state;

        const data ={
            title:title,
            price:price,
            language:language,
            author:author,
            publisher:publisher,
            isbn:isbn,            
            details:details,
            image:image
        }  
        console.log(data);

        axios.post("/inventry/save",data).then((res)=>{
                  if(res.data.success){
                    swal({
                      icon: 'success',
                      title: "Book Successfully added !",
                      type: "success"
                    }).then(function() {
                      window.location = "/AdminHome";
                    });
                      
                      this.setState({
                          title:"",
                          price:"",
                          language:"",
                          author:"",
                          publisher:"",
                          isbn:"",
                          details:"",
                          image:""
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
            axios.post("/inventry/upload", data, {
            }).then(res => {
                this.setState({image:res.data.filename})
            })
        })
    }


    


    validation = () => {
      let titleError="";
      let priceError="";
      let languageError="";
      let authorError="";
      let publisherError="";
      let isbnError="";
      let detailsError="";
      let imageError="";
 
      if(!this.state.title){
        titleError="(Book Title Required!)"
      }
      
      if(!this.state.price){
        priceError="(Price Required!)"
      }

      if(!this.state.language.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
        languageError="(Language must be characters!)"
      }

      if(!this.state.language){
        languageError="(Language Required!)"
      }

      if(!this.state.author.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
        authorError="(Author must be characters!)"
      }

      if(!this.state.author){
        authorError="(Author Required!)"
      }

      if(!this.state.publisher.includes('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')){
        publisherError="(Publisher must be characters!)"
      }

      if(!this.state.publisher){
        publisherError="(Person Name Required!)"
      }

      if(!this.state.isbn){
        isbnError="(ISBN Required!)"
      }

      if(!this.state.details){
        detailsError="(Details Required!)"
      }

      if(!this.state.image){
        imageError="(Image Required!)"
      }
      


      if ( titleError | priceError | languageError | authorError | publisherError | isbnError | detailsError | imageError  ) {

        this.setState({titleError , priceError , languageError , authorError , publisherError , isbnError , detailsError , imageError  });

        return false;

      } else {

        this.setState({titleError  , priceError , languageError , authorError , publisherError , isbnError , detailsError , imageError  });

      }

      return true;

    }  




  render() {
    return (
      <div>
        <AdminNavBar/>
      <div className="col-md-8 mt-4 mx-auto"> <h1 className="h3 mb-3 font-weight-normal"><center>Create Inventry</center></h1>
        <form className='form-group'>
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Title</label>&nbsp;
              <span style={{color : "red"}}>{this.state.titleError}</span>
              <input type="text"
              className="form-control"
              name="title"
              placeholder="Enter Title"
              value={this.state.title}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Price</label>&nbsp;
              <span style={{color : "red"}}>{this.state.priceError}</span>
              <input type="number"
              className="form-control"
              name="price"
              placeholder="Enter Price"
              value={this.state.price}
              onChange={this.handleInputChange}/>
            </div>
          </div>

          <div className='row'>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Language</label>&nbsp;
              <span style={{color : "red"}}>{this.state.languageError}</span>
              <input type="text"
              className="form-control"
              name="language"
              placeholder="Enter Language"
              value={this.state.language}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Author</label>&nbsp;
              <span style={{color : "red"}}>{this.state.authorError}</span>
              <input type="text"
              className="form-control"
              name="author"
              placeholder="Enter Author"
              value={this.state.author}
              onChange={this.handleInputChange}/>
            </div>
          </div>

          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Publisher</label>&nbsp;
              <span style={{color : "red"}}>{this.state.publisherError}</span>
              <input type="text"
              className="form-control"
              name="publisher"
              placeholder="Enter Publisher"
              value={this.state.publisher}
              onChange={this.handleInputChange}/>
            </div>

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>ISBN</label>&nbsp;
              <span style={{color : "red"}}>{this.state.isbnError}</span>
              <input type="number"
              className="form-control"
              name="isbn"
              placeholder="Enter ISBN"
              value={this.state.isbn}
              onChange={this.handleInputChange}/>
            </div>

          </div> 
          <div className='row'>
            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Details</label>&nbsp;
              <span style={{color : "red"}}>{this.state.detailsError}</span>
              <input type="text"
              className="form-control"
              name="details"
              placeholder="Enter Details"
              value={this.state.details}
              onChange={this.handleInputChange}/>
            </div>

            

            <div className="col-lg-6" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Image</label>&nbsp;
              <span style={{color : "red"}}>{this.state.imageError}</span>
              <input type="file"
              className="form-control"
              name="image"
              onChange={this.onChangeImage}/>
            </div>
          </div>
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="fa fa-upload"></i>
              &nbsp; Upload Inventry Details
            </button>           

        </form>
      </div>
      </div>
    )
  }
}

