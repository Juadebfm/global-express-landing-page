import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Blogs from "../components/Blogs";
import BlogPosts from "../components/BlogPosts";
import GetInTouch from "../components/GetInTouch"


const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-1 max-sm:pt-8">
        <Blogs />
      </main>
      <BlogPosts />
      <GetInTouch/>
      <Footer />
    </div>
  );
};

export default Blog;
