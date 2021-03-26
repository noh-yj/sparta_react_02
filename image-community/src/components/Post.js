import React from 'react';
import { Grid, Image, Text } from '../elements';

function Post(props) {
  return (
    <>
      <Grid>
        <Grid is_flex>
          <Image shape='circle' src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding='16px'>
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape='rectangle' src={props.image_url} />
        </Grid>
        <Grid padding='16px'>
          <Text margin='0px' bold>
            댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </>
  );
}

Post.defaultProps = {
  user_info: {
    user_name: 'ujin',
    user_profile: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  },
  image_url: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  contents: 'hello',
  comment_cnt: 10,
  insert_dt: '2021-03-26 10:00:00',
};

export default Post;
