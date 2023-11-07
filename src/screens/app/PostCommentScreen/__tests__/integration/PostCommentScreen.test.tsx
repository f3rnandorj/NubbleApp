import React from 'react';

import {server} from '@test';
import {fireEvent, renderScreen, screen} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('integration: PostCommentScreenshots', () => {
  test('when ADDING a comment the list is automatically updated', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(/comentário aleatório/i);

    expect(comment).toBeTruthy();

    //passo a passo do que e feito pelo usuário
    //achar o campo de input
    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);
    //digitar a mensagem
    fireEvent.changeText(inputText, 'novo comentário');
    //pressionar em enviar
    fireEvent.press(screen.getByText(/enviar/i));
    //lista atualizar com o novo comentário
    const newComment = await screen.findByText(/novo comentário/);
    expect(newComment).toBeTruthy();

    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(2);
  });
});
