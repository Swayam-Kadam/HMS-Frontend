
import React ,{ useState,useEffect } from "react"
import Foter from "./Foter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


const Appointment = () => {

  const departments = [
    "Pediatrics",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
    "General"
];
  
  const [inputType,setInputType] = useState("text");
  const [formData,setFormData] = useState({
    f_name:'',
    l_name:'',
    email:'',
    number:'',
    NIC:'',
    DOB:'',
    gander:'',
    ADOB:'',
    department:'',
    doctor:'',
    address:''
  })
  const [doctor,setDoctor] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); //this state is use to display doctors according to deparment


  useEffect(()=>{
    const fetch=async()=>{
      try {
        const response = await axios.get('https://hms-backend-z25r.onrender.com/api/doctor');
        setDoctor(response.data); 
         // Initialize filtered doctors as empty
        setFilteredDoctors([]); 
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Error fetching doctor data') //its a notification
      }
    }
    fetch();
  },[])

  //payment function
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51QzWpjFLeQgcJ2mRgnUt8Jkjz2JWP4eOByXPvvbgUmsO9zd7DsvnIcuuH1yDFxUOobSlhkXZfsawzNt6uvifDxcB00qu9YBSXU");
  
    try {
      const response = await axios.post('https://hms-backend-z25r.onrender.com/api/appointment/create-checkout-session', {
        appointment: [formData] // Match backend format
      });
  
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error(result.error.message);
        toast.error("Payment failed, please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment could not be processed.");
    }
  };
  

//this function is use to set input data
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

    // If department changes, filter doctors
  if (e.target.name === "department") {
    const filtered = doctor.filter(doc => doc.department === e.target.value);
    setFilteredDoctors(filtered);
    // Reset doctor selection when department changes
    setFormData(prev => ({ ...prev, doctor: '' }));
  }
  
  }


    //this function is use to make a appointment
  const handleSubmit = async (e) =>{
   
    e.preventDefault();
    
    if(!localStorage.getItem('token')){
      toast.error("Plz First Login To Schedule Your Appointment");
      return;
    }

    if (!formData.f_name || !formData.l_name || !formData.email || !formData.number || !formData.NIC || !formData.DOB || !formData.gander || !formData.ADOB || !formData.department || !formData.doctor || !formData.address) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    if (formData.number.length !== 10) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
  
    if (formData.NIC.length !== 8) {
      toast.error("NIC must be 8 characters long.");
      return;
    }
    
  
    try {
      
      const response = await axios.post('https://hms-backend-z25r.onrender.com/api/appointment/appo',formData,{
        headers:{
          'Content-Type':'application/json',
          "auth-token" :localStorage.getItem('token')
        },
      })

      await makePayment();
      console.log("appointment Created Successfull",response.data);
      toast.success('Appointment booked successfully!');

      // Optionally, clear the form after successful submission
    setFormData({
      f_name: '',
      l_name: '',
      email: '',
      number: '',
      NIC: '',
      DOB: '',
      gander: '',
      ADOB: '',
      department: '',
      doctor: '',
      address: ''
    });
    } catch (error) {
      console.log('Error booking appointment:',error);
      toast.error('Failed to book the appointment.please try again')
    }
  }
  
  return (
    
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container d-flex my-3 " style={{ height: '28rem' }}>
        <div className="Details-doc" id='card'style={{ height: '100%', width: '50%', overflow: 'hidden' }}>

          <p style={{ marginTop: '2rem', textAlign: 'left' }}>
            <strong> Schedule Your Appointment | Apollo Medical Institute</strong><br />SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. The Hospital bridged qualitative lacuna in the sphere of Medicine, especially amongst the super specialty branches of modern Medical Science. This healthcare facility is in the diamond capital of India, Surat, Gujarat, is open to all patients not only from the state of Gujarat, but also from across the country, and hopefully from other Countries as well.
            SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. The Hospital bridged qualitative lacuna in the sphere of Medicine, especially amongst the super specialty branches of modern Medical Science. This healthcare facility is in the diamond capital of India, Surat, Gujarat, is open to all patients not only from the state of Gujarat, but also from across the country, and hopefully from other Countries as well. </p>
        </div>
        <div className='image' style={{ height: '100%', width: '50%', marginRight: '0' }}>
          <img src="/appoinment.png" alt="im" style={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      <div className="container" style={{ marginTop: '5rem' }}>
        <h2 style={{ color: '#457b9d', textAlign: 'left' }}>Appointment</h2>
        <form id='card'  onSubmit={handleSubmit}>
          <div className="container d-flex my-3">
            <div className="container ">
              <input type='text' className="form-control my-3" placeholder='Enter First name' name="f_name" value={formData.f_name} onChange={handleChange} id='f_name'/>
              <input type='email' className="form-control my-3" placeholder='Enter Email ' name="email" value={formData.email} onChange={handleChange}/>
              <input type='number' className="form-control my-3" placeholder='NIC' name="NIC" value={formData.NIC} onChange={handleChange}/>
              <select id="inputStateGander" className="form-control" name="gander" value={formData.gander} onChange={handleChange}>
                <option disabled={true} value="">Gender</option>
                <option >Male</option>
                <option >Female</option>
              </select>
              <select id="inputStateDepratment" className="form-control my-3" name="department" value={formData.department} onChange={handleChange}>
                <option disabled={true} value="">Department</option>
                {departments.map((department,index)=>(
                  <option key={index}>{department}</option>
                ))}
              </select>
            </div>

            <div className="container ">
              <input type='text' className="form-control my-3" placeholder='Enter Last name' name="l_name" value={formData.l_name} onChange={handleChange}/>
              <input type='text' className="form-control my-3" placeholder='Enter Mobile Number' name="number" value={formData.number} onChange={handleChange}/>
              <input type={inputType} className="form-control my-3" onFocus={()=>setInputType('date')} onBlur={()=>setInputType('text')} placeholder="Date Of Birth" name="DOB" value={formData.DOB} onChange={handleChange}/>
              <input type={inputType} className="form-control my-3" onFocus={()=>setInputType('date')} onBlur={()=>setInputType('text')} placeholder="Date Of Appointment" name="ADOB" value={formData.ADOB} onChange={handleChange}/>
              <select id="inputStateDoctor" className="form-control" name="doctor" value={formData.doctor} onChange={handleChange}>
                <option disabled={true} value="">Select Doctor</option>
                {filteredDoctors.map((item,index)=>(
                  <option key={index}>{item.f_name}&nbsp;{item.l_name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="container">
            <textarea className="form-control" placeholder='Enter your Address' name="address" value={formData.address} onChange={handleChange}/>
            <button type="submit" className='btn btn-success my-3'>Get Appointment</button>
          </div>
        </form>
      </div>
      <Foter/>
    </div>
  )
}

export default Appointment
