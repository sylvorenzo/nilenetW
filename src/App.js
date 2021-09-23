import React,{useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './screens/Login';
import fire from './screens/fire';
import InvestorDetails from './screens/regPage';
import FeedScreen from './screens/FeedScreen';
import validate from './screens/validateInfo';
import useForm from './screens/useForm'
import Navigation from './screens/Navigation';
import ProfileScreen from './screens/profile';
import CreatePostScreen from './screens/createpost';
import HomeScreen from './screens/Home';
import MyBusinessScreen from './screens/mybusiness';
import ResourceScreen from './screens/resources';
import ProjectScreen from './screens/projects';
import EditProfileScreen from './screens/editProfile';
import Contact from './screens/Contact';
import financeScreen from './screens/finances';
import OpportunitiesScreen from './screens/opportunities';
import InvestorProfileEditScreen from './screens/investorProfileEdit';
import ChatScreen from './screens/chat';
import BusinessContent from './screens/businessRegistration';
import ToolsForSuccess from './screens/tools';
import CopyrightContent from './screens/copyright';
import 'firebase/messaging';

function App() {
  //calls functions from useForm
  const {  values,setValues} = useForm(

    validate
  );


// listens for changes
  const authListener = ()=>{
   
   
      fire.auth().onAuthStateChanged((currentuser)=>{
        //console.log(currentuser);
          if(currentuser){
              setValues({user:currentuser});
          }else{
              setValues({user:null})
          }
      })
  }

  // listens for changes
  useEffect(()=>{
      authListener();
     fire.messaging().onMessage(payload=>{
       console.log('message received: ', payload);
     });
     // Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
  fire.messaging().getToken({ vapidKey: 'BCYAk5dwxsnlsXR5c1Mdx-qhzRHnjKUddeca7Q6Y6MFnTBC6P9uWjhPE1VuHT_Vle9tGCoDjhEFm93ZQGQmxGno' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log('current token: ', currentToken);
      fire.database().ref(`mykey/${fire.auth().currentUser.uid}`).set({
        token:currentToken,
      })
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
    
  },[])

  
    return(
      
    <div className='main'>
      
      {// if theres a user value routes would be displayed
      values.user ? (
        <Router>
          <Navigation/>
          <Switch>
            <Route path ='/'  exact component={HomeScreen}/>
            <Route path = '/mybusiness' component = {MyBusinessScreen}/>
            <Route path = '/resources' component ={ResourceScreen}/>
            <Route path = '/investor' component={InvestorDetails}/>
            <Route path = '/feed' component={FeedScreen} />
            <Route path = '/profile' component={ProfileScreen} />
            <Route path = '/createpost' component ={CreatePostScreen}/>
            <Route path = '/projects' component = {ProjectScreen}/>
            <Route path = '/editprofile' component={EditProfileScreen}/>
            <Route path = '/support' component={Contact}/>
            <Route path = '/finances' component={financeScreen} />
            <Route path = '/opportunities' component = {OpportunitiesScreen}/>
            <Route path = '/iprofileEdit' component ={InvestorProfileEditScreen}/>
            <Route path = '/chat' component = {ChatScreen}/>
            <Route path = '/register' component = {BusinessContent}/>
            <Route path = '/tools' component = {ToolsForSuccess}/>
            <Route path = '/copyright' component = {CopyrightContent}/>
          
          </Switch>
           
        </Router>
   
      
      ):(
       
        // sign in and sign up page displayed.
        <Login/>
    
      )}
    </div>

    )
  }

export default App;
