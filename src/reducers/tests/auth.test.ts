import authReducer from '../auth'
import { 
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH,
    ARTICLE_SUBMITTED
} from '../../constants/actionTypes';
import { ERRORS } from './article.test';

describe('auth reducer', () => {
    it('registers and logins new user', () => {
        const initialState = authReducer(undefined, {});

        [LOGIN, REGISTER].forEach(actionType => {
            expect(authReducer(initialState, 
                { type: ASYNC_START, subtype: actionType}
            )).toEqual({ inProgress: true });
            expect(authReducer({ inProgress: true }, 
                { type: actionType, error: false }
            )).toEqual({ inProgress: false, errors: null });
            expect(authReducer({ inProgress: true }, 
                { type: actionType, error: true, payload: { errors: ERRORS }}
            )).toEqual({ inProgress: false, errors: ERRORS });
        })
    })

    it('unloads registers and logins page', () => {
        const initialState = authReducer({ inProgress: false, errors: null }, {});

        [LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED].forEach(actionType => {
            expect(authReducer(initialState, 
                { type: actionType }
            )).toEqual({ });
        })
    })

    it('doesn`t react on other ASYNC subtypes', () => {
        const initialState = authReducer({ inProgress: false, errors: null }, {});

        expect(authReducer(initialState, 
            { type: ASYNC_START, subtype: ARTICLE_SUBMITTED }
        )).toBe(initialState);
    })

    it('updates auth field', () => {
        const initialState = authReducer({ inProgress: false, errors: null }, {});

        expect(authReducer(initialState, { type: UPDATE_FIELD_AUTH, key:"Test key", value: "Test value" }))
        .toEqual({ ...initialState, "Test key": "Test value" });
    })
})