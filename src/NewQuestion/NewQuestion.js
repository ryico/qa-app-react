import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import axios from 'axios';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      description: '',
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post(process.env.REACT_APP_API_DOMAIN, {
      title: this.state.title,
      description: this.state.description,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">新規質問を作成する</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">タイトル：</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateTitle(e.target.value)}}
                    className="form-control"
                    placeholder="質問にタイトルをつけてください。"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">説明：</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateDescription(e.target.value)}}
                    className="form-control"
                    placeholder="質問をより具体的に説明してください。"
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewQuestion);