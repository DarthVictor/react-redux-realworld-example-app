import {
  ASYNC_START,
  SETTINGS_PAGE_UNLOADED,
  SETTINGS_SAVED,
} from "../../constants/actionTypes";
import { SETTINGS_PAYLOAD, ERRORS } from "../../mock";
import settingsReducer from "../settings";

describe("settings reducer", () => {
  it("saves settings", () => {
    const initialState = settingsReducer(undefined, {});

    expect(
      settingsReducer(initialState, {
        type: SETTINGS_SAVED,
        payload: SETTINGS_PAYLOAD,
      })
    ).toEqual({ inProgress: false, errors: null });
  });

  it("doesn`t save settings on error", () => {
    const initialState = settingsReducer(undefined, {});

    expect(
      settingsReducer(initialState, {
        type: SETTINGS_SAVED,
        payload: { errors: ERRORS },
        error: true,
      })
    ).toEqual({ inProgress: false, errors: ERRORS });
  });

  it("unloads settings page", () => {
    const initialState = settingsReducer(
      { inProgress: false, errors: null },
      {}
    );

    expect(
      settingsReducer(initialState, { type: SETTINGS_PAGE_UNLOADED })
    ).toEqual({});
  });

  it("sets inProgress on load", () => {
    const initialState = settingsReducer(undefined, {});

    expect(settingsReducer(initialState, { type: ASYNC_START })).toEqual({
      inProgress: true,
    });
  });
});
