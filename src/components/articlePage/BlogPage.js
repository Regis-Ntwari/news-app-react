import Axios from "axios";
import React, { Component } from "react";
import authHeader from "../../services/auth-header";
import { CreateArticle } from "./CreateArticle";
import {createBrowserHistory} from 'history'

export default class BlogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title : '',
      image : ''
    };
  }

  componentDidMount(){
    const history = createBrowserHistory();
    const header = authHeader();
    if(header.Authorization!= null){
      history.push('/createArticle')
      window.location.reload()
    }
    else{
      history.push('/home')
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  handleFileChange = (event) => {
    const files = event.target.files;
    this.setState({
      image : files[0]
    })
  }

  uploadArticle = (content) => {
    const article = {
      title : this.state.title,
      image : this.state.image,
      content : content
    }
    let form = new FormData();
    form.append('title', article.title)
    form.append('image', article.image)
    form.append('content', article.content)
    
    Axios.post('http://localhost:8000/articles/', form, {headers :authHeader()})
      .then(Response => Response.data)
      .then(data => {
        console.log(data);
      })
  }

  render() {
    return (
      <div>
        <CreateArticle
          handleChange={this.handleChange}
          handleFileChange={this.handleFileChange}
          data={this.state}
          uploadArticle={this.uploadArticle}
        />
      </div>
    );
  }
}
