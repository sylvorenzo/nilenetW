import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import {Link} from 'react-router-dom';


const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors,} = useForm(
    submitForm,
    validate
  );

  
  
  return (
    <div>
      

      <form  onSubmit={handleSubmit} class='box-signup' noValidate >

        <h4>Entrepreneur Details</h4>
         <input
           type='text'
           name='username'
           placeholder='Enter your username'
           value={values.username}
           onChange={handleChange}
         />

         {/*Displays error for username input */}
         {errors.username && <p>{errors.username}</p>}

       {/*A div is created for each input field */}
     
           {/*Creates input box for username */}
           <input
           type='text'
           name='surname'
           placeholder='Enter your surname'
           value={values.surname}
           onChange={handleChange}
           />

           {/*Displays error for surname input */}
           {errors.surname && <p>{errors.surname}</p>}

         {/*Creates input box for Business Name */}
         <input
           type='text'
           name='companyName'
           placeholder='Enter your company name'
           value={values.companyName}
           onChange={handleChange}
         />

         {/*Displays error for companyName input */}
         {errors.companyName && <p>{errors.companyName}</p>}

       {/*A div is created for each input field */}
           {/*Creates input box for username */}
           <input
           type='text'
           name='BRnumber'
           placeholder='Enter your Business Registration Number'
           value={values.BRnumber}
           onChange={handleChange}
           />

           {/*Displays error for BRnumber input */}
           {errors.BRnumber && <p>{errors.BRnumber}</p>}
               <input 
                   className='form-input'
                   type='text'
                   name='businessLocation'
                   placeholder='Enter your Businesses location'
                   value={values.businessLocation}
                   onChange={handleChange}
               />
           <label>Estimated Annual Revenue</label>
               {/*Creates input box for Estimated Annual Revenue*/}
               <select
               type='text'
               name='estimatedAnnualRevenue'
               placeholder='Enter your estimated Anual Revenue'
               value={values.estimatedAnnualRevenue}
               onChange={handleChange}
               >
               <option value =''></option>
               <option value='1000-10000'>1000 - 10 000</option>
               <option value='11000-50000'>11 000 - 50 000 </option>
               <option value='51000-100000'>51 000 - 100 000</option> 
               <option value='110000-upwards'>110 000 and beyond</option>

               </select>

               {/*Displays error for Business Location input */}
               {errors.estimatedAnnualRevenue && <p>{errors.estimatedAnnualRevenue}</p>}

           {/*A div is created for each input field */}

               {/*Creates label called business Name*/}


               {/*Displays error for Business Location input */}
               {errors.estimatedAnnualRevenue && <p>{errors.estimatedAnnualRevenue}</p>}

               {/*Creates label called business Name*/}
               <label>Sector of Business</label>

               {/*Creates input box for Estimated Annual Revenue*/}
               
               <select
                   type='text'
                   name='sectorOfBusiness'
                   placeholder='Enter your Businesses location'
                   value={values.sectorOfBusiness}
                   onChange={handleChange}
               >
                 <option value =''></option>
                 <option value="Agriculture">Agriculture</option>
                 <option value= "Manufacturing">Manufacturing</option>
                 <option value = "Finance and Business">Finance and Business</option>
                 <option value = "Tourism">Tourism</option>

               </select>
               

               {/*Displays error for Business Location input */}
               {errors.estimatedAnnualRevenue && <p>{errors.estimatedAnnualRevenue}</p>}
       
       <Link to ='/h'>
       Skip
       </Link>
       <input type='submit' onClick={handleSubmit} value="Submit"/>
       

     </form>

      </div>
  );
};

export default FormSignup;