import React, { useState, useEffect } from "react";
import { CommentForm } from "./CommentForm";
import { getRequest } from "../utils/wagtail";
import useOnScreen from "../hooks/useOnScreen";
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const API_BASE = process.env.NEXT_PUBLIC_WAGTAIL_API_BASE;

function CommentList(props) {
  const {pageContent} = props;
  const {id: objectPk, contentTypeStr: contentType} = pageContent;

  const ref = React.useRef();
  const isVisible = useOnScreen(ref);

  const [commentsCount, setCommentsCount] = useState(0);
  const [loadComments, setLoadComments] = useState([]);

  const queryClient = useQueryClient()

  const COMMENTS_API_URL = `${API_BASE}/api/v1/comments/`;
  const key = [COMMENTS_API_URL, objectPk, contentType];

  const commentQuery = useQuery({
    queryKey: key, queryFn: async ({queryKey}) => {
      const [url, objectPk, contentType] = queryKey;
      return getRequest(url, {
        objectPk: objectPk,
        contentType: contentType,
      });
    }
  })

  const {data} = commentQuery;

  const refreshForNewComment = () => {
    queryClient.invalidateQueries({ queryKey: key })
  };

  useEffect(() => {
    if (data && commentsCount !== data.count) {
      setCommentsCount(data.count);
    }
  }, [data, commentsCount]);

  useEffect(() => {
    if (isVisible && loadComments.length !== commentsCount) {
      getRequest(COMMENTS_API_URL, {
        limit: 10,
        offset: loadComments.length,
        objectPk: objectPk,
        contentType: contentType,
      }).then((res) => {
        // combine
        const newComments = [...loadComments, ...res.results];
        setLoadComments(newComments);
      });
    }
  }, [isVisible, commentsCount, loadComments, objectPk, contentType]);

  return (
    <div className="dark:text-gray-300">
      {loadComments.map((commentObj) => (
        <div className="flex my-4" key={commentObj.pk}>
          {/* eslint-disable-next-line */}
          <div className="flex-none">
            <img
              width={64}
              height={64}
              src="https://via.placeholder.com/64"
              alt="Generic placeholder"
              className="flex-none"
            />
          </div>
          <div className="ml-3">
            <div className="comment-date">
              <strong className="text-primary">{commentObj.userName}</strong>{" "}
              <small>{new Date(commentObj.submitDate).toString()}</small>
            </div>
            <div
              dangerouslySetInnerHTML={{__html: commentObj.prettyComment}}
            />
          </div>
        </div>
      ))}
      <div ref={ref} />
      <CommentForm refreshForNewComment={refreshForNewComment} {...props} />
    </div>
  );
}

export { CommentList };
