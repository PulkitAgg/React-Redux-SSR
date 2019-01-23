import React, { Component } from "react";
import { fetchNews } from "../../redux/newsReducer/actions";
import NewsList from "./newsList";

class News extends Component {
  constructor(props) {
    super(props);
  }

  static initialAction() {
    return fetchNews();
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.fetchNews();
    }
  }

  render() {
    const { data } = this.props;
    return <NewsList news={data} />;
  }
}

export default News;
