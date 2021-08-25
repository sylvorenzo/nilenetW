import React from 'react';

const OpportunitiesScreen = ()=>{
    return(
        <div>
            <div className="Opportunities-section">

                <div className="opportunities-content">
                    <h1>Opportunities</h1>
                    <p>
                        Opportunities are a time or a set of circumstances that makes it possible to do 
                        something. Furthermore, NILENET provides Entrepreneurs with the opportunity to gain access 
                        to markets by placing all the necessary information with links to government Tenders, and projects 
                        which parties with similar interests can come together and work on something that would be most beneficial 
                        to society and parties involved.
                    </p>
                    <p>
                        Entrepreneurs can collaborate with each other 24/7, government Tenders however, does not have those benefits.
                        To find out more about tenders visit the tender site.
                    </p>
                </div>
                <div className="opportunities-links">
                    <button className="opportunities-categories">
                        <a href='/projects'>
                            Collaborate on Projects
                        </a>
                    </button>
                    <button className="opportunities-categories">
                        <a href='https://www.eTenders.gov.za'>
                            Visit Tender Site
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default OpportunitiesScreen;