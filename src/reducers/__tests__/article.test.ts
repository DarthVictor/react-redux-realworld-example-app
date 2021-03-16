import articleReducer from "../article";
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../../constants/actionTypes";
import { ARTICLE, ERRORS, NEW_COMMENT, OLD_COMMENT } from "../../mock";

describe("article reducer", () => {
  it("loads article page", () => {
    const initialState = articleReducer(undefined, {});

    expect(
      articleReducer(initialState, {
        type: ARTICLE_PAGE_LOADED,
        payload: [{ article: ARTICLE }, { comments: [OLD_COMMENT] }],
      })
    ).toEqual({ article: ARTICLE, comments: [OLD_COMMENT] });
  });

  it("unloads article page", () => {
    const initialState = articleReducer(
      { article: ARTICLE, comments: [OLD_COMMENT] },
      {}
    );

    expect(
      articleReducer(initialState, { type: ARTICLE_PAGE_UNLOADED })
    ).toEqual({});
  });

  it("adds first comment to article", () => {
    const initialState = articleReducer({ article: ARTICLE }, {});

    expect(
      articleReducer(initialState, {
        type: ADD_COMMENT,
        payload: { comment: OLD_COMMENT },
      })
    ).toEqual({
      article: ARTICLE,
      comments: [OLD_COMMENT],
      commentErrors: null,
    });
  });

  it("adds second comment to article", () => {
    const initialState = articleReducer(
      { article: ARTICLE, comments: [OLD_COMMENT] },
      {}
    );

    expect(
      articleReducer(initialState, {
        type: ADD_COMMENT,
        payload: { comment: NEW_COMMENT },
      })
    ).toEqual({
      article: ARTICLE,
      comments: [OLD_COMMENT, NEW_COMMENT],
      commentErrors: null,
    });
  });

  it("adds comment to article with error", () => {
    const initialState = articleReducer(
      { article: ARTICLE, comments: [OLD_COMMENT] },
      {}
    );

    expect(
      articleReducer(initialState, {
        type: ADD_COMMENT,
        error: true,
        payload: { errors: ERRORS },
      })
    ).toEqual({ article: ARTICLE, comments: null, commentErrors: ERRORS });
  });

  it("deletes comment to article", () => {
    const initialState = articleReducer(
      { article: ARTICLE, comments: [OLD_COMMENT, NEW_COMMENT] },
      {}
    );

    expect(
      articleReducer(initialState, {
        type: DELETE_COMMENT,
        payload: null,
        commentId: "603423c1a935600e31ff1e2c",
      })
    ).toEqual({ article: ARTICLE, comments: [OLD_COMMENT] });
  });
});
