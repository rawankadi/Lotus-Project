import { Component } from "react";
import '../Headers/Header.css';
import logo from '../images/Logo.png';
import { FaTimes,FaBars, FaTachometerAlt, FaEnvelope, FaBriefcase, FaClock, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
   

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
    }


    toggleSidebar = () => {
        this.setState(prevState => ({
            sidebarOpen: !prevState.sidebarOpen
        }));
    }
    render() {
        return (
            <div className="header">
               <ul className="navigation">
                    <li id="burger" className="SideBar" onClick={this.toggleSidebar}>
                        {this.state.sidebarOpen ? <FaTimes style={{ fontSize: '22px' }}/> : <FaBars style={{ fontSize: '22px' }}/>}
                    </li>  
                    
                        <li><img src={logo} id="logo" alt="Logo" /></li>
                        <div className="navigation-items">
                            <div id="item"><li><a href="/HomePage">Home</a></li></div>
                            <div id="item"><li><a href="/AboutUs">About Us</a></li></div>
                            <div id="item"><li><a href="/ContactUs">Contact Us</a></li></div>
                        </div>
                    
                    <a href="/SignIn"><li className="btnend">
                        <button className="btn">Sign in</button>
                    </li></a>
                </ul>
                {this.state.sidebarOpen && (
                    <div id="underHeader" className="sidebar">
                        <ul className="sideMenu">
                            <li>
                                <FaTachometerAlt style={{ fontSize: '22px' }}/> Dashboard
                            </li>
                            <li>
                                <FaEnvelope style={{ fontSize: '22px' }}/> Messages
                            </li>
                            <li>
                                <FaBriefcase style={{ fontSize: '22px' }}/> Jobs
                            </li>
                            <li>
                                <FaClock style={{ fontSize: '22px' }}/> Timesheet
                            </li>
                            <li>
                                <FaUserPlus style={{ fontSize: '22px' }}/> Recruitments
                            </li>
                        </ul>
                        <div className="sidebar-footer">
                            <li>
                                <FaSignOutAlt style={{ fontSize: '18px' }}/> Log out
                            </li>
                        </div>
                    </div>
                )}
            </div>
            
        );
    }
}
