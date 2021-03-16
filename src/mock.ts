export const AUTHOR = {
  username: "darthvictor",
  image: "https://static.productionready.io/images/smiley-cyrus.jpg",
  following: false,
};

export const USER = {
  username: "darthvictor",
  email: "victor@example.com",
  token: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  image: "",
};

export const ARTICLE = {
  slug: "post-1-m0h442",
  title: "Post 1",
  description: "Test article 1",
  body: "Text for test article 1",
  createdAt: "2021-02-18T19:16:50.648Z",
  updatedAt: "2021-02-18T19:32:33.631Z",
  tagList: ["tag1", "tag2"],
  favorited: false,
  favoritesCount: 0,
  author: { ...AUTHOR },
};

export const FAVORITED_ARTICLE = {
  ...ARTICLE,
  favorited: true,
  favoritesCount: 1,
};

export const SECOND_ARTICLE = {
  slug: "post-2-2iwqqo",
  title: "Post 2",
  description: "Test Post 2",
  body: "Test text for Post 2",
  createdAt: "2021-02-23T17:04:42.127Z",
  updatedAt: "2021-02-23T17:04:42.127Z",
  tagList: [],
  favorited: false,
  favoritesCount: 0,
  author: { ...AUTHOR },
};

export const OLD_COMMENT = {
  id: "602ebfed48288c2780ccc8f7",
  body: "Comment 1 for Article 1",
  createdAt: "2021-02-18T19:28:45.356Z",
  author: { ...AUTHOR },
};

export const NEW_COMMENT = {
  id: "603423c1a935600e31ff1e2c",
  body: "Comment 2 for Article 1\n\n",
  createdAt: "2021-02-22T21:36:01.892Z",
  author: { ...AUTHOR },
};

export const ERRORS = {
  1: "Network error!",
};

export const SETTINGS_PAYLOAD = {
  user: USER,
};

export const HOME_PAGE_PAYLOAD = [
  {
    tags: ["tag1", "tag3"],
  },
  {
    articles: [],
    articlesCount: 0,
  },
];

export const ALISA_ARTICLE = {
  slug: "post-3-b0kglm",
  title: "Post 3",
  description: "Post 3",
  body: "Text for Post 3",
  createdAt: "2021-03-01T17:16:21.962Z",
  updatedAt: "2021-03-01T17:17:14.841Z",
  tagList: ["tag1", "tag4"],
  favorited: true,
  favoritesCount: 1,
  author: {
    username: "alisa",
    image: "https://static.productionready.io/images/smiley-cyrus.jpg",
    following: false,
  },
};

export const PROFILE_PAGE_PAYLOAD = [
  {
    profile: ALISA_ARTICLE.author,
  },
  {
    articles: ALISA_ARTICLE,
    articlesCount: 1,
  },
];
