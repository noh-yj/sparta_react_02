import React, { useRef } from 'react';
import { Button } from '../elements';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

function Upload(props) {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };
  // const uploadFB = () => {
  //   if (!fileInput.current || fileInput.current.files.length === 0) {
  //     window.alert('파일을 선택해 주세요!');
  //   }

  //   dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  // };
  return (
    <>
      <input
        type='file'
        onChange={selectFile}
        ref={fileInput}
        disabled={uploading}
      />
      {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
    </>
  );
}

export default Upload;
