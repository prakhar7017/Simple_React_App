import React from 'react';

function PostBox({ post }) {
  return (
    <div
      className="bg-transparent rounded-md p-6 mb-4 flex flex-col border border-transparent hover:border-richblack-200 transition-all cursor-pointer"
      role="article"
      aria-label={`Post titled ${post.title}`}
    >
      <h2 className="text-2xl font-bold mb-2 italic">Title: {post.title}</h2>
      <div className="flex flex-row justify-between mb-2">
        <p className="text-gray-600">Author: {post.author}</p>
        <p className="text-gray-600">Genre: {post.genre}</p>
      </div>
      <div className="text-richblack-200 max-w-fit">Content: {post.content}</div>
    </div>
  );
}

export default PostBox;
