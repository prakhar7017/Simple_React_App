import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../Service/Operation/auth.js";
import InfiniteScroll from "react-infinite-scroll-component";
import PostBox from "../Components/PostBox";
import "animate.css"

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchMorePosts = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const response = await fetchPosts(token);
        setPosts((prevPosts) => [...prevPosts, ...response?.rows]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, [token]);
  return (
    <div className="relative flex gap-8 flex-col w-11/12 mx-auto items-center text-white justify-between max-w-max mt-[5rem]">
      <div className="p-2 m-5">
        <h1 className="top-[4rem] text-pink-300 text-2xl text-center mb-10 animate__animated animate__slideInRight animate__slow">
          Posts
        </h1>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          style={{ overflowX: "hidden" }}
        >
          <div className="w-full">
            {posts.map((post, index) => (
              <div className="w-full">
                <PostBox key={index} post={post} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Posts;
