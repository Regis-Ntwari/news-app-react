import { Button, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import ReadArticles from "./ReadArticles";

export default class ReadArticlesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    //API call
    Axios.get("http://localhost:8000/articles/")
      .then((Response) => Response.data)
      .then((data) => {
        this.setState({
          articles: data,
        });
      });
  }
  render() {
    const { articles } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item sm={2} xs={false} />
          <Grid item container spacing={2} sm={8} xs={12}>
            {articles.map((article) => (
              <Grid item sm={4} xs={12} key={article.id}>
                <ReadArticles article={article} key={article.id}/>
              </Grid>
            ))}
          </Grid>
          <Grid item sm={2} xs={false}/>
        </Grid>
        <Button onClick={this.logout}>
        </Button>
      </div>
    );
  }
}
