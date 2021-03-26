import React from 'react';
import { Grid, Image, Text } from '../elements';

function CommentList(props) {
  return (
    <>
      <Grid padding='16px'>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </>
  );
}

export default CommentList;

const CommentItem = (props) => {
  const {
    user_profile,
    user_name,
    user_id,
    post_id,
    insert_dt,
    contents,
  } = props;
  return (
    <>
      <Grid is_flex>
        <Grid is_flex width='auto'>
          <Image shape='circle' />
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid margin='0px 4px 0px 4px' is_flex>
          <Text margin='0px'>{contents}</Text>
          <Text margin='0px'>{insert_dt}</Text>
        </Grid>
      </Grid>
    </>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'ujin',
  user_id: '',
  post_id: 1,
  contents: 'hello world~~',
  insert_dt: '2021-01-01 19:00:00',
};
