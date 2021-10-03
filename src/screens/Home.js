import React from 'react'
import { Link } from 'react-router-dom';
import overview from '../assets/overview.png';
import combination from '../assets/combination.svg';

// displays the different categories on the home page.
const HomeScreen =()=>{

    return(
<div style={{display:'inline-block',backgroundColor:'white'}} className="home-div">
    
        <img src={combination} className="banner-image" />
        <h2 style={{fontFamily:'sans-serif', color:'#ff4d00', textAlign:'center', fontSize:'20px',marginTop:'140px'}}>AFRICA'S MOST POWERFUL <span style={{fontWeight:'bold'}}>SHARED VALUE</span> BUSINESS NETWORK</h2>
        <img src={overview} width={1200} height={500} style={{pointerEvents:'none'}} className="home-image"/>
        <div className="resource-body">

            <div className="home-content">
                
                <div className="resources-sectionR"> 
                </div>
                    <div className="resources-content">
                    <h2>Resources</h2>
                        <p>Provides you with helpful information on the required documentation, finances, copyright and intellectual property. Furthermore, tools you need to succeed and also how to register your business. To gain access to these resources click <Link to ='/resources'>here</Link></p>
                    </div>
                
        </div>

        <div className="home-content">
              <div className="resources-sectionF">
                    </div>
                    <div className="resources-content">
                    <h2>Feed</h2>
                        <p>
                            See the projects and Start-Up strengths of all Entrepreneurs on this platform. 
                            To view projects and start-Ups click <Link to ='/feed'>here</Link>. 

                        </p>
                </div>
        </div>
              

              <div className="home-content">
                  <div className="resources-sectionO"> </div>
                    
                    <div className="resources-content">
                        <h2>Opportunities</h2>
                    <p>Business opportunities help entrepreneurs take their businesses to the 
                        next level. To gain access to opportunities click <Link to='/opportunities'>here</Link>.
                    </p>
                   
                </div>
                </div>
                
                <div className="home-content">
                    <div className="resources-sectionM"> </div>
                    
                    <div className="resources-content">
                        <h2>Statistics</h2>
                        <p>
                            This is a feature where we use machine learning to predict the strength of your start up based on a few metrices. 
                            If Your are ready to use this feature click <Link to='/mybusiness'>here</Link>.
                        </p>

                   
                </div>

                </div>

                <div className="home-content">
                     <div className="resources-sectionS"> </div>
                   
                    <div className="resources-content">
                     <h2>Support</h2>
                        <p>If you need any help navigating through the site, the support page is where
                            you will find all the solutions to your problems. Feel free to go through 
                            our frequently asked questions during your spare time. To navigate to the support page 
                            click <Link to='/support'>here</Link>.
                        </p>
                   
                </div>
                </div>
              
               <div className="home-content">  
               <div className="resources-sectionP">  </div>
                    
                    <div className="resources-content">
                        <h2>Profile</h2>
                        <p>
                            Share information about yourself, your projects and everything that represents you and 
                            your organisation. To navigate to the profile page click <Link to='/profile'>here</Link>.
                        </p>
                  
                </div>
                
                </div>
              
            
        </div>
        </div>
    )
}
export default HomeScreen