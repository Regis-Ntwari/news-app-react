import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import authService from "../../services/auth.service";
import { LoginForm } from "./LoginForm";
import {createBrowserHistory} from 'history'

export default class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitData = () => {
    console.log(this.state.username, this.state.password, "==");
      const history = createBrowserHistory();
      const { username, password } = this.state
      authService.login(username, password)
                    .then(() => {
                        //browserHistory.push('/articles/');
                        history.push('/createArticle')
                        window.location.reload();
                    })
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item sm={2} xs={false}></Grid>
          <Grid item sm={8} xs={12}>
            <LoginForm 
                handleChange={this.handleChange} 
                data={this.state} 
                submitData={this.submitData}
            />
          </Grid>
          <Grid item sm={2} xs={false}></Grid>
        </Grid>
      </div>
    );
  }
}
