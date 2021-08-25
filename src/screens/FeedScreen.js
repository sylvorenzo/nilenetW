import React, { Component } from 'react';
import fire from './fire';
import Chart from 'react-google-charts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faCogs,faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
class FeedScreen extends Component{
constructor(props){
  super(props);

  // create states to store data retrieved from database and user input.
  this.state = {
      items: [],
      ProjectPosts: [],
      images: [],
      id: [],
      typeDetermine:[],
      projectTitle: [],
      projectStatus: [],
      projectDescription: [],
      tag: [],
      datapoints: [],
      search: null,
      query: [],
      sectorOfBusiness:'',
      users:[],
      drawerOpen:false,
      drawerClasses: 'side-drawer',
      key:'',
      drawerOpen1: false,
      drawerClasses1: 'side-drawer-posts',
      drawerOpen2: false,
      drawerClasses2: 'side-drawer-message',
      postkey: '',
      Messages:[],
      message:'',
      ChatID:'',
      thisU: `${fire.auth().currentUser.uid}`,
      uid:'',
      status:'Add Contact',
  }

  // bind this to all functions
  this.handleChange= this.handleChange.bind(this);
  this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
  this.drawerCloser = this.drawerCloser.bind(this);
  this.drawerToggleClickHandler1 = this.drawerToggleClickHandler1.bind(this);
  this.drawerToggleClickHandler2 = this.drawerToggleClickHandler2.bind(this);
  this.drawerCloser1 = this.drawerCloser1.bind(this);
  this.handleMessage= this.handleMessage.bind(this);
  this.backdropClickHandler= this.backdropClickHandler.bind(this);
  this.handleFollow = this.handleFollow.bind(this);

}

//handles follow functionality
handleFollow(uid,username,profileImage){
  
  if(this.state.status === 'Add Contact'){

    // stores follower in the contacts section of database of the current user
    fire.database().ref(`contacts/${fire.auth().currentUser.uid}/${this.state.key}`).set({
      uid: uid,
      username: username,
      profileImage: profileImage,
    }).then(this.setState({status: 'Added'}));
  }


  if(this.state.status === 'Added'){
    // if the user unfollows their information is removed from the database.
    fire.database().ref(`contacts/${fire.auth().currentUser.uid}/${this.state.key}`).remove().then(this.setState({status: 'Add Contact'}))
  }
}

//handles message functionality
handleMessage(e,parsedUid){
  const CurrentUid = fire.auth().currentUser.uid;
      
  let sessionId = CurrentUid + this.state.key;
  let alternateSessionId = this.state.key + CurrentUid;

   
   
  

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
//handles change for user input
handleChange(event){
  this.setState({
      [event.target.name]: event.target.value
  })

}

//opens a side drawer where user information can be viewed.
drawerToggleClickHandler = (userid) => {
  this.setState({drawerOpen: !this.state.drawerOpen});
  this.setState({drawerClasses:'side-drawer open'});
  this.setState({key:userid});
  console.log(this.state.key);


}
//opens a side drawer where user posts can be viewed.
drawerToggleClickHandler1 = (uid) => {
  this.setState({postkey: uid})
  this.setState({drawerOpen:false});
  this.setState({drawerClasses:'side-drawer'});
  this.setState({drawerOpen1: !this.state.drawerOpen1});
  this.setState({drawerClasses1:'side-drawer-posts open'});



}
//opens side drawer where the user can chat to the specific individual.
drawerToggleClickHandler2 = (variable) => {
  
  this.setState({drawerOpen: false});
  this.setState({drawerClasses:'side-drawer'});
  this.setState({drawerOpen2: !this.state.drawerOpen2});
  this.setState({drawerClasses2:'side-drawer-message open'});



}
// closes chat side drawer
backdropClickHandler=()=>{
  this.setState({drawerOpen2: false});
  this.setState({drawerClasses2: 'side-drawer-message'});
}

//closes information viewer side drawer
drawerCloser = ()=>{
  this.setState({drawerOpen:false});
  this.setState({drawerClasses:'side-drawer'});

}
//closes posts side drawer.
drawerCloser1 = ()=>{
  this.setState({drawerOpen1:false});
  this.setState({drawerClasses1:'side-drawer-posts'});
}




componentDidMount(){


  // retrieves chat information and stores it into a state variable.
  fire.database().ref(`chats/`).on('value', snapshot=>{
        
    let sessionId = Object.keys(snapshot.val());
    console.log(sessionId);
    var extensionArray = [];

        Object.values(sessionId).map(items=>{
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
})

// retrieves entrepreneur Information and then stores it into a state.
  fire.database().ref(`users/`).on('value', snapshot =>{
    
    if(snapshot.exists()){
        let userInfo = snapshot.val();
        let userKeys = Object.keys(userInfo);
        const extensionArray = [];
      for(let x = 0; x< userKeys.length; x++){
        
        var key = userKeys[x];
        var array = [userInfo[key]];
        array.map(item=>{
          let newItems=[];
          newItems.push({
            id:userKeys[x],
            profileImage: item.profileImage,
            username: item.username,
            surname: item.surname,
            companyName: item.companyName,
            companyDescription: item.companyDescription
            
          })
          extensionArray[x] = newItems;
          this.setState({users:extensionArray});
        })
            
    
      }    
    }
  });

  const current = fire.auth().currentUser.uid;
  const db = fire.database();
  
  //retreives user type from database.
  db.ref(`users/${current}`).on('value', snapshot=>{

    if(snapshot.exists()){
      let item = snapshot.val();
  

      if(item.type === 'Entrepreneur'){
        db.ref(`users/${current}`).on('value', snapshot=>{
          let Item = snapshot.val();
          this.setState({sectorOfBusiness:Item.sectorOfBusiness});
          console.log(this.state.sectorOfBusiness);
    
        })
      }else if(item.type === 'Investor'){
        db.ref(`users/${current}`).on('value', snapshot=>{
          this.setState({sectorOfBusiness: snapshot.val().sectorOfBusiness});
          console.log(this.state.sectorOfBusiness);
        })
      }
    }
  })



    // retrieves charts data and stores it in a state.
    db.ref(`charts`).on('value', snapshot=>{
      if(snapshot.exists()){
        var chartValues = snapshot.val();
        let chartItems = Object.keys(snapshot.val());
        console.log(chartItems.length);
        let extensionArray = [];
        for (var x = 0; x < chartItems.length; x++){
  
         var key = chartItems[x];
         var array = [chartValues[key]];
  
         console.log(chartItems);
         console.log(array);
         
            array.map(item =>{
              let NewItems =[];
              NewItems.push({
    
                id: chartItems[x],
                point1: item.point1,
                point2: item.point2,
                point3: item.point3,
                tag1: item.tag1,
                tag2: item.tag2,
                tag3: item.tag3,
                sectorOfBusiness: item.sectorOfBusiness,
              })
              extensionArray = [...extensionArray, NewItems];
              this.setState({query: extensionArray});
            })
        }
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

    })



}
render(){
  return(
    <div >
      <div className="feed-search">
        <input type="text" 
        name="search"
        className="feed-input" 
        placeholder="Search..."
        value={this.state.search}
        onChange={this.handleChange}
        />
      </div>
      <div show={this.state.drawerOpen2}   className={this.state.drawerClasses2}>
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
                        {//maps user data to the frontend
                        this.state.users.map(items=>items.map(value=>{
                          console.log(value.id);
                            if(value.id === this.state.key){

                                return(
                                    <div style={{overflow:'hidden'}}>
                                    <div style={{display:'inline-block',borderBottom:'0.5px solid black',width:'100%'}}>
                                        <img src={value.profileImage} alt="profile" className="feed-profile"/> 
                                        <h6 style={{color:'black'}}>{value.username}</h6>
                                    </div>
                                    <div >

                                        </div>
                                        <div className="message-container">
                                            {//maps messages to the front End
                                            this.state.Messages.map(item=> item.map(text=>{
                                                if(text.chatUid === (this.state.thisU + this.state.key )){
                                                    if(text.uid === this.state.thisU){
                                                        return(
                                                            <div className="messageReceiver" key={this.state.thisU}>
                                                                <div className="messageReceiverR" >
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
                                                }else if(text.chatUid ===(this.state.key + this.state.thisU)){
                                                    if(text.uid === this.state.key){
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
                        }))}
                    </div>

                </div>
      </div>
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
                    <img alt= "project" src={item.projectImage} 
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
          while(variable.id === this.state.key){
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
                  <button className="profile-btn" onClick={()=>this.drawerToggleClickHandler2(variable.id)}>
                    Message
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




      <div className="feed-gradient">

      </div>
      <div className="feed-container">

 
        {this.state.query.map(items=>items.map((value,index)=>{
            if(this.state.search > -1 ){
              return(
                <div className="feed-content" key={value.id}>
                  {this.state.users.map(user=>user.map(variable=>{
                    if(value.id === variable.id){

                      return(
                        <div>
                        <div style={{display:'inline-block'}} >
                          <img src={variable.profileImage} alt="profile" className="feed-profile"/>
                          <span><h6 onClick={()=>this.drawerToggleClickHandler(value.id)}>{variable.username} {variable.surname}</h6></span><br/>
                        </div>
                        <div style={{display:'inline-block'}}>
                            <Chart
                              chartType="PieChart"
                              width={400}
                              height={400}
                              loading={<div>Loadiing Chart...</div>}         
                              data={[["labels","percentages"],
                              [value.tag1,value.point1],
                              [value.tag2,value.point2],
                              [value.tag3, value.point3]
                          ]}
                          options={{title: 'Overview of Business'}}
                            />
                            <h6>{variable.companyName}</h6><br/>
                            <p>{variable.companyDescription}</p>
                            </div>
                        </div>
                      )
                    }

                  }))}

                  
                </div>

              )
            }else if(this.state.search > -1){
              console.log(Object.values(value)[index]);
              return(
                <div className="feed-content" key={value.id}>
                {this.state.users.map(user=>user.map(variable=>{
                    console.log(user);
                    if(value.id === variable.id){
                      return(
                        <div style={{display:'inline-block'}}>
                          <img  
                          src={variable.profileImage} 
                          alt="profile" 
                          className="feed-profile"
                          onClick={()=>this.drawerToggleClickHandler(value.id)}
                          />
                          <span><h6 onClick={()=>this.drawerToggleClickHandler(value.id)}>{variable.username} {variable.surname}</h6></span><br/>
                        </div>
                      )
                    }

                  }))}
                <div style={{display:'inline-block'}}>
                <Chart
                  chartType="PieChart"
                  width={400}
                  height={400}
                  loading={<div>Loadiing Chart...</div>}         
                  data={[["labels","percentages"],
                  [value.tag1,value.point1],
                  [value.tag2,value.point2],
                  [value.tag3, value.point3]
              ]}
              options={{title: 'Overview of Business'}}
                />
                </div>

                </div>

              )
            }
        })

        )}

          
      </div>
      <div className="feed-gradient-footer">
      </div>

    </div>
  );
}

}
export default FeedScreen;