import React, { useState, useEffect } from "react";
import { fetchItem, fetchComments } from "../utils/api";
import { Link } from "react-router-dom";

const Comments = (props) => {
   const [post, setPost] = useState(null);
   const [comments, setComments] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      const handleFetchComments = async () => {
         setLoading(true);
         setError(false);
         setPost(null);

         fetchItem(props.match.params.post)
            .then((post) => {
               setPost(post);

               fetchComments(post.kids)
                  .then((comments) => {
                     setComments(comments);
                     setLoading(false);
                  })
                  .catch((error) => {
                     setError({ ...error, comments: error });
                     setLoading(false);
                  });
            })
            .catch((error) => {
               setError({ ...error, post: error });
               setLoading(false);
            });
      };
      handleFetchComments();
   }, [props.match.params.post]);

   if (error !== false) return <h1>{error}</h1>;
   if (loading === true && error === false) return <h1>Loading...</h1>;
   if (error === false && loading === false) {
      return (
         <div>
            <div>
               <h2 className="link posttitle">{post.title}</h2>
               <span className="meta-info-light">
                  by {<Link to={`/user/${post.by}`}>{post.by}</Link>} with{" "}
                  {post.kids ? post.kids.length : 0} comments.
               </span>
            </div>
            {comments.map((comment, i) => (
               <div key={i} className="comment">
                  <span className="meta-info-light">
                     by{" "}
                     {
                        <Link
                           className="meta-info-dark"
                           to={`/user/${comment.by}`}
                        >
                           {comment.by}
                        </Link>
                     }
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: comment.text }} />
               </div>
            ))}
         </div>
      );
   }
};

export default Comments;
