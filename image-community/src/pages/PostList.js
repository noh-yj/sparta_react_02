import React, { useEffect } from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import { Grid } from '../elements';

function PostList(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid bg={'#eff6ff'} padding='20px 0px 20px 0px'>
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((val, idx) => {
            if (val.user_info.user_id === user_info?.uid) {
              return (
                <Grid
                  bg='#fff'
                  _onClick={() => {
                    history.push(`/post/${val.id}`);
                  }}
                  key={val.id}
                >
                  <Post {...val} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  bg='#fff'
                  _onClick={() => {
                    history.push(`/post/${val.id}`);
                  }}
                  key={val.id}
                >
                  <Post {...val} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </>
  );
}

export default PostList;
