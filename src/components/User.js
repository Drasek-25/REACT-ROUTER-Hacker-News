import React, { useEffect, useState } from "react";
import { fetchUser, fetchPosts } from "../utils/api";
import Post from "./Post";

const User = (props) => {
   const [user, setUser] = useState(null);
   const [userPosts, setUserPosts] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      const handleUserFetch = async () => {
         setUser(null);
         setLoading(true);
         setError(false);

         fetchUser(props.match.params.username)
            .then((userData) => {
               setUser(userData);

               fetchPosts(userData.submitted.slice(0, 50))
                  .then((postData) => {
                     setUserPosts(postData);
                     setLoading(false);
                  })
                  .catch((postError) => {
                     setError({ ...error, post: postError });
                  });
            })

            .catch((userError) => {
               setLoading(false);
               setError({ ...error, user: userError });
            });
      };
      handleUserFetch();
   }, [props.match.params.username]);

   if (error !== false) return <h1>{error}</h1>;
   if (loading === true && error === false) return <h1>Loading...</h1>;
   if (error === false && loading === false) {
      return (
         <>
            <h1 className="username">{user.id}</h1>
            <span className="meta-info-light">has {user.karma} karma</span>
            <h2>Posts</h2>
            {userPosts.map((post, i) => (
               <Post
                  comments={post.kids ? post.kids.length : 0}
                  key={i}
                  id={post.id}
                  title={post.title}
                  creator={post.by}
                  url={post.url}
               />
            ))}
         </>
      );
   }
};

export default User;
