import React,{Component} from 'react';
import fire from './fire';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleRight,faArrowCircleLeft, faCogs} from '@fortawesome/free-solid-svg-icons';




class ChatScreen extends Component{

    constructor(props){
        super(props);
// create states to store data from the database.
        this.state = {

            contacts:[],
            conversationkey:'',
            alternateConversationkey:'',
            messages: [],
            key: '',
            message:'',
            thisU: `${fire.auth().currentUser.uid}`,
            search:'',
            drawerOpen:false,
            drawerClasses: 'side-drawer',
            drawerOpen1: false,
            drawerClasses1: 'side-drawer-posts',
            ProjectPosts: [],
            users:[],
            status:'Follow',
            token:'',
            username:'',
            surname:'',
        }

        this.handleSession = this.handleSession.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      // retrieves parsed users token from database.
      fire.database().ref(`mykey/${this.state.key}`).once('value', snap=>{
        if(snap.exists()){
          this.setState({token:snap.val().token});
        }
      })

        // retrieves profile information from database.
        fire.database().ref(`contacts/${fire.auth().currentUser.uid}`).on('value', snapshot=>{
            
            if(snapshot.exists()){

                var extensionArray = [];
                
                Object.values(snapshot.val()).forEach(item=>{
                    let contactItems = [];

                    contactItems.push({
                        profileImage: item.profileImage,
                        uid: item.uid,
                        username: item.username,
                    });
                        extensionArray = [...extensionArray, contactItems]
                    this.setState({contacts: extensionArray});
                    console.log(this.state.contacts);
                })
            }
        })

        //retrieves chats from database.
        fire.database().ref(`chats/`).on('value', snapshot=>{
        
            if(snapshot.exists()){
                let sessionId = Object.keys(snapshot.val());
            
                var extensionArray = [];
            
                    Object.values(sessionId).map(items=>{
                    
                        fire.database().ref(`chats/${items}/`).on('value', childshot=>{
            
                            Object.values(childshot.val()).map(items=>{
        
                                let messages = [];
                                messages.push({
                                    chatUid: items.chatUid,
                                    message: items.message,
                                    time: items.time,
                                    messageId: items.messageId,
                                    uid: items.uid
                                })
                                extensionArray = [...extensionArray, messages];
                                this.setState({messages: extensionArray});
                            })
                       
            
                        
                    
                        })
                    });
            }
        })

            // retrieves posts from database and stores it in a state
    fire.database().ref(`posts/entrepreneurs/${this.state.key}`).on('value', snapshot=>{
        if(snapshot.exists()){
          let postValues = snapshot.val();
          let postKeys = Object.keys(postValues);
      
          var extensionArray = [];
            let newItems = [];
          for(let x = 0; x < postKeys.length; x++){
            var keys = postKeys[x];
    
            var parentkey = Object.values(postValues[keys]);
      
            parentkey.map(item=>{
                newItems.push({
                  profileImage: item.profileImage,
                  username: item.username,
                  projectImage: item.projectImage,
                  projectId:item.id,
                  uid: item.uid,
                  projectTitle: item.projectTitle,
                  projectStatus: item.projectStatus,
                  projectDescription: item.projectDescription
                })
                extensionArray = [...extensionArray, newItems];
                this.setState({ProjectPosts: newItems});
            })
          }
        }
  
      });
      //retrieves entrepreneur Information and then stores it into a state.
  fire.database().ref(`users/`).on('value', snapshot =>{
    
    if(snapshot.exists()){
        let userInfo = snapshot.val();
        let userKeys = Object.keys(userInfo);
        let extensionArray = [];
      for(let x = 0; x< userKeys.length; x++){
        
        var key = userKeys[x];
        var array = [userInfo[key]];
        array.map(item=>{
          let newItems=[];
          newItems.push({
            id:userKeys[x],
            profileImage: item.profileImage,
            username: item.username,
            companyName: item.companyName
          })
          extensionArray = [...extensionArray, newItems];
          this.setState({users:extensionArray});
        })
            
    
      }    
    }
  });
  fire.database().ref(`users/${fire.auth().currentUser.uid}`).once('value', snapshot =>{
    if(snapshot.exists()){
         const Items = snapshot.val();
         this.setState({username:Items.username});
         this.setState({surname:Items.surname});
         
         
         
        
    }

});

  
}

    // displays user specific chats.
    handleSession(id){
        const current = fire.auth().currentUser.uid;

        this.setState({key: id});
   

        var key = current + id;
        var altKey = id + current;
        this.setState({conversationkey: key});
        this.setState({alternateConversationkey: altKey});

      



    }
    //handles input from text box and stores into appropriate state variable.
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
      
      }


      //handles the message functionality.
    handleMessage(){
        const CurrentUid = fire.auth().currentUser.uid;
            
      
         
        let sessionId = CurrentUid + this.state.key;
        let alternateSessionId = this.state.key + CurrentUid;
        
      
        var messageId = Date.now();
        var today = new Date();
        var time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0': '') + today.getMinutes());

        //stores message in database
        fire.database().ref(`chats/${sessionId}/${messageId}`).set({
            messageId: messageId,
            chatUid: sessionId,
            message: this.state.message,
            time: time,
            uid: CurrentUid
        })

        //stores message in alternate database.
        fire.database().ref(`chats/${alternateSessionId}/${messageId}`).set({
            messageId: messageId,
            chatUid: sessionId,
            message: this.state.message,
            time: time,
            uid: CurrentUid
        });
        // Uses cloud messaging API.
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
    //opens a side drawer where user information can be viewed.
    drawerToggleClickHandler = (userid) => {
    this.setState({drawerOpen: !this.state.drawerOpen});
    this.setState({drawerClasses:'side-drawer open'});
    this.setState({key:userid});
  }
//closes information viewer side drawer
drawerCloser = ()=>{
    this.setState({drawerOpen:false});
    this.setState({drawerClasses:'side-drawer'});
  }
  //handles follow functionality
handleFollow(uid,username,profileImage){
  
    if(this.state.status === 'Follow'){
  
      // stores follower in the contacts section of database of the current user
      fire.database().ref(`contacts/${fire.auth().currentUser.uid}/${this.state.key}`).set({
        uid: uid,
        username: username,
        profileImage: profileImage,
      }).then(this.setState({status: 'Following'}));
    }
  
  
    if(this.state.status === 'Following'){
      // if the user unfollows their information is removed from the database.
      fire.database().ref(`contacts/${fire.auth().currentUser.uid}/${this.state.key}`).remove().then(this.setState({status: 'Follow'}))
    }
  }

  //opens a side drawer where user posts can be viewed.
drawerToggleClickHandler1 = (uid) => {
    this.setState({postkey: uid})
    this.setState({drawerOpen:false});
    this.setState({drawerClasses:'side-drawer'});
    this.setState({drawerOpen1: !this.state.drawerOpen1});
    this.setState({drawerClasses1:'side-drawer-posts open'});
  
  
  
  }
  //closes posts side drawer.
drawerCloser1 = ()=>{
    this.setState({drawerOpen1:false});
    this.setState({drawerClasses1:'side-drawer-posts'});
  }
    render(){
        return(
            <div>
                 <div show={this.state.drawerOpen1} className={this.state.drawerClasses1} >
                    <div className="profileView-TopSection">
          <div className="profileView-back">
            <h2 className="profileView-icon" onClick={this.drawerCloser1}>
              <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
            </h2>
          </div>
          <div>
            <h1>Posts</h1>
          </div>
          <div className="profileView-body">
          {//displays posts to the Front End.
            this.state.ProjectPosts.map(item=>{
              if(this.state.postkey === item.uid){
                return(
                  <div className="postsView" key={item.projectId} >                    
                    <img src={item.projectImage} 
                      className="postsView-image" 
                      width={200} 
                      height={200} 
                    />
                    <div className="PostsView-content">
                      <h4>{item.projectTitle}</h4><br/>
                      <h6>{item.projectStatus}</h6>
                      <p>{item.projectDescription}</p>
                    </div>
                  </div>
                )
              }
          })}
        </div>
      </div>
    </div>
    <div show={this.state.drawerOpen}  className={this.state.drawerClasses}>
      <div className="profile-content">

      {this.state.users.map(user=>user.map(variable=>{
        for(let x = 0; x < this.state.users.length; x++){
          var key = this.state.users[x];
          console.log(key);
          while(variable.id == this.state.key){
            return(
              <div>
                <div className="profileView-TopSection">
                <div className="profileView-back">
                  <h2 className="profileView-icon" onClick={this.drawerCloser}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                  </h2>
                </div>
                <div>
                  <h1>{variable.companyName}</h1>
                </div>
                </div>

                <div className="profileView-body">
                  <img src={variable.profileImage} alt="profile" key={variable.id} className="profile-pic"/>
                  <h1>{variable.username}</h1>
                  <div className="profileView-followerSection">
                  <button className="profile-btn" onClick={()=>this.handleFollow(variable.id, variable.username,variable.profileImage)}>
                    {this.state.status}
                  </button>
                  </div>
                  <div className="profileView-postSection">

                      <div className="profileView-banner">
                        <div className="profileView-bannerIcon"> <FontAwesomeIcon icon={faCogs} size="2x"/></div>
                        <div className="profileView-bannerTitle"><h4>Projects</h4></div>
                      </div>
                      <div className="profileView-container">
                      {this.state.ProjectPosts.map(post=>{
                        if(variable.id === post.uid){
                          return(
                        
                            <img className="profileView-posts" src={post.projectImage} onClick={()=>this.drawerToggleClickHandler1(post.uid)}/>  
                          ) 
                        }
                                              
                      })}
                     </div>
                  </div>
                </div>
              </div>
            )            
          }
        }

    }))}
      </div>
      </div>
                <div className="contacts-section">
                    <div className="contacts-banner">
                        <h1> Contacts</h1>
                        <div>
                            <input 
                            type="text"
                            name="search"
                            className="chat-search"
                            placeholder="Search..."
                            onChange={this.handleChange}
                            value={this.state.search} //displays user input
                            />
                        </div>
                    </div>
                   {
                       //maps out data retrieved from database to the frontEnd.
                       this.state.contacts.map(items=>items.map(item=>{
                           if(item.username.indexOf(this.state.search)>-1){
                            return(
                                <div className="contact">
                                    <div className="chat-profile-container">
                                    <img className="chat-profile" src={item.profileImage} 
                                        onClick={()=>this.drawerToggleClickHandler(item.uid)}/>
                                    </div>
                                    <div className="chat-content-container" 
                                        onClick={()=>this.handleSession(item.uid)}>
                                        <h4>{item.username}</h4>
                                    </div>
                                </div>
                            )
                           }
                       }))
                   }
                </div>

                <div className="chats-section">
                    <div className="chats-banner">
                        <h1>Chats</h1>
                    </div>
                    <div className="message-container">
                        
                        {// maps out messages the current users' messages
                        this.state.messages.map(item=> item.map(text=>{
                            if(text.chatUid === (this.state.conversationkey )){
                                if(text.uid === this.state.thisU){
                                    return(
                                        <div className="messageReceiver" key={`${fire.auth().currentUser.uid}`}>
                                            <div className="messageReceiverR">
                                                <p>
                                                    {text.message}
                                                    <h10
                                                        style={{float:'right',
                                                                paddingRight:'10px'    
                                                                }}
                                                    >
                                                    <br/>
                                                        {text.time}
                                                    </h10>
                                                                    
                                                </p>
                                            </div>
                                        </div>
                                    )
                            }// maps out the other users' messages.
                            }else if(text.chatUid === this.state.alternateConversationkey){
                                    if(text.uid === this.state.key){
                                        return(
                                            <div className="messageSender" key={this.state.key}>
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
                                value={this.state.message}

                            /> 
                            <h3 
                                className="message-btn"
                                onClick={()=>this.handleMessage()}
                            ><FontAwesomeIcon 
                                icon={faArrowCircleRight} 
                                size="2x" 
                                color="black"                        
                            />
                            </h3>
                        </h5>
                    </footer>    
                </div>
            </div>
        )
    }
}
export default ChatScreen;