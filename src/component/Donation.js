import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Donation = () => {
    const[data,setData]=useState([]);
    const[heart,setHeart]=useState([]);

    useEffect(()=>{
        const fetch=async()=>{
            try {
                const response = await axios.get('http://localhost:3001/api/auth/all');
                const filteredUsers = response.data.filter(user => user.donation?.blood === true); // Filter on frontend
                const filteredHeart = response.data.filter(user => user.donation?.heart === true); // Filter on frontend
                setData(filteredUsers);
                setHeart(filteredHeart);
            } catch (error) {
                alert("some error occured")
            }
        }
        fetch();
    },[])
  return (
    <div>
       

       <div className='container my-3' style={{ height: '25rem', backgroundColor: '#457b9d', overflowY: 'auto', padding: '5px', border: '2px solid #e63946',borderRadius:'1rem' }}>
  <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead style={{ position: 'sticky', top: '0', width:'100%', color: 'white' }}>
    <tr>
     <th colSpan="8" bgcolor='#457b9d'> Blood Donators </th>
</tr>
      <tr bgcolor= '#e63946'>
        <th>Name</th>
        <th>DOB</th>
        <th>Gender</th>
        <th>Blood.Group</th>
        <th>Contact</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} style={{marginTop:'1rem'}}>
          <td>{item.name}</td>
          <td>{item.DOB ? item.DOB.substring(0, 10) : "N/A"}</td>
          <td>{item.gender}</td>
          <td>{item.bloodGroup}</td>
          <td>{item.email}</td>
            
        </tr>
      ))}
    </tbody>
  </table>
</div>



<div className='container my-3' style={{ height: '25rem', backgroundColor: '#457b9d', overflowY: 'auto', padding: '5px', border: '2px solid #e63946',borderRadius:'1rem' }}>
  <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead style={{ position: 'sticky', top: '0', width:'100%', color: 'white' }}>
    <tr>
     <th colSpan="8" bgcolor='#457b9d'> Heart Donators </th>
</tr>
      <tr bgcolor= '#e63946'>
        <th>Name</th>
        <th>DOB</th>
        <th>Gender</th>
        <th>Blood.Group</th>
        <th>Contact</th>
      </tr>
    </thead>
    <tbody>
      {heart.map((item, index) => (
        <tr key={index} style={{marginTop:'1rem'}}>
          <td>{item.name}</td>
          <td>{item.DOB ? item.DOB.substring(0, 10) : "N/A"}</td>
          <td>{item.gender}</td>
          <td>{item.bloodGroup}</td>
          <td>{item.email}</td>
            
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default Donation
