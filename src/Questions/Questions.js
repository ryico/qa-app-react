import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  // Reactがコンポーネントをマウントし終えた時にGETリクエストをバックエンドに発行する。
  // 要求とバックエンドからの応答の間、Reactは「質問の読み込み中」というメッセージでコンポーネントをレンダーする。
  async componentDidMount() {
    const questions = (await axios.get(process.env.REACT_APP_API_DOMAIN)).data;
    this.setState({
      questions,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">＋ 質問を追加</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>質問を読み込み中...</p>}
          {
            this.state.questions && this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">回答件数: {question.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Questions;