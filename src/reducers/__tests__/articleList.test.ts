import articleListReducer from "../articleList";
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { ARTICLE, FAVORITED_ARTICLE, SECOND_ARTICLE } from "../../mock";

const HOME_PAGE_STATE = {
  tags: [],
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  tab: "feed",
};

const PROFILE_STATE = {
  username: "darthvictor",
  image: "https://static.productionready.io/images/smiley-cyrus.jpg",
  following: false,
};

describe("article reducer", () => {
  it("loads article page", () => {
    const initialState = articleListReducer(undefined, {});

    expect(
      articleListReducer(initialState, {
        type: HOME_PAGE_LOADED,
        payload: [{ tags: [] }, { articles: [], articlesCount: 0 }],
        tab: "feed",
      })
    ).toEqual(HOME_PAGE_STATE);
  });

  it("unloads article page", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, { type: HOME_PAGE_UNLOADED })
    ).toEqual({});
  });

  it("changes tab", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, {
        type: CHANGE_TAB,
        payload: {
          articles: [ARTICLE],
          articlesCount: 1,
        },
        tab: "all",
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: "all",
      tag: null,
    });
  });

  it("sets page", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, {
        type: SET_PAGE,
        payload: {
          articles: [ARTICLE],
          articlesCount: 1,
        },
        page: 2,
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 2,
      tab: "feed",
    });
  });

  it("applies tag filter", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, {
        type: APPLY_TAG_FILTER,
        payload: {
          articles: [ARTICLE],
          articlesCount: 1,
        },
        tag: "main",
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: null,
      tag: "main",
    });
  });

  it("loades profile page", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, {
        type: PROFILE_PAGE_LOADED,
        payload: [
          {
            profile: PROFILE_STATE,
          },
          {
            articles: [ARTICLE],
            articlesCount: 1,
          },
        ],
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: "feed",
    });
  });

  it("unloades profile page", () => {
    const initialState = articleListReducer(
      {
        tags: [],
        articles: [ARTICLE],
        articlesCount: 1,
        currentPage: 0,
        tab: "feed",
      },
      {}
    );

    expect(
      articleListReducer(initialState, {
        type: PROFILE_PAGE_UNLOADED,
      })
    ).toEqual({});
  });

  it("loades favourites page", () => {
    const initialState = articleListReducer(HOME_PAGE_STATE, {});

    expect(
      articleListReducer(initialState, {
        type: PROFILE_FAVORITES_PAGE_LOADED,
        payload: [
          {
            profile: PROFILE_STATE,
          },
          {
            articles: [ARTICLE],
            articlesCount: 1,
          },
        ],
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: "feed",
    });
  });

  it("unloades favourites page", () => {
    const initialState = articleListReducer(
      {
        tags: [],
        articles: [ARTICLE],
        articlesCount: 1,
        currentPage: 0,
        tab: "feed",
      },
      {}
    );

    expect(
      articleListReducer(initialState, {
        type: PROFILE_FAVORITES_PAGE_UNLOADED,
      })
    ).toEqual({});
  });

  it("favourites article", () => {
    const initialState = articleListReducer(
      {
        tags: [],
        articles: [ARTICLE, SECOND_ARTICLE],
        articlesCount: 1,
        currentPage: 0,
        tab: "feed",
      },
      {}
    );

    expect(
      articleListReducer(initialState, {
        type: ARTICLE_FAVORITED,
        payload: {
          article: FAVORITED_ARTICLE,
        },
      })
    ).toEqual({
      tags: [],
      articles: [FAVORITED_ARTICLE, SECOND_ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: "feed",
    });
  });

  it("unfavourites article", () => {
    const initialState = articleListReducer(
      {
        tags: [],
        articles: [FAVORITED_ARTICLE],
        articlesCount: 1,
        currentPage: 0,
        tab: "feed",
      },
      {}
    );

    expect(
      articleListReducer(initialState, {
        type: ARTICLE_UNFAVORITED,
        payload: {
          article: ARTICLE,
        },
      })
    ).toEqual({
      tags: [],
      articles: [ARTICLE],
      articlesCount: 1,
      currentPage: 0,
      tab: "feed",
    });
  });
});
