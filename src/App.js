import React,{useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './screens/Login';
import fire from './screens/fire';
import FormSignup from './screens/FormSignup';
import InvestorDetails from './screens/regPage';
import FeedScreen from './screens/FeedScreen';
import validate from './screens/validateInfo';
import useForm from './screens/useForm'
import Navigation from './screens/Navigation';
import About from './screens/About';
import ProfileScreen from './screens/profile';
import CreatePostScreen from './screens/createpost';
import Asker from './screens/helpPage';
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
            <Route path ='/entrepreneur' component={FormSignup}/>
            <Route path='/about' component={About}/>
            <Route path = '/investor' component={InvestorDetails}/>
            <Route path = '/feed' component={FeedScreen} />
            <Route path = '/profile' component={ProfileScreen} />
            <Route path = '/help' component={Asker}/>
            <Route path = '/createpost' component ={CreatePostScreen}/>
            <Route path = '/projects' component = {ProjectScreen}/>
            <Route path = '/editprofile' component={EditProfileScreen}/>
            <Route path = '/support' component={Contact}/>
            <Route path = '/finances' component={financeScreen} />
            <Route path = '/opportunities' component = {OpportunitiesScreen}/>
            <Route path = '/iprofileEdit' component ={InvestorProfileEditScreen}/>
            <Route path = '/chat' component = {ChatScreen}/>
          
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
