import { APP_LOAD, ARTICLE_PAGE_UNLOADED, ARTICLE_SUBMITTED, DELETE_ARTICLE, EDITOR_PAGE_UNLOADED, HOME_PAGE_UNLOADED, LOGIN, LOGIN_PAGE_UNLOADED, LOGOUT, PROFILE_FAVORITES_PAGE_UNLOADED, PROFILE_PAGE_UNLOADED, REDIRECT, REGISTER, REGISTER_PAGE_UNLOADED, SETTINGS_PAGE_UNLOADED, SETTINGS_SAVED } from '../../constants/actionTypes';
import commonReducer from '../common';
import { ARTICLE, ERRORS } from './article.test';
import { SETTINGS_PAYLOAD } from './settings.test';

describe('common reducer', () => {
    it('passes app lifecycle', () => {

        const initialState = commonReducer(undefined, {});
        const afterLoadStateLogin = commonReducer(initialState, { type: APP_LOAD, payload: SETTINGS_PAYLOAD, token: SETTINGS_PAYLOAD.user.token, skipTracking: true });
        
        expect(afterLoadStateLogin).toEqual({
            appName: 'Conduit',
            token: SETTINGS_PAYLOAD.user.token,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: SETTINGS_PAYLOAD.user
        });

        const afterLoadState = commonReducer(initialState, { type: APP_LOAD, payload: null, token: null, skipTracking: true });

        expect(afterLoadState).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: null
        });

        const afterLogoutState = commonReducer(afterLoadStateLogin, { type: LOGOUT });

        expect(afterLogoutState).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: null,
            redirectTo: '/',
        });

        expect(commonReducer(afterLogoutState, { type: REDIRECT })).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: null,
            redirectTo: null,
        });

        const afterArticleSubmitted = commonReducer(afterLoadStateLogin, { type: ARTICLE_SUBMITTED, payload: { article: ARTICLE} });

        expect(afterArticleSubmitted).toEqual({
            appName: 'Conduit',
            token: SETTINGS_PAYLOAD.user.token,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: SETTINGS_PAYLOAD.user,
            redirectTo: '/article/post-1-m0h442',
        });


        expect(commonReducer(afterLoadState, 
            { type: SETTINGS_SAVED, payload: SETTINGS_PAYLOAD }
        )).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: SETTINGS_PAYLOAD.user,
            redirectTo: '/',
        });        
        
        expect(commonReducer(afterLoadState, 
            { type: SETTINGS_SAVED, payload: { errors: ERRORS }, error: true }
        )).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: null,
            redirectTo: null,
        });

        [LOGIN, REGISTER].forEach(actionType => {
            expect(commonReducer(afterLoadState, 
                { type: actionType, error: false, payload: SETTINGS_PAYLOAD }
            )).toEqual({
                appName: 'Conduit',
                viewChangeCounter: 0,
                appLoaded: true,
                redirectTo: '/',
                token: SETTINGS_PAYLOAD.user.token,
                currentUser: SETTINGS_PAYLOAD.user,
            });

            expect(commonReducer(afterLoadStateLogin, 
                { type: actionType, error: true, payload: { errors: ERRORS }}
            )).toEqual({ 
                appName: 'Conduit',
                viewChangeCounter: 0,
                appLoaded: true,
                redirectTo: null,
                token: null,
                currentUser: null,
            });
        });
        
        expect(commonReducer(afterLoadState, { type: DELETE_ARTICLE })).toEqual({
            appName: 'Conduit',
            token: null,
            viewChangeCounter: 0,
            appLoaded: true,
            currentUser: null,
            redirectTo: '/',
        });
        
        [ARTICLE_PAGE_UNLOADED, 
            EDITOR_PAGE_UNLOADED, 
            HOME_PAGE_UNLOADED, 
            PROFILE_PAGE_UNLOADED, 
            PROFILE_FAVORITES_PAGE_UNLOADED, 
            SETTINGS_PAGE_UNLOADED, 
            LOGIN_PAGE_UNLOADED, 
            REGISTER_PAGE_UNLOADED
        ].forEach(actionType => {
            expect(commonReducer(afterLoadStateLogin, 
                { type: actionType }
            )).toEqual({
                appName: 'Conduit',
                viewChangeCounter: 1,
                appLoaded: true,
                token: SETTINGS_PAYLOAD.user.token,
                currentUser: SETTINGS_PAYLOAD.user,
            });
        });
    });
});