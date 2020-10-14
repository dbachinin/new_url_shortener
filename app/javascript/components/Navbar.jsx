import React from "react";
import { Link } from "react-router-dom";
import Cable from 'actioncable';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCompass, faHeart, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
library.add(fab, faCompass, faHeart, faUser, faCheckSquare, faCoffee, faCamera, faSignOutAlt)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbar extends React.Component {
  UNSAFE_componentWillMount() {
    this.createSocket();
    this.get_token();
  }
  state = {
    notification: '',
    showNotifi: false
  };
  notification = {};
  token = ""

  deleteSession() {
    return fetch("/users/sign_out", {
      method: 'delete',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token
      },
    }).then(response => {
      location.reload();
    }
    );
  }

  get_token() {
    this.token = $('meta[name="csrf-token"]').attr('content')
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create({
      channel: 'NotificationChannel'
    }, {
      connected: () => { },
      received: (data) => {
        this.notification = data
        this.setState((state, props) => ({ notification: props.notification }))
      }
    });
  }

  render() {
    const Notification = (props) => {
      if (props.notice) {
        return <div className="alert alert-success in">
          <button type="button" className="close" data-dismiss="alert">×</button>
          <div id="flash_notice">{props.notice}</div></div>
      } else if (props.danger) {
        return <div className="alert alert-danger in">
          <button type="button" className="close" data-dismiss="alert">×</button>
          <div id="flash_notice">{props.danger}</div></div>
      }
    };
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3 d-flex">
          <div className="container">
            <a className="navbar-brand" href="/">
              <h1>Url Shortener <span className="badge badge-secondary">{this.props.totalItems}</span></h1>
            </a>
            {/* <div className="m-auto">
              <form className="form-inline search-form">
                <input className="form-control mr-sm-2" type="search" placeholder="@search" aria-label="Search" />
              </form>
            </div> */}
            {/* <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="mr-4" href="#" onClick={() => { this.deleteSession() }}><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></a>
              </li>
            </ul> */}
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <div className="user-section">
                  <a href="#" onClick={() => { this.deleteSession() }}><FontAwesomeIcon icon={['fa', "user"]} /></a>
                  <a><FontAwesomeIcon icon={['fa', "heart"]} /></a>
                  <a><FontAwesomeIcon icon={['fa', "compass"]} /></a>
                </div>
              </ul>
            </div> */}
          </div>
        </nav>
        <h3>{Notification(this.notification)}</h3>
      </React.Fragment>
    );
  }
}

export default Navbar;