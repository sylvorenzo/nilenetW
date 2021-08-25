import React, { useEffect, useState} from 'react';
import fire from './fire';
import validate from './validateInfo';
import useForm from './useForm';




const CreatePostScreen = ()=>{
    //calls functions from UseForm page
    const { handleChangeP, values} = useForm(

        validate
      );
  // create constant variable to store images
    const storage = fire.storage();
    // create states
    const [image,setImage] = useState(null);
    var [urlf, setUrl]  = useState('');
    var [items, setItems] = useState([]);

    
    const [projectKey, setProjectKey] = useState([]);

    //handles file changes
   const handleChange = e  =>{
       if(e.target.files[0]){
           setImage(e.target.files[0]);

       }
   }

   //uploads data to the database.
   const HandleUpload = () =>{

    // stores image in the images directory
    const UploadTask = storage.ref(`images/${image.name}`).put(image);
    
 
    UploadTask.on("state_changed", snapshot =>{
       
    }, error =>{
      //logs error
        console.log(error )
    },()=>{
      //gets url of image
        storage.ref("images").child(image.name).getDownloadURL().then(url =>{
            const current = fire.auth().currentUser;
            const db = fire.database();
            var newPostKey = Date.now();
            setProjectKey(projectKey=>[...projectKey, newPostKey]);            
            setUrl(urlf = url);
            
            
    
          if(current != null){
            //stores information in database
            db.ref(`posts/entrepreneurs/${current.uid}/${newPostKey}`).set({
              id: newPostKey,
              projectImage: urlf,
              uid: current.uid,
              projectTitle: values.projectTitle,
              projectStatus: values.projectStatus,
              projectDescription: values.projectDescription,
              username: items[0].username,
              surname:items[0].surname,
              profileImage: items[0].profileImage
            }).then(()=>{
              alert("Post successfully created")
            });

            db.ref(`public/posts/${newPostKey}`).set({
              id: newPostKey,
              projectImage: urlf,
              projectTitle: values.projectTitle,
              projectStatus: values.projectStatus,
              uid: current.uid,
              projectDescription: values.projectDescription,
              username: items[0].username,
              surname: items[0].surname,
              profileImage: items[0].profileImage
            })
        

          }
        });
        
    })
  
   }

   // listens for changes 
 useEffect(()=>{
   //retrieves data from database and stores it in a state
  fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
    if(snapshot.exists()){
      let Items = snapshot.val();
      let newItems = [];
      for(let x = 0; x< 1; x++){
    
      newItems.push({
        username: Items.username,
        surname: Items.surname,
        profileImage: Items.profileImage,    
     });
    }
    setItems(items = newItems);
  }

});
 },[])
    
    

    return(
        <div>
            <div className="Post-main">
            <h1>Create Post</h1>
            <img width={300} height={300} src={urlf} alt = "post image"className="post-imageholder"/>
              <div className="input-section">
              <input  type = "file" onChange = {handleChange}  className="file-btn"/>
                <br/>
                <input 
                name = "projectTitle"
                type = "text"
                onChange ={handleChangeP} 
                value = {values.projectTitle}
                className="post-input"
                placeholder = "Enter Project Name" />
                <br/>
                <select
                  name="projectStatus"
                  type="text"
                  value={values.projectStatus}
                  className="post-input"

                >
                  <option value="">Select Project Status</option>
                  <option value="Beginning Stages">Beginning Stages</option>
                  <option value="Project In Development">Project In Development</option>
                </select><br/>
              
                <textarea
                name = "projectDescription"
                type = "text"
                onChange ={handleChangeP} 
                value = {values.projectDescription}
                className="post-textarea"
                placeholder = "Tell Us more about your Project" />
                <br/>
                <button onClick={HandleUpload} className="post-btn">Upload Post</button>
              </div>

            
            </div>

        </div>
    );
}
export default CreatePostScreen;
