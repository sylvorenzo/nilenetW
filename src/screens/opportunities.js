import React from 'react';
import combination from '../assets/opportunities.png';
import svai from '../assets/svai.jpg';
import sva1 from '../assets/sva1.jpg'

//content for opportunities page.
const OpportunitiesScreen = ()=>{

    return(
        <div style={{backgroundColor:'white',paddingTop:'10px',height:'1500px'}}>
            <img src={combination} width={1200} height={700}  style={{pointerEvents:'none', position:'absolute'}}/>
            <div className="Opportunities-section">

                <div className="opportunities-content">
                   <img src={svai} width={400} height={500} />
                </div>
                <div className="opportunities-links">
                   <h2>ENTREPRENEURS ONLY:</h2>
                   <h2 style={{color:'orange'}}>INVESTOR READINESS WORKSHOP</h2>
                   <h3 style={{
                       borderTop:'1px solid black',
                       borderBottom:'1px solid black' 
                    }}>THURSDAY, 16 SEPTEMBER 2021</h3>
                    <h5>09:00-11:00 GMT</h5>
                    <h5>10:00-12:00 WAT</h5>
                    <h5>11:00-13:00 CAT</h5>
                    <h5>12:00-14:00 EAT</h5>
                    <p style={{borderTop:'1px solid black', borderBottom:'1px solid black'}}>
                        In partnership with ThreeArrows Impact Partner and this time co-hosted 
                        with Ghana Tech Lab, this workshop will help entrepreneurs to self-assess 
                        and identify areas that they need to work on, as well as how and where to 
                        access additional information to guide them in their journey. There are limited 
                        slots available, so make sure you register now!
                    </p>
                    <a href='https://evolve.eventoptions.co.za/register/investor_workshop/details' style={
                        {textDecoration: 'none', 
                        backgroundColor:'orange',
                        color:'white',
                        width:'200px',
                        height:'100px',
                        padding:'10px',
                        marginTop: '10px',
                        borderRadius:'50px'
                        }
                }>Register Here</a> 
                </div>
                <div className="opportunities-content" style={{marginTop:'200px'}}>
                   <img src={sva1} width={400} height={500} />
                </div>
                <div className="opportunities-links" style={{marginTop:'200px'}}>
                   <h2>CALL FOR ENTRIES:</h2>
                   <h2 style={{color:'orange'}}>CLIMATE CHANGE INNOVATORS</h2>
                   <h3 style={{
                       borderTop:'1px solid black',
                       borderBottom:'1px solid black' 
                    }}>DEADLINE: 30 SEPTEMBER 2021</h3>
                    <p>
                        All Entrepreneurs across Africa are eligibile to enter. Your 
                        company must be operational for a minimum of 3 years and focusing on 
                        initiative that will help fight Climate Change.

                    </p>
                    <p style={{borderTop:'1px solid black', borderBottom:'1px solid black'}}>
                        The Shared Value Africa Initiative is calling all entrepreneurs across our 
                        continent that are contributing to climate change to please join us and share 
                        your climate change at the <span style={{fontWeight:'bold'}}> 2021 Africa Shared 
                        Value Leadership Summit. </span>For more details on the criteria, how to apply to
                         showcase your work on this high profile platform and how to use the opportunity 
                         to share your innovation with the world, click below. 
                    </p>
                    <a href='https://www.africasharedvaluesummit.com/Call-for-Entries' style={
                        {textDecoration: 'none', 
                        backgroundColor:'orange',
                        color:'white',
                        width:'200px',
                        height:'100px',
                        padding:'10px',
                        marginTop: '10px',
                        borderRadius:'50px'
                        }
                }>How To Enter</a> 
                </div>
            </div>
        </div>
    )
}
export default OpportunitiesScreen;