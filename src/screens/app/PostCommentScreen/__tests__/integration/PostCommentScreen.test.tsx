import React from 'react';
import {Alert, AlertButton} from 'react-native';

import {authCredentialsStorage} from '@services';
import {server, resetInMemoryResponse} from '@test';
import {mockedPostComment} from '@test';
import {
  act,
  fireEvent,
  renderScreen,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

afterEach(() => {
  server.resetHandlers();
  resetInMemoryResponse();
  jest.useRealTimers();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
});

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
    expect(comments.length).toBe(3);
  });
  test('when DELETING a comment the list is automatically updated and a toast message is displayed', async () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedPostComment.mateusAuthCredentials);

    let mockedConfirm: AlertButton['onPress'];
    const mockedAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0]) {
          mockedConfirm = buttons[0].onPress;
        }
      });

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

    //esperar a lista carregar
    //identificar o comentário que será deletado
    const commentElement = await screen.findByText(
      mockedPostComment.mateusPostCommentAPI.message,
      {exact: false},
    );
    expect(commentElement).toBeTruthy();

    //long press no comentário
    fireEvent(commentElement, 'longPress');
    expect(mockedAlert).toHaveBeenCalled();

    //pressionar em "confirmar" no alert
    mockedConfirm && mockedConfirm();

    //verificar se a lista foi atualizada (comentário sumiu?)
    await waitForElementToBeRemoved(() =>
      screen.getByText(mockedPostComment.mateusPostCommentAPI.message, {
        exact: false,
      }),
    );

    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(1);

    //verificar se foi exibida a toast message
    await waitFor(() =>
      expect(screen.getByTestId('toast-message')).toBeTruthy(),
    );

    act(() => jest.runAllTimers());

    expect(screen.queryByTestId('toast-message')).toBeNull();
  });
});
