import React, { Component } from "react";
import { fetchNews } from "../../redux/actions";
import NewsList from "./NewsList";

class News extends Component {
  constructor(props) {
    super(props);
    
  }

  static initialAction() {
    return fetchNews();
  }

  componentDidMount() {
    if (!this.props.news) {
      this.props.fetchNews();
    }
  }

  render() {
    console.log('news', this.props)
    const { data } = this.props;
    return <NewsList news={data} />;
  }
}

// const mapStateToProps = state => ({
//   news: state.news
// });

// export default connect(mapStateToProps)(News);
export default News;
