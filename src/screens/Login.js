import React,{useState} from 'react';
import validate from './validateInfo';
import logo from '../assets/nilenet.png' ;
import useForm from './useForm';

const InvestorLogin =()=>{

    // calls functions from the useForm page
    const { handleChange, handleSignup, values, errors,HandleLogin,handlePasswordReset} = useForm(
    
        validate
    );
    // create constant
    const [hasAccount, sethasAccount] = useState(false);

    return(
     
        <div>
            <img alt="logo" src={logo} className ='logo-img'/>
            <div className='box'>
                  {hasAccount ? (
                      <>
                      <h1>SIGN IN</h1>
                        <input type = "text" 
                        className= "box-input"
                        autoFocus 
                        required 
                        value={values.email} 
                        name ="email"
                        onChange = {handleChange}
                        placeholder='Insert Email'
                        /><br/>
                        <p>{errors.email}</p>
                        <input type = "password"
                        className= "box-input"
                        required value={values.password} 
                        name="password"
                        onChange = {handleChange}
                        placeholder= "Insert Password"
                        /><br/>
                        <p>{errors.password}</p>
                        <input type="submit" className="box-btn" onClick={()=>{HandleLogin()}} value="Sign In" />
        
                      <p>Dont have an Account? <span className="box-span" onClick={()=> sethasAccount(!hasAccount)} >Sign up</span></p>
                      <p>Forgot Password? <span className="box-span" onClick={()=>{handlePasswordReset(values.email)}}>Reset</span></p>
                      </>
                  ): (
                      <>
                      <h1>SIGN UP</h1>
                      <input type = "text" 
                        autoFocus
                        className= "box-input"
                        required 
                        value={values.email} 
                        name ="email"
                        onChange = {handleChange}
                        placeholder='Insert Email'
                        /><br/>
                        <p>{errors.email}</p>
                        <input type = "text" 
                        autoFocus
                        className= "box-input"
                        required 
                        value={values.username} 
                        name ="email"
                        onChange = {handleChange}
                        placeholder='Insert Email'
                        /><br/>
                        <p>{errors.username}</p>
                        <input type = "text" 
                        autoFocus
                        className= "box-input"
                        required 
                        value={values.surname} 
                        name ="email"
                        onChange = {handleChange}
                        placeholder='Insert Email'
                        /><br/>
                        <p>{errors.surname}</p>
                        <select className="box-select"
                            name="type"
                            value={values.sectorOfBusiness}
                            onChange={handleChange}
                        >
                            <option></option>
                            <option value="tourism">Tourism</option>
                            <option value= "maufacturing">Manufacturing</option>
                            <option value= "agriculture">Agriculture</option>
                            <option value= "finances">Finances</option>
                        </select><br/>   
                        <select className="box-select"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                        >
                            <option></option>
                            <option value="Entrepreneur"> Entrepreneur</option>
                            <option value= "Investor">Investor</option>
                        </select><br/>
                        <input type = "password"
                        className= "box-input" 
                        required value={values.password} 
                        name="password"
                        onChange = {handleChange}
                        placeholder= "Insert Password"
                        /><br/>
                        <p>{errors.password}</p>
                      <input type="password" required value= {values.password2} 
                      className= "box-input"
                      onChange={handleChange}
                      name = "password2"
                      placeholder="Confirm Password"/><br/>
                      <p>{errors.password2}</p>
                      <input type="submit" className="box-btn" onClick={handleSignup} value= "Sign Up"/>
                      <p>Have an Account? <span className="box-span" onClick={()=> sethasAccount(!hasAccount)}>Sign in</span></p>
                      
                      </>

                  )}

                
            </div>
        </div>
            
    );

}

export default InvestorLogin;
