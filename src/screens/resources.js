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
                   Required Documentation
                </button>
                <button className="resource-categories">
                    Tools for Success
                </button>
                <button className="resource-categories">
                    Copyright and Intellectual Property
                </button>
                <button className="resource-categories">
                    How to Register Your Business
                </button>
            </div>
        )
    }
}
export default ResourceScreen;