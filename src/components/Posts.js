import React, { useState, useEffect } from "react";
import { fetchMainPosts } from "../utils/api";
import Post from "./Post";

const Posts = ({ type }) => {
   const [posts, setPosts] = useState(null);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const handleFetch = async () => {
         setPosts(null);
         setError(false);
         setLoading(true);

         fetchMainPosts(type)
            .then((posts) => {
               setPosts(posts);
               setLoading(false);
               setError(false);
            })
            .catch(({ message }) => {
               setError(message);
               setLoading(false);
            });
      };
      handleFetch();
   }, [type]);

   if (error !== false) return <h1>{error}</h1>;
   if (loading === true && error === false) return <h1>Loading...</h1>;
   if (error === false && loading === false) {
      return posts.map((post, i) => (
         <Post
            comments={post.kids ? post.kids.length : 0}
            key={i}
            id={post.id}
            title={post.title}
            creator={post.by}
            url={post.url}
         />
      ));
   }
};

export default Posts;
