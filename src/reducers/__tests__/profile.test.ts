import profileReducer from "../profile";
import {
  FOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { PROFILE_PAGE_PAYLOAD } from "../../mock";

describe("profile reducer", () => {
  it("loads profile page", () => {
    const initialState = profileReducer(undefined, {});

    expect(
      profileReducer(initialState, {
        type: PROFILE_PAGE_LOADED,
        payload: PROFILE_PAGE_PAYLOAD,
      })
    ).toEqual(PROFILE_PAGE_PAYLOAD[0].profile);
  });

  it("unloads profile page", () => {
    const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

    expect(
      profileReducer(initialState, { type: PROFILE_PAGE_UNLOADED })
    ).toEqual({});
  });

  it("follows Alisa", () => {
    const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

    expect(
      profileReducer(initialState, {
        type: FOLLOW_USER,
        payload: {
          profile: { ...PROFILE_PAGE_PAYLOAD[0].profile, following: true },
        },
      })
    ).toEqual({ ...PROFILE_PAGE_PAYLOAD[0].profile, following: true });
  });

  it("unfollows Alisa", () => {
    const initialState = profileReducer(PROFILE_PAGE_PAYLOAD[0].profile, {});

    expect(
      profileReducer(initialState, {
        type: FOLLOW_USER,
        payload: {
          profile: { ...PROFILE_PAGE_PAYLOAD[0].profile, following: false },
        },
      })
    ).toEqual({ ...PROFILE_PAGE_PAYLOAD[0].profile, following: false });
  });
});
