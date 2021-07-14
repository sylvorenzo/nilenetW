import React, {Component} from 'react';
import { NavItem, Navbar} from 'reactstrap';
import {Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBriefcase,faPlane, faIndustry,faCogs,faPlus} from '@fortawesome/free-solid-svg-icons';


class SideBarMybusiness extends Component{

    render(){
        return(
       /* <div>
            <nav id="sidenav-1" class="sidenav" data-mdb-hidden="false">
              <ul class="sidenav-menu">
                <li class="sidenav-item">
                  <a class="sidenav-link">
                    <i class="far fa-smile fa-fw me-3"></i><span>Link 1</span></a>
                </li>
                <li class="sidenav-item">
                  <a class="sidenav-link"><i class="fas fa-grin fa-fw me-3"></i><span>Category 1</span></a>
                  <ul class="sidenav-collapse show">
                    <li class="sidenav-item">
                      <a class="sidenav-link">Link 2</a>
                    </li>
                    <li class="sidenav-item">
                      <a class="sidenav-link">Link 3</a>
                    </li>
                  </ul>
                </li>
                <li class="sidenav-item">
                  <a class="sidenav-link"><i class="fas fa-grin-wink fa-fw me-3"></i><span>Category
                      2</span></a>
                  <ul class="sidenav-collapse">
                    <li class="sidenav-item">
                      <a class="sidenav-link">Link 4</a>
                    </li>
                    <li class="sidenav-item">
                      <a class="sidenav-link">Link 5</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          
            
           
            <button data-mdb-toggle="sidenav" data-mdb-target="#sidenav-1" class="btn btn-primary"
              aria-controls="#sidenav-1" aria-haspopup="true">
              <i class="fas fa-bars"></i>
            </button>
    </div>
    */


            //sidebar
          
           <div>
               <div className="feed-nav">
                  <Nav>
                      <NavItem className='feed-items'>
                      <FontAwesomeIcon icon={faCogs} size={70} />
                          <NavLink className='feed-items' to='/projects'>
                              Projects
                          </NavLink>
                      </NavItem>
                      <NavItem className='feed-items'>
                      <FontAwesomeIcon icon={faPlus} size={70} />
                          <NavLink className='feed-items' to='/createpost'>
                              Create Post
                          </NavLink>
                      </NavItem>
                  </Nav>  
               </div>
           </div>
        )
    }
}
export default SideBarMybusiness;