import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
      error: null,
      copied: false
    };
    this.given_link = '';
    this.token = '';
    this.url = '';
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
  }

  componentDidMount() {
    this.token = $('meta[name="csrf-token"]').attr('content');
    this.url = window.location.href
  }

  handleSubmit(e) {
    console.log(this.given_link)
    fetch('/set_url', {
      method: 'post',
      body: JSON.stringify({
        link: {
          given_url: this.given_link
        }
      }),
        headers: {
          "Content-Type": "application/json",
          'X-CSRF-Token': this.token
        }
      })
      .then(response => response.json())
      .then(json => {
        if (!json.error){
          this.setState({
            link: `${this
              .url
              .replace('\?', '')}${json
              .slug}`,
            error: null
          });
        }else{
          this.setState({
            error: json.error
          });
        }
      });
      e.preventDefault();
  }

  handleChange(event) {
    this.given_link = event.target.value
    // this.setState({ link: this.given_link });
  }
  render() {
    const Error = (props) => { return (<div>
      <p>{props.error}</p>
    </div>)}
    return (
      <div
        className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h5 className="display-4">Enter destination URL</h5>
            <div className="row mt-5 justify-content-center">
              <div className="border border-1 p-4">
                <form className="" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="col-form-label">Given URL</label>
                    <input
                      className="form-control"
                      type="url"
                      placeholder="Please input given URL"
                      onChange={this.handleChange}/>
                  </div>
                  <Error error={this.state.error}/>
                  <a href={this.state.link}>{this.state.link}</a>
                  <hr className="my-4"/>
                  <div className="btn-group">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Get Short URL</button>

                    <CopyToClipboard text={this.state.link}
                      onCopy={() => this.setState({copied: true})}>
                      <button className="btn btn-secondary">Copy to clipboard</button>
                    </CopyToClipboard>
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