import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationBar.css';

const NavigationBar = (props) => {
    return (
        <div className="navigationBar">
            <ul>
                <li><NavLink to="/">Timer</NavLink></li>
                <li><NavLink to="/stats">Stats</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                { props.currentUser ?
                <li onClick={props.signOut}><NavLink to="">Sign out</NavLink></li>
                :
                    null
                }
                { !props.currentUser ?
                <li><NavLink to="/sign-in">Sign-in</NavLink></li>
                :
                <li><img src={props.profileURL} className="profile" alt="" /></li>
                }
            </ul>
        </div>
    );
};

export default NavigationBar;