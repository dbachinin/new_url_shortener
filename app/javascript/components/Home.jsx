import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

class Home extends React.Component {
constructor(props) {
  super(props);
  this.state = { link: ''};
  this.given_link = '';
  this.token = '';
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleChange = this.handleChange.bind(this)
}

componentDidMount () {
  this.token = $('meta[name="csrf-token"]').attr('content');
}

handleSubmit() {
  console.log(this.given_link)
  fetch('/set_url', {
    method: 'POST',
    data: {dest_url: this.given_link},
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': this.token
    }
  }).then((data) =>{
    console.log(data)
    this.setState({ link: data.body });
  })
  
}

handleChange(event) {
  this.given_link = event.target.value
  // this.setState({ link: this.given_link });
}
render() {
return (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h5 className="display-4">Enter destination URL</h5>
        <div className="row mt-5 justify-content-center">
                <div className="col-12 col-lg-6 border border-1 p-4">
                    <form className="">
                        <div className="form-group">
                            <label className="col-form-label">Given URL</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Please input given URL"
                                onChange={this.handleChange}/>
                        </div>
                        <Link
                          to={this.state.link}
                          role="link"
                        >{this.state.link}</Link>
                        <hr className="my-4"/>
                        <div className="form-group text-right">
                            {this.props.sendingRequest ? (
                                <button type="button" className="btn btn-primary" disabled>Sending Request...</button>
                            ) : (
                                <button type="button" onClick={this.handleSubmit}
                                        className="btn btn-primary">Get Short URL</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
  </div>
);
                            };
                            };
                            export default Home;