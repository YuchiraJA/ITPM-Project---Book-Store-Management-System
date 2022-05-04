import React, { Component } from 'react';
import Swal from "sweetalert2";

export default class componentName extends Component {

  showAlert = () => {
     
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      footer: '<a href="/AdminOrder">OK</a>'
    })
}

  render() {
    return (
      <div className="container d-flex justify-content-center" style={{marginTop: 90}}>
      <button onClick={this.showAlert} className="btn btn-primary btn-lg">
         Show Alert
   </button>
        </div>
    );
  }
}
