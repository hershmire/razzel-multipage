import React from 'react';
import logo from './images/react2.svg';
import './About.css';

class About extends React.Component {
  render() {
    // console.log('XXX -- this.props:', this.props);
    // console.log('XXX -- this.props.name:', this.props.name);

    return (
      <div className="About">
        <div className="About-header">
          <img src={logo} className="About-logo" alt="logo" />
          <h2>About page {this.props.name}</h2>
        </div>
        <p className="About-intro">
          Example about page! This is a separate React application.
        </p>
        <ul className="About-resources">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default About;
