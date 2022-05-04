
import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

//import CreateFeedback from './components/CreateFeedback';
//import FeedbackDetails from './components/FeedbackDetails';
import NavBar from './components/NavBar';
//import EditOffer from './components/EditOffer';
//import ManageFeedbacks from './components/ManageFeedbacks';
// import EditFeedback from './components/EditFeedback';
import ManageOffers from './components/ManageOffers';
import CreateOffer from './components/CreateOffer';
import Footer from './components/footer';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import CreateInventry from './components/CreateInventry';


import "./index.css"


export default class App extends Component {

 

  render(){
    return(
      <BrowserRouter>
      <NavBar/>
      &nbsp; &nbsp;
      <div className="container">
        
        <Route path="/" exact component={Home}></Route>
        {/*<Route path="/managefeedback" exact component={ManageFeedbacks}></Route>*/}
        {/*<Route path="/feedbackform" exact component={CreateFeedback}></Route>*/}
        {/* <Route path="/edit/:id" exact component={EditFeedback}></Route> */}
        {/*<Route path="/feedback/:id" exact component={FeedbackDetails}></Route>*/}
        <Route path="/manageOffers" exact component={ManageOffers}></Route>
        <Route path="/addoffer" exact component={CreateOffer}></Route>
        {/*<Route path="/edit/:id" exact component={EditOffer}></Route>*/}
        <Route path="/AdminHome" exact component={AdminHome}></Route>
        <Route path="/CreateInventry" exact component={CreateInventry}></Route>
        <br></br>
        <br></br> 
      </div>
      <Footer/>
      </BrowserRouter>
    )
  }
}
