import React,{Component} from 'react';
import fire from './fire';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'

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
            thisU: `${fire.auth().currentUser.uid}`

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
    handleMessage(e,parsedUid){
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
        })
       
    }
    // handles and opens first side drawer
    drawerToggleClickHandler = (projectId) => {
        this.setState({drawerOpen: !this.state.drawerOpen});
        this.setState({drawerClasses: 'side-drawer open'});
        this.setState({uid: projectId});
    }
    // closes side drawer
    backdropClickHandler=()=>{
        this.setState({drawerOpen: false});
        this.setState({drawerClasses: 'side-drawer'});
    }

// listens for changes
componentDidMount(){


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
    
    // retrieves chats from database
    fire.database().ref(`chats/`).on('value', snapshot=>{
        if(snapshot.exists()){
            let sessionId = Object.keys(snapshot.val());
            console.log(sessionId);
            var extensionArray = [];
     
                let messageId = Object.values(sessionId).map(items=>{
                    console.log(items);
                    fire.database().ref(`chats/${items}/`).on('value', childshot=>{

                        Object.values(childshot.val()).map(items=>{
                            console.log(items.message);
                            let messages = [];
                            messages.push({
                                chatUid: items.chatUid,
                                message: items.message,
                                time: items.time,
                                messageId: items.messageId,
                                uid: items.uid
                            })
                            extensionArray = [...extensionArray, messages];
                            this.setState({Messages: extensionArray});
                        })
                   

                    
                
                    })
                });
        }        

    })
    
        
 

  },[])
    }
    render(){
        return(
        <div>
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

                                return(
                                    <div style={{overflow:'hidden'}}>
                                    <div style={{display:'inline-block',borderBottom:'0.5px solid black',width:'100%'}}>
                                        <img src={items.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6 style={{color:'black'}}>{items.username} {items.surname}</h6>
                                    </div>
                                    <div >

                                        </div>
                                        <div className="message-container">
                                            {this.state.Messages.map(item=> item.map(text=>{
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


                                            
                                    
                                            }))}
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
                        })}
                    </div>

                </div>

            </div>
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
        <div className="feed-container" >
        {this.state.Posts.map((items, index) =>{

            return(

                    <div className="feed-content" key={index} >
                        {this.state.items.map(item=>{
                            
                            if(item.sectorOfBusiness.indexOf(this.state.search)> -1){
                                return(
                                    <div style={{display:'inline-block',}}>
                                        <div className="feed-banner">
                                        <img src={items.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6>{items.username}</h6>
                                        </div>
                                        <div style={{display:'inline-block',margin:0}}>
                                        <img className="project-image" src={items.projectImage} key={items.uid} /><br/>
                                        <div style={{display:'inline-block'}} key={items.uid} >
                                        <div>
                                            <input type="submit" value="Message" onClick={()=>this.drawerToggleClickHandler(items.uid)} />
                                        </div>
                                        <h5 key={items.uid} >{items.projectTitle}</h5>
                                        <h8 key={items.uid} >{items.projectStatus}</h8>
                                        <p key={items.uid} >{items.projectDescription}</p>
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
    
    
    </div>
        )
    }
}
export default ProjectScreen;
