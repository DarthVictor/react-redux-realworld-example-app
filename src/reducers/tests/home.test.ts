import homeReducer from '../home'
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
} from '../../constants/actionTypes';

export const HOME_PAGE_PAYLOAD = [
    {
        tags: ['tag1', 'tag3']
    },
    {
        articles: [],
        articlesCount: 0
    }
];

describe('home reducer', () => {
    it('loads home page', () => {
        const initialState = homeReducer(undefined, {});

        expect(homeReducer(initialState, 
            { type: HOME_PAGE_LOADED, payload: HOME_PAGE_PAYLOAD, tab: 'feed', }
        )).toEqual(HOME_PAGE_PAYLOAD[0]);
    })

    it('unloads home page', () => {
        const initialState = homeReducer(HOME_PAGE_PAYLOAD[0], {});

        expect(homeReducer(initialState, { type: HOME_PAGE_UNLOADED, })).toEqual({});
    });
});