import React, { useState,useEffect } from 'react'
import Foter from './Foter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {Hourglass } from 'react-loader-spinner'

const Detail = () => {


  const [doctor,setDoctor] = useState([])
  const [load,setLoad] = useState(false)
   
  //fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoad(true) // Show loader when fetch starts
        const response = await axios.get('https://hms-backend-z25r.onrender.com/api/doctor');
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Error fetching doctor data')
      } finally {
        setLoad(false) // Hide loader when fetch completes (success or error)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
            <div className='container' style={{marginTop:'2rem'}}>
              {load ? (
                 // Show loader while loading
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#1d3557', '#3c5173ff']}
            />
            <span className="ms-3">Loading doctors...</span>
          </div>
                ):(<div className="row">
                    {doctor.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                              <div className="card" id="card"style={{height: '25rem', width: '100%'}}>
                            <img className="card-img-top" src={`https://hms-backend-z25r.onrender.com/${item.img}`} alt="Card cap" style={{height: '40%', width: '100%'}} />
                                <div className="card-body" style={{textAlign:'left'}}>
                                    <h5 className="card-title">Name:-{item.f_name}&nbsp;{item.l_name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Emai:-{item.email}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Department:-{item.department}</h6>
                                    <p className="card-text">DOB:-{item.DOB}</p>
                                    <p className="card-text">NIC:-{item.NIC}</p>
                                    <p className="card-text">Gender:-{item.gander}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)
              }
            </div>
            <Foter/>
        </div>
  )
}

export default Detail
