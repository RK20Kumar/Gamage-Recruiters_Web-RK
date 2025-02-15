import React from "react";
import Navbar from "../../components/templates/NavBar";
import Footer from "../../components/templates/Footer";
import "../../css/AdminHomePage.css";

const AdminHomePage = () => { 
  return ( 
    
    <div className="gyskk-AdminHomePage-container">
     <Navbar/>
  <div class="gyskk-AdminHomePage-content">
    <div class="gyskk-background-image">
      <div class="gyskk-content">
        
        <div><h1 className="gyskk-heading">GAMAGE RECRUITERS</h1></div>
        <div><p className="gyskk-text1">Our Go-To Platform For Connecting Top Talent With Great Opportunities.</p></div>
        <div><p className="gyskk-text2">Find Jobs Or Post Them To Hire The Best—Seamlessly And Efficiently!</p></div>
        <div><button class="gyskk-get-start-btn">Get Start</button></div>
     
      </div>
    </div>
  </div>
  <Footer />
  </div>
  
    );
  };
  
  export default AdminHomePage;
  