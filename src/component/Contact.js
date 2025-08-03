import React,{useState} from 'react'
import Foter from './Foter'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData,setFormData] = useState({
          name:'',
          email:'',
          number:'',
          message:'',
      });


      const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

  //this funtion is use to send a message to admin
  const handleSubmit = (e) =>{
    e.preventDefault();
      
    if(formData.number.length !== 10){
       toast.error('number should be 10 number');
       return;
    }

    try {
        const response = axios.post('https://hms-backend-z25r.onrender.com/api/contact/send',formData,{
            headers:{
                'Content-Type':'application/json'
              },
        })

        setFormData({
            name:'',
            email:'',
            number:'',
            message:'',
        })
        console.log("Your Comment Send Successfully",response.data)
        toast.success("Your Comment Send SuccessFully")
    } catch (error) {
        console.log('Error For Sending Message:',error);
        toast.error('Failed to Send A Message.please try again')
    }
}

  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29759.238614759142!2d72.76151211083986!3d21.195939400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dd34e1206c7%3A0xef71ae6d6aa24966!2sApollo%20Clinic!5e0!3m2!1sen!2sin!4v1727340299004!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0,marginTop:"2rem" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map of Apollo Clinic"
      ></iframe>
      </div>

      <div className="container my-5  d-sm-inline-flex " id="contact" style={{justifyContent:'space-between'}}>
        {/* send a message form */}
        <div id='card' className='my-3' style={{width:'45%'}}>
            <form onSubmit={handleSubmit}>
            <h3 style={{color:'#457b9d'}}>Contact Form</h3>
            <input type="text" className='form-control ' placeholder='Enter Your Name' name='name' value={formData.name} onChange={handleChange} required/>
            <input type="email" className='form-control my-3' placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleChange} required/>
            <input type="number" className='form-control' placeholder='Enter Your Number' name='number' value={formData.number} onChange={handleChange} required/>
            <textarea  className='form-control my-3' placeholder='Enter Your Message' name='message' value={formData.message} onChange={handleChange} required />
            <button className='btn btn-danger'>Send Message</button>
            </form>
        </div>
        
        
        <div id='card' className='my-3' style={{width:'45%'}}>
            <h3 style={{marginBottom:'2rem',color:'#457b9d'}}>Address</h3>
            <table className='d-flex'>
                            <thead>
                                <tr style={{height:"3rem"}}><th><i className="fa-solid fa-location-dot"></i></th></tr>
                                <tr style={{height:"3rem"}}><th><i className="fa-solid fa-phone"></i></th></tr>
                                <tr style={{height:"3rem"}}><th><i className="fa-solid fa-message"></i></th></tr>
                                <tr style={{height:"3rem"}}><th><i className="fa-solid fa-globe"></i></th></tr>
                            </thead>
                            <tbody>
                                
                                <tr style={{height:"3rem"}}><td>Apollo Clinic, Mann Complex, Anand Mahal Road, Adajan, Surat, Surat, Gujarat, India</td></tr>
                                <tr style={{height:"3rem"}}><td>30900 203400</td></tr>
                                <tr style={{height:"3rem"}}><td>apollo@gmail.com</td></tr>
                                <tr style={{height:"3rem"}}><td>www.apollo.com</td></tr>
                            </tbody>
                        </table>
        </div>
      </div>
      <Foter/>
    </div>
  )
}

export default Contact
