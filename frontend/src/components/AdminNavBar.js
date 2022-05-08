import React, { Component } from 'react';


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav class="p-3 mb-2 bg-dark text-white  d-flex justify-content-around">
          <a class="navbar-brand" href="/">
            <img src="./bookstore.png" width="115px" height="40px"/>
          </a>
          <nav class="e d-flex justify-content-center">
            <a class="btn btn-primary btn-lg btn-block" href="/AdminHome">Inventry Manage</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-primary btn-lg btn-block" href="/manageOffers">Offers Manage</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-primary btn-lg btn-block" href="/managefeedbacks">Feedback Manage</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-primary btn-lg btn-block" href="/AdminOrder">Order Manage</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="btn btn-primary btn-lg btn-block" href="/AdminSupplier">Supplier Manage</a>&nbsp;&nbsp;&nbsp;&nbsp;
          </nav>
          
           <a class="btn btn-warning btn-lg btn-block" href="/adminlogin">Logout</a>
        </nav>
        </div>

        
    )
  }
}