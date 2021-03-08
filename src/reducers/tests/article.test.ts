import articleReducer from '../article'
import { 
    ARTICLE_PAGE_LOADED, 
    ARTICLE_PAGE_UNLOADED, 
    ADD_COMMENT, 
    DELETE_COMMENT,
} from '../../constants/actionTypes';

export const ARTICLE = {
    slug: 'post-1-m0h442',
    title: 'Post 1',
    description: 'Test article 1',
    body: 'Text for test article 1',
    createdAt: '2021-02-18T19:16:50.648Z',
    updatedAt: '2021-02-18T19:32:33.631Z',
    tagList: [
        'tag1',
        'tag2',
    ],
    favorited: false,
    favoritesCount: 0,
    author: {
        username: 'darthvictor',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false
    }
};

const OLD_COMMENT = {
    id: '602ebfed48288c2780ccc8f7',
    body: 'Comment 1 for Article 1',
    createdAt: '2021-02-18T19:28:45.356Z',
    author: {
        username: 'darthvictor',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false
    }
}

const NEW_COMMENT = {
    id: '603423c1a935600e31ff1e2c',
    body: 'Comment 2 for Article 1\n\n',
    createdAt: '2021-02-22T21:36:01.892Z',
    author: {
        username: 'darthvictor',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false
    }
};

export const ERRORS = {
    1: 'Network error!',
}

describe('article reducer', () => {
    it('loads article page', () => {
        const initialState = articleReducer(undefined, {});

        expect(articleReducer(initialState, 
            { type: ARTICLE_PAGE_LOADED, payload: [{ article: ARTICLE }, { comments: [OLD_COMMENT] }] }
        )).toEqual({ article: ARTICLE, comments:  [OLD_COMMENT] });
    })

    it('unloads article page', () => {
        const initialState = articleReducer({ article: ARTICLE, comments:  [OLD_COMMENT] }, {});

        expect(articleReducer(initialState, { type: ARTICLE_PAGE_UNLOADED, })).toEqual({});
    })

    it('adds first comment to article', () => {
        const initialState = articleReducer({ article: ARTICLE }, {});

        expect(articleReducer(initialState, { type: ADD_COMMENT, payload: {comment: OLD_COMMENT } })).toEqual(
            { article: ARTICLE, comments:  [OLD_COMMENT], commentErrors: null }
        );
    })

    it('adds second comment to article', () => {
        const initialState = articleReducer({ article: ARTICLE, comments:  [OLD_COMMENT] }, {});

        expect(articleReducer(initialState, { type: ADD_COMMENT, payload: {comment: NEW_COMMENT } })).toEqual(
            { article: ARTICLE, comments:  [OLD_COMMENT, NEW_COMMENT], commentErrors: null }
        );
    })

    it('adds comment to article with error', () => {
        const initialState = articleReducer({ article: ARTICLE, comments:  [OLD_COMMENT] }, {});

        expect(articleReducer(initialState, { type: ADD_COMMENT, error: true, payload: { errors: ERRORS } })).toEqual(
            { article: ARTICLE, comments: null, commentErrors: ERRORS }
        );
    })

    it('deletes comment to article', () => {
        const initialState = articleReducer({ article: ARTICLE, comments:  [OLD_COMMENT, NEW_COMMENT] }, {});

        expect(articleReducer(initialState, {   type: DELETE_COMMENT, payload: null, commentId: '603423c1a935600e31ff1e2c' })).toEqual(
            { article: ARTICLE, comments: [OLD_COMMENT] }
        );
    })
});