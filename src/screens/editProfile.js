import React, {useState, useEffect} from 'react';
import fire from './fire';
import validate from './validateInfo';
import useForm from './useForm';

// the same as create posts page.
const EditProfileScreen = ()=>{


    const { handleChangeP, values} = useForm(
        validate
      );
    const storage = fire.storage();
    const [image,setImage] = useState(null);
    const [url, setUrl]  = useState('');
    const [userInfo,setUserInfo] = useState([]);

    useEffect(()=>{
        fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
            if(snapshot.exists()){
                 let Items = snapshot.val();
                 let newItems = [];
                 for(let x = 0; x< 1; x++){
                 
                     newItems.push({
                         username: Items.username,
                         surname: Items.surname,
                         type: Items.type,
                         companyName: Items.companyName,
                         profileImage: Items.profileImage,
                         sectorOfBusiness: Items.sector,
                
                             
                     });
             
                 }
                 setUserInfo(newItems);
            }
 
        });
    },[])

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
                userInfo.map(item =>{
                    console.log(item);
                    db.ref(`users/${current.uid}`).set({
                      
                        username: item.username,
                        surname:item.surname,
                        type: item.type,
                        companyName:item.companyName,
                        sector: values.sectorOfBusiness,
                        profileImage: url,
                        companyDescription: values.companyDescription,
                      }).then(()=>{
                        alert('Update Complete',
                        'Your Profile has Successfully been Updated!')
                      });
                  
                })
                
    
              }
              
          
    
            })
        })
    
       }
    
    return(
        <div>
            <div className="Post-main">
            <img width={300} src={url} height={300} alt = "post image"className="post-imageholder"/>
            <div className="edit-input-section">
            <input  type = "file" onChange = {handleChange}  className="file-btn"/><br/>
                <select
                type="text"
                name="sectorOfBusiness"
                value={values.sectorOfBusiness}
                onChange={handleChangeP}
                >
                <option value="" >Select Sector of Interest</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Tourism">Tourism</option>
                <option value="Finances">Finances</option>
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
export default EditProfileScreen;