import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Foter from './Foter'
import {Hourglass } from 'react-loader-spinner'


const Profile = () => {
    const[user,setUser] = useState([]);
    const [appoinment,setAppointment] = useState({
    data: [],
    pagination: {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false
    }
    });
    const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit:6
    });
    const [messages,setMessages] = useState({
    data: [],
    pagination: {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false
    }
    });
    const [paginationParamsMessage, setPaginationParamsMessage] = useState({
    page: 1,
    limit:6
    });

    const [donation, setDonation] = useState({ blood: false, heart: false });
    const [formData,setFormData] = useState({
        title:'',
        message:'',
        tag:''
    })
    const [load,setLoad] = useState({
        appoinment:false,
        messages:false
    })
    
    useEffect(()=>{
        if (!localStorage.getItem('token')) { 
            toast.error('Plz login first for checking Profile');
        }
        else{

        const fetchuser = async ()=>{
            try {
                const response = await axios.get('https://hms-backend-z25r.onrender.com/api/auth/fetch',{
                    headers:{
                        'Content-Type' :'application/json',
                        "auth-token" :localStorage.getItem('token')
                    },
                });
                setUser(response.data)
                setDonation(response.data.donation || { blood: false, heart: false });
            } catch (error) {
                console.error('Error fetching Profile data:', error);
                 toast.error('Error fetching Profile data') //its a notification
            }
        }
        fetchuser();

        
        }
    },[])

    useEffect(()=>{
        const fetchMessage = async()=>{
            try {
                setLoad(prev => ({...prev, messages: true}))
                const response = await axios.get('https://hms-backend-z25r.onrender.com/api/message/specific-user',{
                    params: paginationParamsMessage,
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                });
                setMessages({
                data: response.data.data,
                pagination: response.data.pagination
                })
                setLoad(prev => ({...prev, messages:false}))
            } catch (error) {
                console.error('Error fetching Message data:', error);
                 toast.error('Error fetching Message data') //its a notification
            }
        }
        fetchMessage()
    },[paginationParamsMessage])

    //this is for message pagination
        const handleMessageChange = (newPage) => {
        setPaginationParamsMessage(prev => ({
            ...prev,
            page: newPage
        }));
        };

        useEffect(() => {
                 const fetchAppointment = async()=>{
            try {
                setLoad(prev => ({...prev, appoinment: true}))
                const response = await axios.get('https://hms-backend-z25r.onrender.com/api/appointment/appouser',{
                    params: paginationParams,
                    headers:{
                        'Content-Type' :'application/json',
                        "auth-token" :localStorage.getItem('token')
                      },
                });

                setAppointment({
                data: response.data.data,
                pagination: response.data.pagination
                });

                setLoad(prev => ({...prev, appoinment: false}))
            } catch (error) {
                 console.error('Error fetching Appointment data:', error);
                 toast.error('Error fetching Appintment data') //its a notification
            }
        }

        fetchAppointment();
        }, [paginationParams]);

        //this is for Appointment pagination
        const handlePageChange = (newPage) => {
        setPaginationParams(prev => ({
            ...prev,
            page: newPage
        }));
        };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setDonation({ ...donation, [name]: checked });
    };

    // const userInfo = appoinment.length > 0 ? appoinment[0] : {};

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    //this function is use to update a userdata
    const Update = async () => {
        try {
            let userId = user._id; // ✅ Corrected user ID
            
            const updatedUserData = {
                name: user.name,
                address: user.address,
                DOB: user.DOB, // Ensure it's properly formatted as YYYY-MM-DD
                gender: user.gender,
                donation: donation,
                bloodGroup:user.bloodGroup
            };
    
            const response = await axios.patch(
                `https://hms-backend-z25r.onrender.com/api/auth/update/${userId}`, 
                updatedUserData, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                toast.success("Data updated successfully!");
            } else {
                toast.error("Failed to update data. Please try again.");
            }
        } catch (error) {
            console.error('Error Updating User:', error);
            toast.error('Failed to update data. Please try again.');
        }
    };
    

    //this funtion is use to send a message to admin
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!localStorage.getItem('token')){
            toast.error("Plz First Login For Send A Message")
            return;
        }

        try {
            const response = axios.post('https://hms-backend-z25r.onrender.com/api/message/send',formData,{
                headers:{
                    'Content-Type':'application/json',
                    "auth-token" :localStorage.getItem('token')
                  },
            })

            setFormData({
                title:'',
                message:'',
                tag:''
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
            <div className='container' style={{ height: '10rem', width: '10rem', borderRadius: '50%', background: '#f1faee', marginTop: '4rem' }}>
                <img className='image' src="/user.webp" alt="img" style={{ height: "87%", width: "84%" }} />
            </div>
            <div className='container' id='card'style={{  width: '100%', marginTop: '1rem',marginBottom:'1rem' }}>
                {/* Your Personal Information */}
                <div className='information d-flex justify-content-center '  >
                    <table className='d-flex ' style={{ justifyContent: 'center' }}>
                        <thead>
                            <tr><th>NAME:-</th></tr>
                            <tr><th>EMAIL:-</th></tr>
                            <tr><th>ADDRESS:-</th></tr>
                            <tr><th>DATE OF BIRTH:-</th></tr>
                            <tr><th>GENDER:-</th></tr>
                            <tr><th>DONATON:-</th></tr>
                            <tr><th>BLOOD.GROUP:-</th></tr>

                        </thead>
                        <tbody>

                            <tr><td>{user.name?user.name:"N/A"}</td></tr>
                            <tr><td>{user.email?user.email:"N/A"}</td></tr>
                            <tr><td>{user.address?user.address:"N/A"}</td></tr>
                            <tr><td>{user.DOB ? user.DOB.substring(0, 10) : "N/A"}</td></tr>
                            <tr><td>{user.gender?user.gender:"N/A"}</td></tr>
                            <tr><td>Blood: 
                                    <input 
                                        type="checkbox" 
                                        name="blood" 
                                        checked={donation.blood} 
                                        onChange={handleCheckboxChange} 
                                        style={{ marginRight: '1rem' }} 
                                    disabled/>
                                    Heart: 
                                    <input 
                                        type="checkbox" 
                                        name="heart" 
                                        checked={donation.heart} 
                                        onChange={handleCheckboxChange} 
                                    disabled/></td></tr>
                            <tr><td>{user.bloodGroup?user.bloodGroup:"N/A"}</td></tr>
                        </tbody>
                    </table>
                    <div className='mx-2'><i className="fa-solid fa-pen-to-square text-primary" style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                </div>

                {/* View Your Appointment  Section */}

                <div className='container' style={{ marginTop: '2rem' }}>
                    
                        <h2 style={{ color: '#457b9d'}}>Appointment:-</h2>
                       
                    {load.appoinment ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <Hourglass
                            visible={true}
                            height="50"
                            width="50"
                            colors={['#1d3557', '#3c5173ff']}
                        />
                        <span className="ms-3">Loading appointments...</span>
                    </div>
                ) : (
                    <>
                    <div className='row'>
                                {appoinment.data.map((item,index)=>(
                                    <div key={index} className="col-md-4 mb-3">
                                    <div className="card" style={{  width: '100%', backgroundColor: '#f1faee' }}>
                                        <div className="card-body" style={{ textAlign: 'left' }}>
                                            <p className="card-text">Name:-{item.f_name}&nbsp;{item.l_name}</p>
                                            <p className="card-text ">Emai:-{item.email}</p>
                                            <p className="card-text">Department:-{item.department}</p>
                                            <p className="card-text">Doctor:-{item.doctor}</p>
                                            <p className="card-text">Status:-{item.status}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                )) }
                        </div>       
                    

                    {/* Add pagination controls at the bottom */}
                    <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                        <li className={`page-item ${!appoinment.pagination.hasPreviousPage && 'disabled'}`}>
                            <button 
                            className="page-link" 
                            onClick={() => handlePageChange(appoinment.pagination.currentPage - 1)}
                            disabled={!appoinment.pagination.hasPreviousPage}
                            >
                            Previous
                            </button>
                        </li>
                        
                        {Array.from({ length: appoinment.pagination.totalPages }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item ${appoinment.pagination.currentPage === page && 'active'}`}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>
                                {page}
                            </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${!appoinment.pagination.hasNextPage && 'disabled'}`}>
                            <button 
                            className="page-link" 
                            onClick={() => handlePageChange(appoinment.pagination.currentPage + 1)}
                            disabled={!appoinment.pagination.hasNextPage}
                            >
                            Next
                            </button>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    
                    </>
        )}
                </div>

                    {/* messege section */}
                <div className="container" style={{marginTop:'2rem'}}>
                    <h2 style={{ color: '#457b9d'}}>Review:-</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter Title' className='form-control' name='title' value={formData.title} onChange={handleChange} required/>
                        <textarea className="form-control my-2" rows="5" placeholder='Write Your Messege And Review Here' name='message' value={formData.message} onChange={handleChange} required/>
                        <input type="text" placeholder='Enter Tag' className='form-control' name='tag' value={formData.tag} onChange={handleChange} required/>
                        <button className='btn btn-success my-2'>Submit</button>
                    </form>
                </div>



                 {/* View Your Message  Section */}

            <div className='container' style={{ marginTop: '2rem' }}>
                   
                        <h2 style={{ color: '#457b9d'}}>Your Review:-</h2>
                        {load.messages ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <Hourglass
                            visible={true}
                            height="50"
                            width="50"
                            colors={['#1d3557', '#3c5173ff']}
                        />
                        <span className="ms-3">Loading Review...</span>
                    </div>
                ) : (
                    <>
                    <div className='row'>
                        {messages.data.map((item,index)=>(
                            <div key={index} className="col-md-4 mb-3">
                            <div className="card" style={{  width: '100%', backgroundColor: '#f1faee' }}>
                                <div className="card-body" style={{ textAlign: 'left' }}>
                                    <p className="card-text"><span style={{color:'red'}}>Title:-</span>{item.title}</p>
                                    <p className="card-text "><span style={{color:'red'}}>Message:-</span>{item.message}</p>
                                    <p className="card-text text-success"><span style={{color:'red'}}>Replay From Appollo:-</span>{item.replay && item.replay.length > 0 ? item.replay : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        )) }
                    
                    </div>
                    
                    {/* messages pagination  */}
                    <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                        <li className={`page-item ${!messages.pagination.hasPreviousPage && 'disabled'}`}>
                            <button 
                            className="page-link" 
                            onClick={() => handleMessageChange(messages.pagination.currentPage - 1)}
                            disabled={!messages.pagination.hasPreviousPage}
                            >
                            Previous
                            </button>
                        </li>
                        
                        {Array.from({ length: messages.pagination.totalPages }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item ${messages.pagination.currentPage === page && 'active'}`}>
                            <button className="page-link" onClick={() => handleMessageChange(page)}>
                                {page}
                            </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${!messages.pagination.hasNextPage && 'disabled'}`}>
                            <button 
                            className="page-link" 
                            onClick={() => handleMessageChange(messages.pagination.currentPage + 1)}
                            disabled={!messages.pagination.hasNextPage}
                            >
                            Next
                            </button>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    </>
                )}
                </div>
            </div>





                   {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <label htmlFor="title" className="form-label">Name</label>
                                <input type='text' className='form-control' name='name' id='name' value={user.name|| ""} onChange={onChange}/>
                                
                                <label htmlFor="title" className="form-label">Address</label>
                                <input type='text' className='form-control' name='address' id='address' value={user.address|| ""} onChange={onChange}/>
                                
                                <label htmlFor="title" className="form-label">DOB</label>
                                <input type='date' className='form-control' name='DOB' id='DOB'  value={user.DOB ? user.DOB.substring(0, 10) : ""} onChange={onChange}/>
                               
                                <label htmlFor="title" className="form-label">Gender</label>
                                <select 
                                    className="form-control" 
                                    name="gender" 
                                    id="gender" 
                                    value={user.gender || ""} 
                                    onChange={onChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                                <label className="form-label">Donation</label>
                                <div>
                                    <input type="checkbox" name="blood" checked={donation.blood} onChange={handleCheckboxChange} /> Blood
                                    <input type="checkbox" name="heart" checked={donation.heart} onChange={handleCheckboxChange} style={{ marginLeft: '1rem' }} /> Heart
                                </div>
                                
                                <label htmlFor="title" className="form-label">BloodGroup</label>
                                <select 
                                    className="form-control" 
                                    name="bloodGroup" 
                                    id="bloodGroup" 
                                    value={user.bloodGroup || ""} 
                                    onChange={onChange}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={Update} data-bs-dismiss="modal">Update</button>
                        </div>
                        </div>
                    </div>
                    </div>

            <Foter />
        </div>
    )
}

export default Profile
