import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nilenet.png' ;

const TermsScreen = ()=>{

    return(
        <div>
            <img src={logo} className ='logo-img'/>
            <div className="terms-content">
                <p>By using this portal you hereby agree that you have read our <span className="box-span">terms and conditions</span></p>
                <button className="terms-btn">
                    <Link className="content-link" to='/l'>
                     I Agree
                    </Link>

                </button>
            </div>

        </div>
    )
}
export default TermsScreen;