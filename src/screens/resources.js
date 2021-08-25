import React,{Component} from 'react';
import { Link } from 'react-router-dom';


class ResourceScreen extends Component{

    render(){
        return(
            <div>
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