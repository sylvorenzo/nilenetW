import React, {useState} from 'react';
import './App.css';
import fire  from './fire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelopeSquare, faUpload,faMapMarkerAlt,faPhoneSquareAlt} from '@fortawesome/free-solid-svg-icons';
import combination from '../assets/content.png';



const Contact = () => {
  // this is where the support page content is programmed.

   const [name, setName] = useState("");
   const [email,setEmail]=useState("");
   const [msg,setMsg]=useState("");
   const [loader,setLoader] = useState(false);
  //submits information to database
   const handleSubmit = ()=> {
     

     setLoader(true);

     fire.database().ref('feedback/').set({
       name:name,
       email:email,
       msg:msg,
     })

     .then(()=>{
       alert("Message has been sent")
       setLoader(false);
     })
     .catch(error=>{
       alert(error.message);
       setLoader(false);

     });

     setName('');
     setEmail('');
     setMsg('');
   };
   
    return (
     
      

      <div style={{paddingTop:'10px',backgroundColor:'white'}}>
        <img src={combination} width={1200} height={1200} className="support-image" style={{pointerEvents:'none', position:'absolute',marginTop:'10px'}}/>

<span class= "faq">

  <h1>FAQ</h1>
 <div class="accordion">
  <div>
    <input type="radio" name="example_accordion" id="section1" class="accordion__input"></input>
    <label for="section1" class="accordion__label"> Will confidentitial information be shared with other users ?</label>
    <div class="accordion__content">
      
      <p>
        No, sensitive information will only be accessible to the authorised personel
      </p>
    </div>
  </div>

  <div>
    <input type="radio" name="example_accordion" id="section2" class="accordion__input"></input>
    <label for="section2" class="accordion__label">How to register for your business</label>
    <div class="accordion__content">
      <p>Follow the given link</p>
      <p>
      <a href=" https://eservices.cipc.co.za/Search.aspx">Click here</a>
       
      </p>
    </div>
  </div>
  <div>
    <input type="radio" name="example_accordion" id="section3" class="accordion__input"></input>
    <label for="section3" class="accordion__label">Are you required to share banking details?</label>
    <div class="accordion__content">
      <p>No</p>
      <p>
        Legally we are not inclined to request or prompt you to share any banking details as that will be going against our user agreement policy.
      </p>
    </div>
  </div>
</div>


 <h1>Suggested for you</h1>
 <div class="accordion">
  <div>
    <input type="radio" name="example_accordion" id="section4" class="accordion__input"></input>
    <label for="section4" class="accordion__label">Update Profile</label>
    <div class="accordion__content">
      
      <p>
        Follow link to update your profile
      </p>
    </div>
  </div>

  <div>
    <input type="radio" name="example_accordion" id="section5" class="accordion__input"></input>
    <label for="section5" class="accordion__label">Forgot Password?</label>
    <div class="accordion__content">
      <p>Reset Your Password</p>
      <p>
      
       Resetting your password is easy. We'll email or text you a link to reset it via the email address or phone number you provided.
      </p>
    </div>
  </div>
  <div>
    <input type="radio" name="example_accordion" id="section6" class="accordion__input"></input>
    <label for="section6" class="accordion__label">No access to email address?</label>
    <div class="accordion__content">
    
      <p>
There are instances when you no longer use or have access to the email address used to register your LinkedIn account. We suggest first trying to sign in with a secondary email address or phone number that's associated with your account. We allow you to sign in with any email address or phone number associated with your account.      </p>
    </div>
  </div>
</div>

</span>

  <div className ="contactUs" style={{position:'absolute',paddingLeft:'70px'}}>
        <h1 style={{color:'black'}}>Contact Us</h1>
        <p style={{color:'black'}}>This is where information is displayed</p>
      <div className="contactInfo">
        <div className="contact-section">
          <h3><FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="fontawesome"/> Address</h3>
          <p>SVAI company address</p>
        </div>
        <div className="contact-section">
          <h3><FontAwesomeIcon icon={faPhoneSquareAlt} size="2x" className="fontawesome"/> Phone</h3>
          <p>SVAI company address</p>
        </div>
        <div className="contact-section">
          <h3><FontAwesomeIcon icon={faEnvelopeSquare} size="2x"className="fontawesome" /> Email</h3>
          <p>SVAI company address</p>
        </div>
      </div>

      <div className ="container">
          <div className="contactForm" >
          
          <h2>Send Message</h2>
        
        
          <input className="inputText" required="required" placeholder="Full Name" value = {name} onChange={(e) => setName(e.target.value)}/>
          
          <input className="inputText" required="required" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
      
          <textarea className="area" required="required" placeholder="Message..." value = {msg} onChange={(e) => setMsg(e.target.value)}></textarea><br/>
      
        <button type="submit"  onClick={()=>handleSubmit()} style={{background: loader ? "#ccc" : "#fff"}}><FontAwesomeIcon   icon={faUpload} size = "2em"/>Submit</button>
      </div> 

      </div>
     </div>
      </div>

      
      
    )
}

export default Contact
