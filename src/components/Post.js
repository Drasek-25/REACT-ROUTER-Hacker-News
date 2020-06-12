import React from "react";
import { Link } from "react-router-dom";

const Post = ({ title, creator, url, id, comments }) => {
   const userLink = (
      <Link className="meta-info-dark" to={`/user/${creator}`}>
         {creator}
      </Link>
   );
   const commentLink = (
      <Link className="meta-info-dark" to={`/comments/${id}`}>
         {comments}
      </Link>
   );
   return (
      <div className="comment">
         <div className="post">
            <a className="link" href={url}>
               {title}
            </a>
            <br />
            <span className="meta-info-light">
               by {userLink} with {commentLink} comments
            </span>
         </div>
      </div>
   );
};

export default Post;
