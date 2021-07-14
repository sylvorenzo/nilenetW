import React from 'react'
import { Link } from 'react-router-dom';
const HomeScreen =()=>{

    return(
        <div>
            <div className="home-content">
                <div className="resources-section">
                <h1>Resources</h1>
                    <div className="resources-content">
                    
                        <p>Provides you with helpful information on the required documentation, finances, copyright and intellectual property. 
                            Furthermore, tools you need to succeed and also how to register your business
                        </p>
                        <p> To gain access to these resources click <Link to ='/resources'>here</Link></p>
                    </div>
                </div>
                <div className="resources-section1">
                    <h1>Feed</h1>
                    <div className="resources-content">

                        <p>
                            See the projects and Start-Up strengths of all Entrepreneurs on this platform. 
                            To view projects and start-Ups click <Link to ='/feed'>here</Link>. 

                        </p>
                    </div>
                </div>
                <div className="resources-section">
                    <h1>Opportunities</h1>
                    <div className="resources-content">

                    <p>Business opportunities help entrepreneurs take their businesses to the 
                        next level. To gain access to opportunities click <Link to='/opportuinities'>here</Link>.
                    </p>
                    </div>
                </div>
                <div className="resources-section1">
                    <h1>My Business</h1>
                    <div className="resources-content">
                        <p>
                            This is a feature where we use machine learning to predict the strength of your start up based on a few metrices. 
                            If Your are ready to use this feature click <Link to='/mybusiness'>here</Link>.
                        </p>

                    </div>
                </div>
                <div className="resources-section">
                    <h1>Support</h1>
                    <div className="resources-content">

                        <p>If you need any help navigating through the site, the support page is where
                            you will find all the solutions to your problems. Feel free to go through 
                            our frequently asked questions during your spare time. To navigate to the support page 
                            click <Link to='/support'>here</Link>.
                        </p>
                    </div>
                </div>
                <div className="resources-section1">
                    <h1>Profile</h1>
                    <div className="resources-content">
                        <p>
                            Share information about yourself, your projects and everything that represents you and 
                            your organisation. To navigate to the profile page click <Link to='/'profile>here</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeScreen