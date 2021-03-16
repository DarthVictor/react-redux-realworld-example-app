import configureMockStore from "redux-mock-store";
import { getMiddleware } from "../store";

export const mockStore = configureMockStore(getMiddleware(true));
