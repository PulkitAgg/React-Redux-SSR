import React from "react";
import "../../assests/css/newsList.css";

export default function NewsList({ news }) {
  console.log('data',news);
  return (
    <div className="newslist">
      <div className="header">
        <strong>Wizard News</strong>
      </div>
      {news && news.data &&
        news.data.map(post =>
          <div key={post.id}>
            <p>
              {post.id} ⬆ {post.title}
            </p>
            <small>
              {post.upvotes} upvotes by {post.author}
            </small>
          </div>
        )}
    </div>
  );
}
