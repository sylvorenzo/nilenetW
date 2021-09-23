import React,{useState} from 'react';
import validate from './validateInfo';
//import logo from '../assets/nilenet.png' ;
import Avatar from '../assets/logo .png'
import useForm from './useForm';
import {FaEnvelope, FaLock} from 'react-icons/fa';


const InvestorLogin =()=>{

    // calls functions from the useForm page
    const { handleChange, handleSignup, values, errors,HandleLogin,handlePasswordReset} = useForm(
    
        validate
    );
    // create constant
    const [hasAccount, sethasAccount] = useState(false);

    return(
     
        <div >

      
            
            <div class= "login-wrapper">
                  {hasAccount ? 
                  (
                      <>
                      <div className="form" >
                          <img src={Avatar} alt=""/>
                     <h2>Sign In</h2>
                    
                     <div className="input-group">
                        <input type = "text" 
                       // className= "box-input"
                        autoFocus 
                        required 
                        value={values.email} 
                        name ="email"
                        onChange = {handleChange}
                        //placeholder='Insert Email'
                        />
                        <label><FaEnvelope/> Email</label>

                    </div>

                        <p>{errors.email}</p>



                        <div className="input-group">
                        <input type = "password"
                     
                        required value={values.password} 
                        name="password"
                        onChange = {handleChange}
                       // placeholder= "Insert Password"
                        />
                        <label><FaLock/> Password</label>
                        </div>
                        <p>{errors.password}</p>
                        <input 
                        type="submit" 
                        className="box-btn"
                        onClick={()=>HandleLogin()} 
                        value="Sign In" />
                     <br/>
                       
                      <p>Dont have an Account? <span 
                      className="box-span"
                      onClick={()=> sethasAccount(!hasAccount)} >Sign up</span></p>
                      
                      <p>Forgot Password? <span 
                     className="box-span"
                      onClick={()=>{handlePasswordReset(values.email)}}>Reset</span></p> 
                      </div>

                      
                      </>
                  ):
                  

                 
                  (
                      <>

                      <div  className = "form" >
                          <img src={Avatar} alt="">
                              
                          </img>
                          <h2>Sign Up</h2>
                         
                        <div className="input-group">
                            <input type = "text" 
                             autoFocus
                             required 
                            value={values.email} 
                             name ="email"
                             onChange = {handleChange}
                        
                        />


                        <label for="email"><FaEnvelope/> Email</label>
                        </div>
                        <div className="input-group">
                        <input type = "text" 
                       // className= "box-input"
                        autoFocus 
                        required 
                        value={values.username} 
                        name ="username"
                        onChange = {handleChange}
                        //placeholder='Insert Email'
                        />
                        <label><FaEnvelope/> Username</label>

                    </div>
                    <div className="input-group">
                        <input type = "text" 
                       // className= "box-input"
                        autoFocus 
                        required 
                        value={values.surname} 
                        name ="surname"
                        onChange = {handleChange}
                        //placeholder='Insert Email'
                        />
                        <label><FaEnvelope/>Surname</label>

                    </div>
                    <div className="input-group">
                        <input type = "text" 
                       // className= "box-input"
                        autoFocus 
                        required 
                        value={values.companyName} 
                        name ="companyName"
                        onChange = {handleChange}
                        //placeholder='Insert Email'
                        />
                        <label><FaEnvelope/>Company Name</label>

                    </div>
                      <div className="input-group" >
                        <p>{errors.email}</p>
                        <select 
                        name="sectorOfBusiness"
                        value={values.sectorOfBusiness}
                        onChange={handleChange}>
                            
                            <option value="sectorType">--Sector--</option>
                            <option value="tourism">Tourism</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="finance">Finance</option>
                            <option value="other">Other</option>
                        </select>

                        <br/>
                      

                        <select 
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                           // placeholder="Select type"
                        >
                            <option value="UserType">--User Type--</option>
                            <option value="Entrepreneur"> Entrepreneur</option>
                            <option value= "Investor">Investor</option>
                        </select>

                    </div>
                    <br/>
                    <div className="input-group">

                    </div>
                       <div className="input-group">
                           <input type = "password"
                       
                        required value={values.password} 
                        name="password"
                        onChange = {handleChange}
                       
                        />
                        <label for="password"><FaLock/> Password</label>
                       </div>
                        
                        <p>{errors.password}</p>
                        <div className="input-group">

                               <input type="password" required value= {values.password2} 
                     
                      onChange={handleChange}
                      name = "password2"
                 
                     />

                      <label for="passweord2"><FaLock/> Confirm Password</label>
                        </div>
                   
                         


                      <p>{errors.password2}</p>
                      <input type="submit" 
                      className="box-btn" 
                      onClick={handleSignup} 
                      value= "Sign Up"
                      />
                      <br/>
                      <p>Have an Account? <span 
                      className="box-span" onClick={()=> sethasAccount(!hasAccount)}>Sign in</span></p>
                      
                      </div>
                      
                      </>

                  )}

                
            </div>
        </div>
            
    );

}

export default InvestorLogin;