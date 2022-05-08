
import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import CreateFeedback from './components/CreateFeedback';
import FeedbackDetails from './components/FeedbackDetails';
import EditOffer from './components/EditOffer';
import ManageFeedbacks from './components/ManageFeedbacks';
import EditFeedback from './components/EditFeedback';
import ManageOffers from './components/ManageOffers';
import CreateOffer from './components/CreateOffer';
import OffersHome from './components/OffersHome';

import Footer from './components/footer';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import CreateInventry from './components/CreateInventry';
import EditInventry from './components/EditInventry';
import InventryDetails from './components/InventryDetails';

import CreateOrder from './components/CreateOrder';
import EditOrder from './components/EditOrder';
import OrderDetails from './components/OrderDetails';
import AdminOrder from './components/AdminOrder';
import customerDetail from './components/customerDetail';

import AdminSupplier from './components/AdminSupplier';
import SupplierDetails from './components/SupplierDetails';
import CreateSupplier from './components/CreateSupplier';
import EditSupplier from './components/EditSupplier';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Contactus from './components/Contactus';
import Aboutus from './components/Aboutus';


import "./index.css"


export default class App extends Component {

 

  render(){
    return(
      <BrowserRouter>
        
        <Route path="/Home" exact component={Home}></Route>
        <Route path="/managefeedbacks" exact component={ManageFeedbacks}></Route>
        <Route path="/feedbackform" exact component={CreateFeedback}></Route>
        <Route path="/feedback/:id" exact component={FeedbackDetails}></Route>
        <Route path="/manageOffers" exact component={ManageOffers}></Route>
        <Route path="/addoffer" exact component={CreateOffer}></Route>
        <Route path="/edit/:id" exact component={EditOffer}></Route>
        <Route path="/OffersHome" exact component={OffersHome}></Route>
        <Route path="/AdminHome" exact component={AdminHome}></Route>
        <Route path="/CreateInventry" exact component={CreateInventry}></Route>
        <Route path="/EditInventry/:id" exact component={EditInventry}></Route>
        <Route path="/InventryDetails/:id" exact component={InventryDetails}></Route>


        
        <Route path="/CreateOrder" exact component={CreateOrder}></Route>
        <Route path="/EditOrder/:id" exact component={EditOrder}></Route>
        <Route path="/OrderDetails/:id" exact component={OrderDetails}></Route>
        <Route path="/customerDetail" exact component={customerDetail}></Route>
        <Route path="/AdminOrder" exact component={AdminOrder}></Route>

        <Route path="/AdminSupplier" exact component={AdminSupplier}></Route>
        <Route path="/SupplierDetails/:id" exact component={SupplierDetails}></Route>
        <Route path="/CreateSupplier" exact component={CreateSupplier}></Route>
        <Route path="/EditSupplier/:id" exact component={EditSupplier}></Route>

        <Route path="/" exact component={Login}></Route>
        <Route path="/adminlogin" exact component={AdminLogin}></Route>
        <Route path="/Contactus" exact component={Contactus}></Route>
        <Route path="/Aboutus" exact component={Aboutus}></Route>



        <br></br>
        <br></br> 

      <Footer/>
      </BrowserRouter>
    )
  }
}
