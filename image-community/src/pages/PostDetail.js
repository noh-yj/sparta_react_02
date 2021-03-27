import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import Permit from '../shared/Permit';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

function PostDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((val) => val.id === id);
  const post = post_list[post_idx];

  useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <>
      {post && (
        <>
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
        </>
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>

      <CommentList post_id={id} />
    </>
  );
}

export default PostDetail;
