import React,{useState} from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import fire from './fire'

function InvestorProfileEditScreen(){
    const { handleChangeP, values} = useForm(
        validate
      );
    const storage = fire.storage();
    const [image,setImage] = useState(null);
    const [url, setUrl]  = useState('');

    const handleChange = e  =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
 
        }
    }

    const HandleUpload = () =>{

        const UploadTask = storage.ref(`images/${image.name}`).put(image);
        
     
        UploadTask.on("state_changed", snapshot =>{
           
        }, error =>{
            console.log(error )
        },()=>{
            storage.ref("images").child(image.name).getDownloadURL().then(url =>{
                const current = fire.auth().currentUser;
                const db = fire.database();
                var newPostKey = Date.now();           
                setUrl(url);
                
                
        
              if(current != null){
            
                db.ref(`users/investorInfo/${fire.auth().currentUser.uid}`).set({
                  profileImage: url,
                  username: values.username,
                  companyName: values.companyName,
                  companyDescription: values.companyDescription,
                  sectorOfBusiness: values.sectorOfBusiness
                }).then(()=>{
                  alert("Profile Updated");
                });
            
    
              }
              
          
    
            })
        })
    
       }
    
  
    return(
        <div>
        <div className="Post-main">
        <img width={300} src={url} height={300} alt = "post image"className="post-imageholder"/>
        <div className="edit-input-section">
        <input  type = "file" onChange = {handleChange}  className="file-btn"/>
            <input 
                type="text" 
                name="username"
                placeholder="please insert your full name"
                onChange={handleChangeP}
                value={values.username}
                className="post-input"
            />
            <input 
                type="text" 
                name="companyName"
                placeholder="please insert your full name"
                onChange={handleChangeP}
                value={values.companyName}
                className="post-input"
            />
           <select 
                type="text" 
                name="sectorOfBusiness"
                placeholder="please insert your full name"
                onChange={handleChangeP}
                value={values.sectorOfBusiness}
                className="post-input"
            >
                <option value=''> </option>
                <option value="manufacturing">Manufacturing</option>
                <option value="business">Finance and Business</option>
                <option value="tourism">Tourism</option>
            </select>
            <textarea
                name="companyDescription"
                placeholder="Tell us a little bit about your business..."
                onChange={handleChangeP}
                value = {values.companyDescription}
                className='post-textarea' 
            />
            <button onClick={HandleUpload} className="post-btn">Update Profile</button>
        </div>
        </div>
    </div>
    )
}
export default InvestorProfileEditScreen;