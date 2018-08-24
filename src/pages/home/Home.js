import React from 'react';
import logo from './images/react.svg';
import './Home.css';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Home Page</h2>
          <h3>Hello {this.props.name}</h3>
        </div>
        <p className="Home-intro">
          Example home page! This is a separate React application.
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <ul className="Home-resources">
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

export default Home;
