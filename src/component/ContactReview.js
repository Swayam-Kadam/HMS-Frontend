import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactReview = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/contact/get");
        setMessage(response.data); // Ensure only the relevant data is stored
      } catch (error) {
        console.log("There are some issues fetching messages", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="container" style={{marginTop:'2rem'}}>
      <div className="row">
        <h1 style={{textAlign:"left",marginTop:"2rem", color: '#457b9d'}}>Contect-Messages :-</h1>
           {message.map((item,index)=>(
            <div key={index} className='col-md-6 mb-6' >
                <div className="card" style={{ width: '100%',backgroundColor:'#f1faee',justifyContent:"space-between",marginTop:"1rem"}}>
                    <div className="card-body" style={{textAlign:"left"}}>
                        <h6 className="card-title"><span style={{color:'red'}}>Name:-</span>{item.name}</h6>
                        <p className="card-text"><span style={{color:'red'}}>Email:-</span>{item.email}</p>
                        <p className='"card-subtitle'><span style={{color:'red'}}>Number:-</span>{item.number}</p>
                        <p className='"card-subtitle mb-2 text-success'><span style={{color:'red'}}>Message:-</span>{item.message}</p>
                    </div>
                </div>
            </div>
           ))}  
        </div>
    </div>
  );
};

export default ContactReview;
