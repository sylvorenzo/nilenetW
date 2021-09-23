import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem} from 'reactstrap';
import {Nav} from 'react-bootstrap';
import logo from '../assets/nilenet.png' ;
import validate from './validateInfo';
import useForm from './useForm';
import fire from './fire';
import '../components/styles.css';
import {FaBars, FaChartLine, FaChartPie, FaCogs, FaHome, FaPlusCircle, FaSignOutAlt, FaTh, FaUser, FaWindowRestore, FaWrench} from 'react-icons/fa';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, 
  faSignOutAlt,
  faWindowRestore, 
  faHome,
  faWrench,
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
    fire.database().ref(`users/${fire.auth().currentUser.uid}`).on('value', snapshot =>{
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
                      
                      <h6>
                      <FaUser/> 
                        Profile
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>

                  <NavItem className="navigation-items" >
                      <NavLink to="/" className="nav-link" color="black">
                      <span style={{color:'black'}}>
                      <h6>
                        <FontAwesomeIcon icon={faHome} size='1x' color="black"/>
                        Home
                      </h6>
                      </span>
                      </NavLink>
                    </NavItem>





                    <NavItem className="navigation-items">
                      <NavLink to="/resources" className="nav-link">
                      <span style={{color:'black'}}>
                      <h6>
                      <FontAwesomeIcon icon={faWindowRestore} size='1x' color="black"/> 
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
                  <div className="decorative-container">
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
                          <h6 onClick={drawerToggleClickHandler}><FaBars/></h6>
                        )
                      }
                    </NavItem>              
                  </div>

              </div>
            </nav>
        
            )
          }
          else if(item.type === "Entrepreneur"){
            return(

              

              
              
              <nav className="navbar">

                <div show={values.drawerOpen} className={values.drawerClasses} >
                  <div className="profileView-TopSection">
                  <div className="profileView-back">
                      <h2 className="profileView-icon" onClick={drawerCloser1}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} size={70}/>
                      </h2>
                  </div>

                  </div>
                  
                  <Nav className="ml-auto">
                  <NavItem className="navigation-items">
                  <NavItem className="navigation-items">
                      <NavLink to = '/profile' className="nav-link">
        
                      
                      <h7>
                        <FaUser/> Profile
                      </h7>
                      
                      </NavLink>
                    </NavItem>
                    <NavLink to="/mybusiness" className="nav-link">
                  
                      
                      <h7><FaChartPie/> Statistics</h7>
                   
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items" >
                      <NavLink to="/" className="nav-link" color="black">
                   
                         
                      <h7>
                        <FaHome/> Home
                      </h7>
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items">
                      <NavLink to="/resources" className="nav-link">
                      
                      
                      <h7><FaWindowRestore/> Resources</h7>
                     
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items">
                    <NavLink to="/opportunities" className="nav-link">
                   
                      
                      <h7><FaChartLine/> Opportunities
                      </h7>
                     
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items">
                    <NavLink to="/feed" className="nav-link">
                    
                     
                       
                        <h7 ><FaTh/> Feed</h7>
                      
                      
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items">
                    <NavLink to="/projects" className="nav-link">
                   
                    
                      
                        <h7><FaCogs/> Projects</h7>
                      
                   
                      </NavLink>
                    </NavItem>

                    <NavItem className="navigation-items">
                    <NavLink to="/createpost" className="nav-link">
                    
                      
                      
                        <h7><FaPlusCircle/> Create Post</h7>
                      
                     
                      </NavLink>
                    </NavItem>




                    <NavItem className="navigation-items">
                    <NavLink to="/support" className="nav-link">
                     
                      
                      <h7><FaWrench/> Support</h7>
                     
                      </NavLink>
                    </NavItem>

                    <NavItem onClick={()=>handleLogout(fire.auth().currentUser)} className="navigation-items">
                      <NavLink to = '/' className="nav-link">
                     
                      <h7><FaSignOutAlt/> Sign Out
                      </h7>
                    
                      </NavLink>
                    </NavItem>
                  </Nav>

                </div>
             
              <div className="container-fluid">
                  <a href="/"><img  alt = 'logo' className="nav-logo"src={logo} size="30px"/></a>
                  <div className="decorative-container">
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
                          <h6 onClick={drawerToggleClickHandler}><FaBars size={30} color="#ff4d00"/></h6>
                        )
                      }
                    </NavItem>              
                  </div>
              </div>
            </nav>
            )
          }

        })}
        
      </div>
    )
  };
  
  export default Navigation;