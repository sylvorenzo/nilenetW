import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import combination from '../assets/content.png';


class ResourceScreen extends Component{

    render(){
        return(
            <div style={{backgroundColor:'white', height:'20px', paddingTop:'10px'}}>
                <img src={combination} width={1200} height={700} style={{position:'absolute',}} />
                <button className="resource-categories">
                    <Link to='/finances'>
                        Finances 
                    </Link>
                </button>
                <button className="resource-categories">
                    <Link to ='/tools'>
                    Tools for Success
                    </Link>
                    
                </button>
                <button className="resource-categories">
                    <Link to='/copyright'>
                    Copyright and Intellectual Property
                    </Link>
                    
                </button>
                <button className="resource-categories">
                    <Link to='/register'>
                    How to Register Your Business
                    </Link>
                </button>
            </div>
        )
    }
}
export default ResourceScreen;