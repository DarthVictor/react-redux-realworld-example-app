import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import superagent from "superagent";

//👇 Imports a specific story for the test
import { CommentProps, OwnComment } from "../../stories/Comment.stories";
import { mockStore } from "../../utils/test";

describe("Comment", () => {
  it("renders own comment with delete button", async () => {
    const onResponse = jest.fn();
    const superagentMock = require("superagent-mock")(superagent, [
      {
        pattern: `/articles/${OwnComment.args?.slug}/comments/${OwnComment.args?.comment?.id}`,
        fixtures: () => null,
        callback: function (match: RegExp, data: any) {
          onResponse();
          return { body: data };
        },
      },
    ]);
    const store = mockStore({});
    const { getByTestId } = render(
      <OwnComment {...(OwnComment.args as CommentProps)} store={store} />
    );
    fireEvent.click(getByTestId("DeleteButton"));
    await waitFor(() => expect(onResponse).toBeCalledTimes(1));
    expect(store.getActions()).toEqual([
      {
        subtype: "DELETE_COMMENT",
        type: "ASYNC_START",
      },
      {
        promise: null,
        type: "ASYNC_END",
      },
      {
        commentId: "603423c1a935600e31ff1e2c",
        payload: null,
        type: "DELETE_COMMENT",
      },
    ]);
    superagentMock.unset();
  });
});
