import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/nilenet.png' ;
import '../components/styles.css';
class LandingPageScreen extends Component{

    
    render(){
        
        return(
             
            <div >
                <img alt="logo"src={logo} className ='logo-img'/>
                  <div className="content">
                      <h1>Welcome</h1>
                      <p className= "content-p">
                      NILENET support and enable SMEs and entrepreneurs to access markets, funding, 
          as well as lobby and advocate for a more accommodating policies and legislation to ensure their long-term success.<br/>
          -A digital platform where entrepreneurs/SMMEs/startups can go to access the information they need to help them get to the next level of their business journey.<br/>

          This portal is an exclusive platform for SMMEs in all major sectors including 
          agriculture, technology, manufacturing and finance.<br/>This Portal ultimately targets all 
          sectors but through a voting process, SAWG highlighted sectors below, and to select one to pilot portal
          with:<br/>
          • Agriculture<br/>
          • Finance and Business Services<br/>
          • Manufacturing<br/>
          • Tourism<br/>
          • Community, Social and Personal Services<br/>
          
          SMMES can access markets, access to  funding, compliance/capacity building support.<br/>
          Nilenet platform can also be used for advocacy to policymakers on behalf of entrepreneurs.<br/>
          
                    </p>

                    <button className="content-btn">
                    <Link className ="content-link"  to='/terms'>
                            Get Started
                    </Link>
                    </button>

                 </div>

               

            </div>
               
            
        );
    }
}
export default LandingPageScreen;