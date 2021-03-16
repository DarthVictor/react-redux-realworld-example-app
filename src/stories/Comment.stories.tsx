import React from "react";
import { Story, Meta } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { Comment } from "../components/Article/Comment";
import { ARTICLE, NEW_COMMENT, USER } from "../mock";
import { mockStore } from "../utils/test";

const meta: Meta = {
  title: "Conduit/Comment",
  component: Comment,
};

export default meta;

export interface CommentProps {
  comment: typeof NEW_COMMENT;
  currentUser?: typeof USER;
  slug?: string;
}

export interface CommentStoryProps extends CommentProps {
  store?: ReturnType<typeof mockStore>;
}

const Template: Story<CommentStoryProps> = ({ store, ...args }) => (
  <MemoryRouter>
    <Provider store={store || mockStore({})}>
      <div className="article-page">
        <Comment {...args} />
      </div>
    </Provider>
  </MemoryRouter>
);

export const Simple = Template.bind({});
Simple.args = {
  comment: NEW_COMMENT,
};

export const OwnComment = Template.bind({});
OwnComment.args = {
  ...Simple.args,
  currentUser: USER,
  slug: ARTICLE.slug,
};
