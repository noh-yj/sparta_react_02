import React, { useState } from 'react';
import { Button, Grid, Input } from '../elements';
import { actionCreators as commentActions } from '../redux/modules/comment';
import { useDispatch, useSelector } from 'react-redux';

function CommentWrite(props) {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = useState();
  const { post_id } = props;

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    setCommentText('');
    dispatch(commentActions.addCommentFB(post_id, comment_text));
  };

  return (
    <>
      <Grid padding='16px'>
        <Grid is_flex>
          <Input
            placeholder='댓글 내용을 입력해주세요 :)'
            _onChange={onChange}
            value={comment_text}
            onSubmit={write}
            is_Submit
          />
          <Button width='50px' margin='0px 2px 0px 2px' _onClick={write}>
            작성
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CommentWrite;
