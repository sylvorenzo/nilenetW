import React,{Component} from 'react';
import fire from './fire';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faArrowCircleRight,faChartArea, faCommentDots} from '@fortawesome/free-solid-svg-icons'
import combination from '../assets/PROJECTS.png';


class ProjectScreen extends Component{

    constructor(props){
        super(props);
        // create states
        this.state = {
            Posts: [],
            items: [],
            Messages:[],
            CurrentMessages:[],
            search: '',
            drawerOpen:false,
            drawerClasses: 'side-drawer',
            uid:'',
            comment:'',
            username:'',
            profileImage:'',
            message:'',
            ChatID:'',
            thisU: `${fire.auth().currentUser.uid}`,
            projectId:''

        }
        //bind this to functions
        this.handleChange= this.handleChange.bind(this);
        this.handleMessage= this.handleMessage.bind(this);
    }
    //handle changes to user input
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    // sends message to the database.
    handleMessage(){
        const CurrentUid = fire.auth().currentUser.uid;
            
        let sessionId = CurrentUid + this.state.uid;
        let alternateSessionId = this.state.uid + CurrentUid;

         
         
        

        var messageId = Date.now();
        var today = new Date();
        var time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0': '') + today.getMinutes());

        fire.database().ref(`chats/users/${CurrentUid}/${sessionId}/${messageId}`).set({

            messageId: messageId,
            chatUid: sessionId,
            message: this.state.message,
            time: time,
            uid: CurrentUid
        });

        fire.database().ref(`chats/${sessionId}/${messageId}`).set({
            messageId: messageId,
            chatUid: sessionId,
            message: this.state.message,
            time: time,
            uid: CurrentUid
        })
        fire.database().ref(`chats/${alternateSessionId}/${messageId}`).set({
            messageId: messageId,
            chatUid: sessionId,
            message: this.state.message,
            time: time,
            uid: CurrentUid
        });
        fetch('https://us-central1-nilenet-c9b39.cloudfunctions.net/user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              tokens: [this.state.token],
              notification:{
                title: `${this.state.username} ${this.state.surname}`,
                body:this.state.message
              }
      
      
            })
          });
       
    }
    // handles and opens first side drawer
    drawerToggleClickHandler = (uid, projectId) => {
        this.setState({drawerOpen: !this.state.drawerOpen});
        this.setState({drawerClasses: 'side-drawer open'});
        this.setState({uid: uid});
        this.setState({projectId: projectId});
                // retrieves chat information and stores it into a state variable.
        fire.database().ref(`chats/${fire.auth().currentUser.uid + this.state.uid}/`).on('value', childshot=>{
            console.log('childshot: ', childshot.val());
        if(childshot.exists()){
        const keys = Object.keys(childshot.val());
            const messageArray = [];
        keys.sort();
        for(let x = 0; x < keys.length;x++){
            
            fire.database().ref(`chats/${fire.auth().currentUser.uid + this.state.uid}/${keys[x]}`).on('value', snap=>{
            if(snap.exists()){
                
                var data = {
                chatUid: snap.val().chatUid,
                time:snap.val().time,
                message: snap.val().message,
                uid: snap.val().uid,
                messagId: snap.val().messageId,
                }
                messageArray[x] = data;
                
                
                
            }
            this.setState({Messages: messageArray});

            })
            
            

            
        
        }
        
            
        
        
            
        }

        
        })
    }
    // closes side drawer
    backdropClickHandler=()=>{
        this.setState({drawerOpen: false});
        this.setState({drawerClasses: 'side-drawer'});
    }

// listens for changes
componentDidMount(){
    fire.database().ref(`mykey/${this.state.uid}`).once('value', snap=>{
        if(snap.exists()){
          this.setState({token:snap.val().token});
        }
      })

    const current = fire.auth().currentUser.uid;
// retrieves posts from database
 fire.database().ref(`public/posts/`).on('value',snapshot=>{
     if(snapshot.exists()){
        let projectId = Object.values(snapshot.val());
        let newPosts = [];
        let projectChildren = Object.values(projectId).forEach(childsnapshot =>{
   
          
              newPosts.push({
                  projectImage: childsnapshot.projectImage,
                  projectId:childsnapshot.id,
                  projectTitle: childsnapshot.projectTitle,
                  projectStatus: childsnapshot.projectStatus,
                  projectDescription: childsnapshot.projectDescription,
                  username: childsnapshot.username,
                  surname: childsnapshot.surname,
                  profileImage: childsnapshot.profileImage,
                  uid: childsnapshot.uid,
              })
          
          this.setState({Posts: newPosts});
           });       
    }

    // retrieves entrepreneur data from database
     fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
        if(snapshot.exists()){
            let Items = snapshot.val();
            this.setState({username: snapshot.val().username});
            this.setState({surname:snapshot.val().surname})
            this.setState({
                username: Items.username,
                profileImage: Items.profileImage
            });
    
           let newItems = [];
           for(let x = 0; x< 1; x++){
                newItems.push({
                username: Items.username,
                surname:Items.surname,
                profileImage: Items.profileImage,
                sectorOfBusiness:Items.sector
                 });
            } 
            this.setState({items: newItems});
        }

    });
    
   // retrieves chat information and stores it into a state variable.
   fire.database().ref(`chats/${fire.auth().currentUser.uid + this.state.uid}/`).on('value', childshot=>{
       console.log('childshot: ', childshot.val());
    if(childshot.exists()){
      const keys = Object.keys(childshot.val());
        const messageArray = [];
      keys.sort();
      for(let x = 0; x < keys.length;x++){
        
        fire.database().ref(`chats/${fire.auth().currentUser.uid + this.state.uid}/${keys[x]}`).on('value', snap=>{
          if(snap.exists()){
            
            var data = {
              chatUid: snap.val().chatUid,
              time:snap.val().time,
              message: snap.val().message,
              uid: snap.val().uid,
              messagId: snap.val().messageId,
            }
            messageArray[x] = data;
            
            
            
          }
        this.setState({Messages: messageArray});

        })
          
        

       
      
      }
      
        
      
     
        
    }

      
  })
    
        
 

  },[])
    }
    render(){
        return(
        <div style={{backgroundColor: 'white',paddingTop:'10px',height:'1500px'}}>
            <div show={this.state.drawerOpen}   className={this.state.drawerClasses}>
                <div className="profileView-TopSection">
                    <div className="profileView-back">
                        <h2 className="profileView-icon" onClick={this.backdropClickHandler}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                        </h2>
                    </div>
                    <div>
                        <h1>Message</h1>
                    </div>
                    <div>
                        {this.state.Posts.map(items=>{
                            if(items.uid === this.state.uid){
                                if(items.projectId === this.state.projectId){
                                    return(
                                        <div style={{overflow:'hidden'}}>
                                        <div style={{display:'inline-block',borderBottom:'0.5px solid black',width:'100%'}}>
                                            <img src={items.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6 style={{color:'black',paddingTop:'15px', marginLeft:'10px'}}>{items.username} {items.surname}</h6>
                                        </div>
                                        <div >
    
                                            </div>
                                            <div className="message-container">
                                                {this.state.Messages.map(text=>{
                                                    console.log('text: ', text.chatUid)
                                                    if(text.chatUid === (this.state.thisU + this.state.uid )){
                                                        if(text.uid === this.state.thisU){
                                                            return(
                                                                <div className="messageReceiver" key={this.state.thisU}>
                                                                    <div className="messageReceiverR">
                                                                        <p>
                                                                            {text.message}
                                                                            <h10
                                                                            style={{float:'right',
                                                                                    paddingRight:'10px'    
                                                                                }}
                                                                            ><br/>
                                                                                {text.time}
                                                                            </h10>
                                                                        
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }else if(text.chatUid ===(this.state.uid + this.state.thisU)){
                                                        if(text.uid === this.state.uid){
                                                            return(
                                                                <div className="messageSender">
                                                                    <div className="messageReceiverS">
                                                                        <p>
                                                                            {text.message}
                                                                            <h10
                                                                                style={{paddingLeft:'10px'}}
                                                                            ><br/>
                                                                                {text.time}
                                                                            </h10>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
    
    
                                                
                                        
                                                })}
                                            </div>
                                            <footer className="message-footer">
                                                <h5>
                                                <input
                                                id="message"
                                                className="message-input"
                                                autoComplete= "off"
                                                type="text"
                                                name="message"
                                                placeholder="Type a message"
                                                onChange={this.handleChange}
                                                value={this.state.value}
    
                                                /> <h3 
                                                        className="message-btn"
                                                        onClick={(e)=>this.handleMessage(e,this.state.uid)}
                                                        ><FontAwesomeIcon 
                                                        icon={faArrowCircleRight} 
                                                        size="2x" 
                                                        color="black"
                                                        
                                                        />
                                                    </h3>
                                                </h5>
                                            </footer>
                                        
                                        </div>
                                        
                                    )
                                }
                               
                            }
                        })}
                    </div>

                </div>

            </div>
            <img src={combination} width={1200} height={600}  style={{pointerEvents:'none', position:'absolute'}}/>
            <div className="feed-search">
                <input type="text" 
                className="feed-input" 
                placeholder="Search..."
                name = "search"
                value = {this.state.search}
                onChange={this.handleChange}
                />
            </div>
            <div className="feed-gradient">

            </div>
        <div className="feed-container" style={{marginTop:'600px'}}>
        {this.state.Posts.map((items, index) =>{

            return(

                    <div className="feed-content" key={index} >
                        {this.state.items.map(item=>{
                            if(items.username.indexOf(this.state.search)>-1){
                                return(
                                    <div style={{display:'inline-block',}}>

                                        <div className="feed-banner">
                                        <img src={items.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6  style={{paddingTop:'15px',paddingLeft:'10px'}}>{items.username} {items.surname}</h6>
                                        </div>
                                        <div style={{display:'inline-block',margin:0}}>
                                        <img className="project-image" src={items.projectImage}  /><br/>
                                        <div style={{display:'inline-block'}}  >
                                        <div>
                                            <h3  onClick={()=>this.drawerToggleClickHandler(items.uid, items.projectId)}
                                                style={{marginLeft:'350px'}}
                                            >
                                                <FontAwesomeIcon icon={faCommentDots} color="orange" size={90}/>
                                            </h3> 
                                        </div>
                                        <h5>{items.projectTitle}</h5>
                                        <h8>{items.projectStatus}</h8>
                                        <p>{items.projectDescription}</p>
                                        </div>
                                        </div>                           
                                    </div>
                                    
                                )
                            }else if(this.state.search === ''){
                                return(
                                    <div style={{display:'inline-block',}}>

                                        <div className="feed-banner">
                                        <img src={items.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6  style={{paddingTop:'15px',paddingLeft:'10px'}}>{items.username} {items.surname}</h6>
                                        </div>
                                        <div style={{display:'inline-block',margin:0}}>
                                        <img className="project-image" src={items.projectImage}  /><br/>
                                        <div style={{display:'inline-block'}}  >
                                        <div>
                                            <input type="submit"  onClick={()=>this.drawerToggleClickHandler(items.uid, items.projectId)}></input>
                                        </div>
                                        <h5>{items.projectTitle}</h5>
                                        <h8>{items.projectStatus}</h8>
                                        <p>{items.projectDescription}</p>
                                        </div>
                                        </div>                           
                                    </div>
                                    
                                )
                            }
                            
                               
                            

                        })}
                        
                    </div>

            
            )
        
            
        })}
    
        </div>
        <div className="feed-gradient-footer">

        </div>
    
    </div>
        )
    }
}
export default ProjectScreen;
