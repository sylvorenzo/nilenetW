import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem, Navbar} from 'reactstrap';
import {Nav} from 'react-bootstrap';
import logo from '../assets/nilenet.png' ;
import validate from './validateInfo';
import useForm from './useForm';
import fire from './fire';
import '../components/styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, 
  faUserCircle, 
  faSignOutAlt,
  faWindowRestore, 
  faHome,
  faWrench,
  faChartPie, 
  faChartLine, 
  faTh, 
  faPlusCircle,
  faCogs} from '@fortawesome/free-solid-svg-icons'




const Navigation = () => {
    // calls logout function from useForm page
    const { handleLogout} = useForm(
        validate
      );
      // create states
      var [items, setItems] = useState([]);
      var [Posts, setPosts] = useState([]);
      var [values, setValues] = useState({
        drawerOpen: false,
        drawerOpen1: false,
        drawerClasses: 'navbar-side',
        drawerClasses1: 'navbar-navitems'
      })
      var [ state, setState] = useState('');
      const drawerToggleClickHandler = () => {
        setValues({drawerOpen: !values.drawerOpen});
        setValues({drawerClasses:'navbar-side open'});

      
      
      }
      //closes side drawer
      const drawerCloser1 = ()=>{
        setValues({drawerOpen:false});
        setValues({drawerClasses:'navbar-side'});
      }

      // listens for changes
    useEffect(()=>{
      fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
        if(snapshot.exists()){
          let Items = snapshot.val();
          let newItems = [];
          for(let x = 0; x< 1; x++){
           
                newItems.push({
                   type: Items.type,
                   
                });
        
          }

          setItems(items = newItems);
        }
      });

    // retreives entrepreneur data from database
    fire.database().ref(`users/entrepreneurInfo/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
      if(snapshot.exists()){

        let Items = snapshot.val();
       let newItems = [];
       for(let x = 0; x< 1; x++){
        
             newItems.push({
                 username: Items.username,
                 profileImage: Items.profileImage,
             });
          setState(state = Items.profileImage);
       }
        setPosts(Posts= newItems);
      }
  });
    },[])

    return (
     
      <div>
        { // displays data to the front End
        items.map(item=>{
          if(item.type === 'Investor'){
            return(
              <nav className="navbar">
                <div show={values.drawerOpen} className={values.drawerClasses}>
                  <div className="profileView-TopSection">
                  <div className="profileView-back">
                      <h2 className="profileView-icon" onClick={drawerCloser1}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                      </h2>
                  </div>

                  </div>
                  <Nav className="ml-auto">
                    <NavItem className="navigation-items">
                      <NavLink to = '/profile' className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faUserCircle} size='1x' color="black"/> 
                      <h6>
                        Profile
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                  <NavItem className="navigation-items" >
                      <NavLink to="/" className="nav-link" color="black">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faHome} size='1x' color="black"/> 
                      <h6>
                        Home
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                      <NavLink to="/resources" className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faWindowRestore} size='1x' color="black"/> 
                      <h6>
                        Resources
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/feed" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faTh} size='1x' color="black"/> 
                      <div>
                        <h6 >Feed</h6>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/projects" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faCogs} size='1x' color="black"/> 
                      <div>
                        <h6 >Projects</h6>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/createpost" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faPlusCircle} size='1x' color="black"/> 
                      <div>
                        <h6 >Create Post</h6>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/opportunities" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faChartLine} size='1x' color="black"/> 
                      <h6>
                        Opportunities
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/support" className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faWrench} size='1x' color="black"/> 
                      <h6>
                        Support
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem onClick={()=>handleLogout(fire.auth().currentUser)} className="navigation-items">
                      <NavLink to = '/' className="nav-link">
                      <span style={{color:'black'}}>
                      
                        <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="black"/> 
                      <h6>
                        Sign Out
                      </h6>
                      </span>
                      </NavLink>

                    </NavItem>
                  </Nav>
                </div>
              <div className="container-fluid">
                  <a href="/"><img  alt = 'logo' className="nav-logo"src={logo} size="20px"/></a>
                    <NavItem>
                    {
                        state ?(
                          Posts.map(item=>{

                            return(
                              <a>
                                <img className="nav-image" src={item.profileImage} onClick={drawerToggleClickHandler} alt="user profile" size={200}/>
                              </a>
        
                             
                            )
                            })
                          
                        ):(
                          <h6 onClick={drawerToggleClickHandler}>menu</h6>
                        )
                      }
                    </NavItem>
              </div>
            </nav>
        
            )
          }else if(item.type === "Entrepreneur"){
            return(
              
              <nav className="navbar">
                <div show={values.drawerOpen} className={values.drawerClasses}>
                  <div className="profileView-TopSection">
                  <div className="profileView-back">
                      <h2 className="profileView-icon" onClick={drawerCloser1}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                      </h2>
                  </div>

                  </div>
                  <Nav className="ml-auto">
                    <NavItem className="navigation-items">
                      <NavLink to = '/profile' className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faUserCircle} size='1x' color="black"/> 
                      <h7 style={{padding: '10px'}}>
                        Profile
                      </h7>
                      </span>
                      </NavLink>
                    </NavItem>
                  <NavItem className="navigation-items" >
                      <NavLink to="/" className="nav-link" color="black">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faHome} size='1x' color="black"/>    
                      <h7 style={{padding: '10px'}}>
                        Home
                      </h7>
                      </span> 
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                      <NavLink to="/resources" className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faWindowRestore} size='1x' color="black"/><br/>
                      <h8>
                        Resources
                      </h8>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/feed" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faTh} size='1x' color="black"/> 
                      <div>
                        <h7 >Feed</h7>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/projects" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faCogs} size='1x' color="black"/> 
                      <div>
                        <h7 >Projects</h7>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/createpost" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faPlusCircle} size='1x' color="black"/> 
                      <div>
                        <h7 >Create Post</h7>
                      </div>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/opportunities" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faChartLine} size='1x' color="black"/> 
                      <h6>
                        Opportunities
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/mybusiness" className="nav-link">
                    <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faChartPie} size='1x' color="black"/> 
                      <h6>
                        My Business
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem className="navigation-items">
                    <NavLink to="/support" className="nav-link">
                      <span style={{color:'black'}}>
                      <FontAwesomeIcon icon={faWrench} size='1x' color="black"/> 
                      <h6>
                        Support
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>
                    <NavItem onClick={()=>handleLogout(fire.auth().currentUser)} className="navigation-items">
                      <NavLink to = '/' className="nav-link">
                      <span style={{color:'black'}}>
                      
                        <FontAwesomeIcon icon={faSignOutAlt} size="1x" color="black"/> 
                      <h6>
                        Sign Out
                      </h6>
                      </span>
                      </NavLink>

                    </NavItem>
                  </Nav>
                </div>
             
              <div className="container-fluid">
                  <a href="/"><img  alt = 'logo' className="nav-logo"src={logo} size="20px"/></a>
                    <NavItem>
                    {// if theres a profile image, a profile image should be displayed. If not a menu text should be
                        state ?(
                          Posts.map(item=>{

                            return(
                              <a>
                                <img className="nav-image" src={item.profileImage} onClick={drawerToggleClickHandler} alt="user profile" size={200}/>
                              </a>
        
                             
                            )
                            })
                          
                        ):(
                          <h6 onClick={drawerToggleClickHandler}>menu</h6>
                        )
                      }
                    </NavItem>
              </div>
            </nav>
            )
          }

        })}
        
      </div>
    )
  };
  
  export default Navigation;