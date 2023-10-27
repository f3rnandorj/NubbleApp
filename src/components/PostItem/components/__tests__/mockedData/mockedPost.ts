import {Post} from '@domain';

export const mockedPost: Post = {
  id: 1,
  imageURL: 'fake-url',
  commentCount: 3,
  favoriteCount: 2,
  reactionCount: 3,
  text: 'this is the text (pos description)',
  author: {
    id: 2,
    name: 'Fernando',
    profileURL: 'https://example.com',
    userName: 'fernandoRj',
  },
};
