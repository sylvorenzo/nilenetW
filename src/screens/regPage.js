import React from 'react';
import useForm from './useForm';
import validate from './validateInfo';
import { Link } from 'react-router-dom';



const InvestReg = ({ submitForm })=> {
    const { handleChange, handleSubmitI, values, errors} = useForm(
        submitForm,
        validate
      );
        return(
        <div>
        

            <div>

                <form onSubmit = {handleSubmitI} class="box" noValidate>
                    <h1>Investor Details</h1>
                    
                    <input type="text" value ={values.username} name="username" onChange = {handleChange} placeholder= "First Name..."/>
                    {/*Displays error for username input */}
                    {errors.username && <p>{errors.username}</p>}
                    <input type="text" value ={values.surname} name="surname" onChange = {handleChange} placeholder= "Last Name..."/>
                    {/*Displays error for surname input */}
                    {errors.surname && <p>{errors.surname}</p>}
                    <select onChange={handleChange} name="sectorOfBusiness" value={values.sectorOfBusiness}>
                        <option value="sectors">Select a sector</option>
                        <option value="aggriSec">Agrricutlure</option>
                        <option value = "entertainment">Entertainment</option>
                        <option value = "busFin">Business and Finance</option>
                        <option value = "fashion">Retail</option>
                    </select>
                    <input type="text" name="companyName" value ={values.companyName} onChange = {handleChange} placeholder = "Company Name"/>
                     {/*Displays error for companyName input */}
                    {errors.companyName && <p>{errors.companyName}</p>}

                    <select onChange={handleChange} name="estimatedAnnualRevenue" value={values.estimatedAnnualRevenue}>
                    <option value = "base">Select Revenue Range</option>
                    <option value = "tier1">R1 000 - R50 000</option>
                    <option value = "tier2">R50 001-R100 000 </option>
                    <option value = "tier3">R100 001-R500 000</option>
                    <option value = "tier4">R500 001-R1 000 000</option>
                    <option value = "tier5"> R1 000 000 +</option>
                    </select>


                    <br/>
                    <Link to='/h'> 
                        <input type="submit" value ="Submit"/>
                    </Link>
                    

                </form>
             
            </div>
        </div>)
    
    
    
}
 
export default InvestReg;