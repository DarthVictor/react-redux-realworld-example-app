import profileReducer from '../profile'
import { FOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from '../../constants/actionTypes';

const ALISA_ARTICLE = {
    slug: 'post-3-b0kglm',
    title: 'Post 3',
    description: 'Post 3',
    body: 'Text for Post 3',
    createdAt: '2021-03-01T17:16:21.962Z',
    updatedAt: '2021-03-01T17:17:14.841Z',
    tagList: [
      'tag1',
      'tag4'
    ],
    favorited: true,
    favoritesCount: 1,
    author: {
      username: 'alisa',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false
    }
};

export const PROFILE_PAGE_PAYLOAD = [
    {
      profile: ALISA_ARTICLE.author
    },
    {
      articles: ALISA_ARTICLE,
      articlesCount: 1
    }
]
describe('profile reducer', () => {
    it('loads profile page', () => {
        const initialState = profileReducer(undefined, {});

        expect(profileReducer(initialState, 
            { type: PROFILE_PAGE_LOADED, payload: PROFILE_PAGE_PAYLOAD,  }
        )).toEqual(PROFILE_PAGE_PAYLOAD[0].profile);
    })

    it('unloads profile page', () => {
        const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

        expect(profileReducer(initialState, 
            { type: PROFILE_PAGE_UNLOADED}
        )).toEqual({});
    })

    it('follows Alisa', () => {
        const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

        expect(profileReducer(initialState, 
            { type: FOLLOW_USER, payload: { profile: { ...PROFILE_PAGE_PAYLOAD[0].profile, following: true }}}
        )).toEqual({...PROFILE_PAGE_PAYLOAD[0].profile, following: true  });
    })

    it('unfollows Alisa', () => {
        const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

        expect(profileReducer(initialState, 
            { type: FOLLOW_USER, payload: { profile: { ...PROFILE_PAGE_PAYLOAD[0].profile, following: false }}}
        )).toEqual({...PROFILE_PAGE_PAYLOAD[0].profile, following: false  });
    })
});