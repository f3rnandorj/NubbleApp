import {PageApi} from '@api';
import {http, HttpResponse} from 'msw';

import {PostCommentApi, POST_COMMENT_PATH} from '@domain';

import {mockedData} from './mocks';

const FULL_URL = `http://localhost:3333/${POST_COMMENT_PATH}`;

let inMemoryResponse = {...mockedData.mockedPostCommentResponse};

export const postCommentHandlers = [
  http.get(FULL_URL, async () => {
    const response: PageApi<PostCommentApi> = inMemoryResponse;

    return HttpResponse.json(response, {status: 200});
  }),

  //passo a passo do que e feito pelo usuário
  //achar o campo de input
  //digitar a mensagem
  //pressionar em enviar
  //lista atualizar com o novo comentário
  http.post<any, {post_id: number; message: string}>(
    FULL_URL,
    async ({request}) => {
      const body = await request.json();

      const newPostCommentAPI: PostCommentApi = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message,
      };

      inMemoryResponse.data = [newPostCommentAPI, ...inMemoryResponse.data];
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total + 1,
      };

      return HttpResponse.json(newPostCommentAPI, {status: 201});
    },
  ),
];
