import React from "react";
import { StreamField } from "./StreamField/StreamField";
import { BaseImage } from "./BaseImage";
import { CommentList } from "./CommentList";

function PostDetail(props) {
  const {pageContent} = props;

  return (
    <main role="main" className="w-full sm:w-2/3 md:w-3/4 lg:w-8/12 px-2 mb-4">
      <div className="prose max-w-full dark:prose-dark">
        <BaseImage img={pageContent.headerImage}/>
        <h1>{pageContent.title}</h1>
        <hr/>
        <StreamField value={pageContent.body}/>
      </div>
      <CommentList {...props}/>
    </main>
  );
}

export { PostDetail };
