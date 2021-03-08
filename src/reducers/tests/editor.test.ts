import editorReducer from '../editor'
import { ADD_TAG, ARTICLE_SUBMITTED, ASYNC_START, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, SETTINGS_SAVED, UPDATE_FIELD_EDITOR } from '../../constants/actionTypes';
import { ARTICLE, ERRORS } from './article.test';

const EDITOR_WITH_ARTICLE_STATE = {
    articleSlug: ARTICLE.slug,
    title: ARTICLE.title,
    description: ARTICLE.description,
    body: ARTICLE.body,
    tagInput: '',
    tagList: ARTICLE.tagList,
}

describe('editor reducer', () => {
    it('loads editor page', () => {
        const initialState = editorReducer(undefined, {});

        expect(editorReducer(initialState, 
            { type: EDITOR_PAGE_LOADED, payload: { article: ARTICLE } }
        )).toEqual(EDITOR_WITH_ARTICLE_STATE);
        expect(editorReducer(initialState, 
            { type: EDITOR_PAGE_LOADED }
        )).toEqual({
            articleSlug: '',
            title: '',
            description: '',
            body: '',
            tagInput: '',
            tagList: [],
        });
    });

    it('loads editor page', () => {
        const initialState = editorReducer(EDITOR_WITH_ARTICLE_STATE, {});

        expect(editorReducer(initialState, 
            { type: EDITOR_PAGE_UNLOADED }
        )).toEqual({});
    });

    it('submits article', () => {
        const initialState = editorReducer(EDITOR_WITH_ARTICLE_STATE, {});
        const afterSubmitBegin = editorReducer(initialState, { type: ASYNC_START, subtype: ARTICLE_SUBMITTED });
        expect(afterSubmitBegin).toEqual({ ...EDITOR_WITH_ARTICLE_STATE, inProgress: true });
        expect(editorReducer(afterSubmitBegin, { type: ARTICLE_SUBMITTED }))
            .toEqual({ ...EDITOR_WITH_ARTICLE_STATE, inProgress: null, errors: null });
        expect(editorReducer(afterSubmitBegin, { type: ARTICLE_SUBMITTED, error: true, payload: { errors: ERRORS } }))
            .toEqual({ ...EDITOR_WITH_ARTICLE_STATE, inProgress: null, errors: ERRORS  });
    });

    it('doesn`t react on other ASYNC subtypes', () => {
        const initialState = editorReducer(EDITOR_WITH_ARTICLE_STATE, {});

        expect(editorReducer(initialState, 
            { type: ASYNC_START, subtype: SETTINGS_SAVED }
        )).toBe(initialState);
    })
    
    it('adds tag', () => {
        const initialState = editorReducer({ ...EDITOR_WITH_ARTICLE_STATE, tagInput: 'new tag' }, {});

        expect(editorReducer(initialState, 
            { type: ADD_TAG }
        )).toEqual({ ...EDITOR_WITH_ARTICLE_STATE, tagList: ARTICLE.tagList.concat('new tag'), tagInput: '' });
    });

    it('removes tag', () => {
        const initialState = editorReducer(EDITOR_WITH_ARTICLE_STATE, {});

        expect(editorReducer(initialState, 
            { type: REMOVE_TAG, tag: 'tag1' }
        )).toEqual({ ...EDITOR_WITH_ARTICLE_STATE, tagList: ['tag2'] });
    });

    it('updates editor field', () => {
        const initialState = editorReducer(EDITOR_WITH_ARTICLE_STATE, {});

        expect(editorReducer(initialState, 
            { type: UPDATE_FIELD_EDITOR, key: 'body', value: 'new body' }
        )).toEqual({ ...EDITOR_WITH_ARTICLE_STATE, body: 'new body' });
    });
});