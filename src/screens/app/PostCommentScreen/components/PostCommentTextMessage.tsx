import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {TextMessage} from '@components';
import {usePostCommentCreate} from '@domain';

interface Props {
  postId: number;
  onAddComment: () => void;
}

export function PostCommentTextMessage({postId, onAddComment}: Props) {
  const [message, setMessage] = useState('');

  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      setMessage('');
      Keyboard.dismiss();
      onAddComment();
    },
  });

  return (
    <TextMessage
      onPressSend={createComment}
      value={message}
      onChangeText={setMessage}
      placeholder="Adicione um comentário"
    />
  );
}
