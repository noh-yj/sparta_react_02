import React, { useEffect } from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';

function PostList(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((val, idx) => {
          if (val.user_info.user_id === user_info?.uid) {
            return <Post key={val.id} {...val} is_me />;
          } else {
            return <Post key={val.id} {...val} />;
          }
        })}
      </InfinityScroll>
    </>
  );
}

export default PostList;
