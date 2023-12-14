import {configureStore} from "@reduxjs/toolkit";
import { profileReducer, userReducer } from "./reducer/userReducer";
import { courseReducer } from "./reducer/courseReducer";
import { subscriberReducer } from "./reducer/subscriberReducer";
import { adminReducer } from "./reducer/adminReducer";
import { otherReducer } from "./reducer/otherReducer";

const store = configureStore({
  reducer: {
    user:userReducer,
    profile:profileReducer,
    courses:courseReducer,
    subscribe:subscriberReducer,
    admin:adminReducer,
    other:otherReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
