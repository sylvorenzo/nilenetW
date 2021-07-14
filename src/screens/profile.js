import React, {useEffect, useState, Component } from 'react';
import {  NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import pic3 from '../assets/pic3.jpg';
import fire from './fire';
import pic from '../assets/city.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCogs,faArrowCircleLeft,faTrash} from '@fortawesome/free-solid-svg-icons'


function ProfileScreen(){
   

// create state variables.
   var [items, setItems] = useState([]);
   var [type, setType] = useState('entrepreneur');
   var [typeReader, setTypeReader] = useState('');
   var [Posts, setPosts] = useState([]);
   var [state, setState] = useState('');
   var [entrepreneurPosts, setEntrepreneurPosts] = useState([]);
   var [entrepreneuritems, setEntrepreneurItems] = useState([]);
   const [values, setValues] = useState({
    drawerOpen: false,
    drawerClasses: 'side-drawer-posts'
});

// deletes posts
function deleteContent(projectId){
    fire.database().ref(`posts/entrepreneurs/${fire.auth().currentUser.uid}`).child(projectId).remove().then(alert('Content successfully deleted'));
    fire.database().ref(`public/posts/entrepreneurs`).child(projectId).remove();
}
    // displays side drawer
   const drawerToggleClickHandler = ()=>{
    setValues({
        drawerOpen: true,
        drawerClasses:'side-drawer-posts open'
   });
    }
    // closes side drawer
    const drawerCloser = ()=>{
        setValues({drawerOpen:false});
        setValues({drawerClasses:'side-drawer-posts'});
    }
 //listens for changes
   useEffect(()=>{
       // retreives entrepreneur data and stores it in a state.
       fire.database().ref(`users/entrepreneurInfo/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
           if(snapshot.exists()){
                let Items = snapshot.val();
                let newItems = [];
                for(let x = 0; x< 1; x++){
                
                    newItems.push({
                        username: Items.username,
                        companyName: Items.companyName,
                        profileImage: Items.profileImage,
                        sectorOfBusiness: Items.sectorOfBusiness,
                            
                    });
            
                }
                setItems(items = newItems);
           }

       });
    
       // constant for user unique id
       const current = fire.auth().currentUser.uid;
       // retreives user type data from database
       fire.database().ref(`users/${current}`).on('value', snapshot=>{
           if(snapshot.exists()){
        
            let types = snapshot.val();
            let newType=[];
   
             setType(type = types.type);
             console.log(type);
 
             if(type === 'Entrepreneur'){
                 setTypeReader(typeReader = 'Entrepreneur');
             }else if(type === 'Investor'){
                 setTypeReader(typeReader = '');
             }
           }
       });

       if(type === 'Entrepreneur'){
           // retreives current users posts from database
        fire.database().ref(`posts/entrepreneurs/`).child(`${current}`).on('value',snapshot=>{
            
            if(snapshot.exists()){
                let projectId = Object.values(snapshot.val());
                let newPosts = [];
                let projectChildren = Object.values(projectId).forEach(childsnapshot =>{
           
                  
                      newPosts.push({
                          projectImage: childsnapshot.projectImage,
                          projectId:childsnapshot.id,
                          projectTitle: childsnapshot.projectTitle,
                          projectStatus: childsnapshot.projectStatus,
                          projectDescription: childsnapshot.projectDescription
                      })
                  setState(state = childsnapshot.projectImage);
                  setPosts(Posts = newPosts);
                });
            }
         })
    
         fire.database().ref(`posts/entrepreneurs/${fire.auth().currentUser.uid}`).orderByValue().on('value',snapshot=>{
            
            if(snapshot.exists()){
                let projectId = Object.values(snapshot.val());  
                let newPosts = [];
                let projectChildren = Object.values(projectId).forEach(childsnapshot =>{
           
                  
                      newPosts.push({
                          profileImage: childsnapshot.profileImage,
                          username: childsnapshot.username,
                          projectImage: childsnapshot.projectImage,
                          projectId:childsnapshot.id,
                          projectTitle: childsnapshot.projectTitle,
                          projectStatus: childsnapshot.projectStatus,
                          projectDescription: childsnapshot.projectDescription
                      })
                  
                  setEntrepreneurPosts(entrepreneurPosts = newPosts);
                });                
            }
        })
       }


    fire.database().ref(`users/entrepreneurInfo/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
        if(snapshot.exists()){
            let Items = snapshot.val();
            let newItems = [];
            for(let x = 0; x< 1; x++){
             
                  newItems.push({
                      username: Items.username,
                      profileImage: Items.profileImage,
                  });
          
            }
            setEntrepreneurItems(entrepreneuritems= newItems);
        }

    });
  
   },[])
   



        return(
            <div>
                <div show={values.drawerOpen} className={values.drawerClasses} >
                    <div className="profileView-TopSection">
                        <div className="profileView-back">
                        <h2 className="profileView-icon" onClick={drawerCloser}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                        </h2>
                        </div>
                        <div>
                            <h1>Posts</h1>
                        </div>
                        <div className="profileView-body">
                            {entrepreneurPosts.map(item=>{

                                return(
                                    <div className="postsView" key={item.projectId} >
                                        
                                        <img src={item.projectImage} className="postsView-image" width={200} height={200} />
           
                                        <div className="PostsView-content">
                                            <FontAwesomeIcon icon={faTrash} size="2x" style={{float: 'right',
                                        padding:'5px'}} onClick={()=>deleteContent(item.projectId)}/>
                                            <h4>{item.projectTitle}</h4><br/>
                                            <h6>{item.projectStatus}</h6>
                                            <p>{item.projectDescription}</p>

                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
                
                <div className="profile-content">
                   
                    {items.map(item=>{
                        return(
                            <div>
                                <img src={item.profileImage} alt="profile"  className="profile-pic"/>
                                <h1>{item.username}</h1>
                            </div>

                        )
                    })}
                    <h7>{type}</h7><br/>
        
   
                 


                   <button className="profile-btn">
                       Followers
                   </button>
                   <button className="profile-btn">
                       Following
                   </button>
                   <button className="profile-btn">
                       <NavLink to='/chat'>
                        Message
                       </NavLink>
  
                   </button>
                       {typeReader ?(
                        <button className="profile-btn" >
                        <NavLink to ='/editprofile'>
                            Edit Profile
                        </NavLink>
                     </button> 
                       ):(
                        <button className="profile-btn" >
                            <NavLink to ='/iprofileEdit'>
                                Edit Profile
                            </NavLink>
                         </button>  
                       )
                          
                       }
                </div>
                <div className="profile-postsection">
                <div className="profileView-banner">
                    <div className="profileView-bannerIcon"> <FontAwesomeIcon icon={faCogs} size="2x"/></div>
                    <div className="profileView-bannerTitle"><h4>Projects</h4></div>
                 </div>
                    <div className="profileView-container">
                    
                        {state  ? (
                                
                             <div>
                                {entrepreneurPosts.map((item, index) =>{
                            
                                    return(
                                         <img key={item.projectId} className="profileView-posts" onClick={drawerToggleClickHandler} src={item.projectImage} />
                                    )
                            
                                        
                                })}
                            </div>
                                
                                
                        ):(
                            <div>
                             {entrepreneurPosts.map((item, index) =>{
                            
                                return(
                                    <img key={item.projectId} className="profileView-posts" onClick={drawerToggleClickHandler} src={item.projectImage} />
                                )
                    
                                
                        })}  
                            </div>
                        )
                        
                        }
                    </div>
                </div>
                    
            </div>
        );
        

    
 
    }
export default ProfileScreen;