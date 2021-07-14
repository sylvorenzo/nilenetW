import { useState,useEffect} from 'react';
import fire from './fire';
import {useHistory } from 'react-router-dom'
const useForm = (callback, validate) => {
  //Creates all variables that will be used throughout the project
  const [values, setValues] = useState({
    type: '',
    username: '',
    surname: '',
    companyName:'',
    companyDescription: '',
    numberofEmployees:'',
    sectorOfBusiness:'',
    email: '',
    password: '',
    password2: '',
    user: '',
    projectImage:'',
    projectTitle: '',
    projectStatus:'',
    projectDescription:'',
    projectId: [],
  });

  //states for errors
  const [errors, setErrors] = useState({});

  //Controls whether the button should submit or not
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handles the changes happening within the text boxes
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    
  };

    //handles the changes happening within the text boxes
    const handleChangeP = e => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
  
      
    };

  //submits contents within the investor page the database
  const handleSubmitI = e => {
    e.preventDefault();
    const current = fire.auth().currentUser;
    const db = fire.database();


    setErrors(validate(values));
    setIsSubmitting(true);
    if(current != null){
      db.ref('/users/Investors/' +  current.uid).set({
        title: 'investors',
        username: values.username,
        surname: values.surname,
        companyName: values.companyName,
        estimatedAnnualRevenue: values.estimatedAnnualRevenue,
        sectorOfBusiness: values.sectorOfBusiness,
      }).then(()=>{
        alert("Information has been successfully uploaded to database")
      })
    }
  };

  //Submits entrepreneur data to the database
  const handleSubmit = e => {
    e.preventDefault();
    const current = fire.auth().currentUser;
    const db = fire.database();

    

    setErrors(validate(values));
    setIsSubmitting(true);

    if(current != null){
      db.ref('/users/entrepreneurs/' +  current.uid).set({
        
        username: values.username,
        surname: values.surname,
        companyName: values.companyName,
        BRnumber: values.BRnumber,
        businessLocation: values.businessLocation,
        estimatedAnnualRevenue: values.estimatedAnnualRevenue,
        sectorOfBusiness: values.sectorOfBusiness,
      }).then(()=>{
        alert("Information has been successfully uploaded to database")
      })
    }
  };
  

  //handles the login button
  function HandleLogin(){
    
    setIsSubmitting(true);
    fire.auth().signInWithEmailAndPassword(values.email,values.password).then(()=>{
      alert("You have successfully logged in ");
      setValues({user:fire.auth().currentUser.uid})

    
    }).catch((e)=>{
      alert(e);
    })
    
  }

  // handles the logout functionality
  const handleLogout =(user)=>{
    if(user){
      fire.auth().signOut().then(()=>{
        console.log("user signed out");
       

      });
    }else{
      console.log("this button is not working")
      
    }
  }
  //handles password reset
  const handlePasswordReset= ( email)=>{
      fire.auth().sendPasswordResetEmail(email).then(()=>{
        alert("Email Sent")
      }).catch((e)=>{
        alert(e)
      })
  }

  //handles the sign up functionality
  const handleSignup = ()=>{
    setErrors(validate(values));
    setIsSubmitting(true);
    fire.auth().createUserWithEmailAndPassword(values.email,values.password).then(
      ()=>{
        const db = fire.database()
        
        var user = fire.auth().currentUser;
        db.ref('/users/'+ user.uid).set({
          type: values.type
        }).then(()=>{
          alert("successful upload")
        })
        user.sendEmailVerification().catch((e)=>{
          alert("an error occurred", e)
        }).then(()=>{
          alert("Account Successfully created");
          setValues({user:true});
        })
      }
    )
  }

  //handles the post
  
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return {handleChangeP, handleChange, handleSubmit,values,handleSubmitI, errors, HandleLogin,handleLogout,handleSignup,setValues,handlePasswordReset};
};

export default useForm;