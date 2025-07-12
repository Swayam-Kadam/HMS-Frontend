
import React,{useEffect} from 'react'
import Foter from './Foter'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './css/homee.css';
import { EffectCoverflow,Pagination } from 'swiper/modules';
import HomeImage from './HomeImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const department =[
  {
    src:'/doctor/pediatrics.jpg',
    name:'PEDIATRICS'
  },
  {
    src:'/doctor/heart.jpg',
    name:'CARDIOLOGY'
  },
  {
    src:'/doctor/new.jpg',
    name:'NEUROLOGY'
  },
  {
    src:'/doctor/orthopedics.jpg',
    name:'ORTHOPEDICS'
  },
  {
    src:'/doctor/oncology.jpg',
    name:'ONCOLOGY'
  },
  {
    src:'/doctor/therapy.jpg',
    name:'PHYSICAL THERAPY'
  },
  {
    src:'/doctor/dermatology.jpg',
    name:'DERMATOLOGY'
  },
  {
    src:'/doctor/ent.jpg',
    name:'ENT'
  }
]

const Home = () => {

  useEffect(()=>{
    if(localStorage.getItem('token')){
      toast.success("Welcome To Apollo Hospital")
    }
  },[])

    // const [startIndex, setStartIndex] = useState(0); // Track the first visible card
  
    // const handleScrollRight = () => {
    //   if (startIndex + 4 < department.length) {
    //     setStartIndex((prevIndex) => prevIndex + 1); // Move forward by one card
    //   }
    // };
  
    // const handleScrollLeft = () => {
    //   if (startIndex > 0) {
    //     setStartIndex((prevIndex) => prevIndex - 1); // Move backward by one card
    //   }
    // };

  return (
    <div>
       <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <HomeImage/>
      <div className="container d-flex my-3" style={{ height: '28rem' }}>
        <div className="Details-doc" id='card' style={{ height: '100%', width: '50%', overflow: 'hidden' }}>

          <p style={{ marginTop: '2rem', textAlign: 'left' }}>
            <strong>Welcome to Apollo Medical Institute | Your Trusted Healthcare Provider!!</strong><br />SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. The Hospital bridged qualitative lacuna in the sphere of Medicine, especially amongst the super specialty branches of modern Medical Science. This healthcare facility is in the diamond capital of India, Surat, Gujarat, is open to all patients not only from the state of Gujarat, but also from across the country, and hopefully from other Countries as well.<br/>
            SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. The Hospital bridged qualitative lacuna in the sphere of Medicine, especially amongst the super specialty branches of modern Medical Science. This healthcare facility is in the diamond capital of India, Surat, Gujarat, is open to all patients not only from the state of Gujarat, but also from across the country, and hopefully from other Countries as well. </p>
        </div>
        <div className='image' style={{ height: '100%', width: '50%', marginRight: '0' }}>
          <img src="/doc1.png" alt="im" style={{ height: '100%', width: '100%' }} />
        </div>
      </div>


      <div className='container d-flex' style={{ marginTop: '5rem', height: '28rem' }}>
        <div className='image1' style={{ height: '100%', width: '50%', marginLeft: '0' }}>
          <img src="/doc2.png" alt="im" style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="Details-doc1" id='card' style={{ height: '100%', width: '50%', alignContent: 'center', overflow: 'hidden' }}>

          <p style={{ marginTop: '2rem', textAlign: 'left' }}>
            Biography <br /><br />
            <strong>Who We Are?</strong> <br />SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. The Hospital bridged qualitative lacuna in the sphere of Medicine, especially amongst the super specialty branches of modern Medical Science. This healthcare facility is in the diamond capital of India, Surat, Gujarat, is open to all patients not only from the state of Gujarat, but also from across the country, and hopefully from other Countries as well. <br /><br />We Are Working On MERN Stack Project!!<br /><br /> SAMAST PATIDAR AAROGYA TRUST is a “NOT FOR PROFIT” Organization. The Trust has setup a State of the Art world class Multi Super specialty Hospital and Research Centre in the Centre of Surat City, Gujarat. </p>
        </div>
      </div>

    <div className="container" style={{ marginTop: '5rem',}}>
    <h2 style={{ color: '#457b9d', textAlign: 'left' }}>Department</h2>
      <div className='container d-flex' style={{ marginTop: '1rem', justifyContent:'space-between' }}>
        
        {/* Left Scroll Button */}
        {/* <button
            className="btn btn"
            onClick={handleScrollLeft}
            disabled={startIndex === 0}  // Disable when at the first card
            style={{
              borderRadius:'50%',
              marginTop:'8%',
              left: '-2rem',
              height: '3rem',
              width: '3rem',
              backgroundColor:'#457b9d'
            }}
          >
            &lt;
          </button>

        {department.slice(startIndex, startIndex + 4).map((item,index)=>(
          <div  key ={index} className="card" style={{ width: '18rem',height:'15rem'}}>
          <img className="card-img-top" src={item.src} alt="Card" style={{height:'100%',borderRadius:'2rem'}}/>
          <strong style={{position:'absolute',bottom:'10%',backgroundColor:'#e63946',color:'#f1faee',borderRadius:'8px',left:'30%'}}>{item.name}</strong>
          </div>
        ))} */}


          {/* Right Scroll Buttons */}
          {/* <button
            className="btn btn"
            onClick={handleScrollRight}
            disabled={startIndex + 4 >= department.length}   // Disable when at the last card
            style={{
              borderRadius:'50%',
              marginTop:'8%',
              right: '-2rem',
              height: '3rem',
              width: '3rem',
              backgroundColor:'#457b9d'
            }}
          >
            &gt;
          </button>  */}
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
      {department.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="card">
            <img className="card-img-top" src={item.src} alt="Card" />
            <strong style={{position:'absolute',bottom:'10%',backgroundColor:'#e63946',color:'#f1faee',borderRadius:'8px',left:'30%'}}>{item.name}</strong>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
      </div>



            <div className=" container accordion my-5" id="accordionExamples">
            <h2 style={{ color: '#457b9d', textAlign: 'left',marginBottom:'2rem' }}>Frequently Asked Questions</h2>

            
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <h5>
            How can I book an appointment at Apollo Hospitals?</h5>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body text-muted">
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>
            You can book an appointment online through the Apollo Hospitals website, via the Apollo 24|7 app, or by calling the hospital’s appointment helpline. Walk-in appointments may also be available.
            </p>
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <h5>
              Can I seek an appointment with a specialist at Apollo Hospitals even if I don’t have a local referral?</h5>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body text-muted">
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>
              Yes, you can directly book an appointment with a specialist at Apollo Hospitals without needing a local referral. Our team will guide you to the right expert based on your condition.
            </p>
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseOne">
              <h5>
              Does Apollo Hospitals offer second opinions or online consultations?</h5>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body text-muted">
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>
              Yes, Apollo Hospitals provides second opinions and online consultations through the Apollo 24|7 platform, allowing you to connect with top specialists from anywhere.
            </p>
            </div>
          </div>
        </div>

        
        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              <h5>
              Will I be informed about the cost of treatment and duration of stay at Apollo Hospitals?</h5>
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body text-muted">
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>
              Yes, our patient care team will provide an estimated cost and expected duration of stay based on your diagnosis and treatment plan after consultation with the doctor.
            </p>
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              <h5>
              What are the visiting hours and policies for patients’ families?
              </h5>
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body text-muted">
              <p style={{textAlign:'left',fontSize:'1.2rem'}}>
              Visiting hours vary by department and hospital location. Our staff will inform you about specific policies to ensure patient safety and comfort.
            </p>
            </div>
          </div>
        </div>
        
      </div>




      
      <Foter />
    </div>
  )
}




export default Home



