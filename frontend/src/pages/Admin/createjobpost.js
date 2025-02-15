import React, { useState } from 'react'
import Footer from '../../components/templates/Footer'
import Navbar from "../../components/templates/AdminNavbar";
import Sidebar from "../../components/templates/ASidebar";
import '../../css/Admin/Createjob.css';




function Createjobpost() {

  const [job,setjob]=useState({
    title:'',
    state:'',
    salary:'',
    location:'',
    description:''
  })

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setjob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:7000/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.ok) {
        alert("Job Posted Successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };
  

  
  return (
    <div>
      <Navbar />
    
    <div className="admin-overview-content">
    <Sidebar />
    <div className='gyskk-container'>
        
        <div className='gyskk-content'>
          <h2>Post a Job</h2>
          <div className='gyskk-form'>
          <div className="gyskk-input-group">

          <label className='gyskk-label' >Job Title</label>
          <input type='text' 
          placeholder='Human Resource' 
          className='gyskk-input'
          name='title'
          onChange={handleChange}
          value={job.title}
          />
          <label className='gyskk-label' >State</label>
          <input type='text'
           placeholder='Excetive' 
           className='gyskk-input'
           name='state'
           onChange={handleChange}
           value={job.state}
           />
          </div>

          <div className="gyskk-input-group">
          <label className='gyskk-label' >salary</label>
          <div className="salary-input">
            <span>LKR</span>
          <input type='text'
           placeholder='80000' 
           className='gyskk-input' 
           name='salary'
           onChange={handleChange}
           value={job.salary}
           />
          </div>
          <label className='gyskk-label'>Location</label>
          <input type='text' 
          placeholder='Panadura,Western Province ,SriLanka' 
          className='gyskk-input' 
          name='location'
          onChange={handleChange}
          value={job.location}
          />
          </div>
          </div>
          <div className="gyskk-input-textarea">
          <label className='gyskk-label'>Description</label>
          <textarea placeholder='Include job role and job requirement' 
          name='description'
          onChange={handleChange}
          value={job.description}
          />
          </div>
          
          <button className='submit-btn' onClick={handleSubmit}>Submit</button>
        </div>
        </div>
        </div>
        
        <div className="container3">
        <Footer />
    </div>
    </div>    
     
           
          
      
  
    
  )
}

export default Createjobpost;
