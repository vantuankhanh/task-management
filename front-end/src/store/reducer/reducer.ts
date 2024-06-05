import { createAction, createReducer } from "@reduxjs/toolkit";
import storeType from "../type";

interface IReducerState {
  isLoading: boolean;
  isLoadingMessage: boolean;
}

const initialState = {
  isLoading: false,
  isLoadingMessage: false,
} satisfies IReducerState as IReducerState;

export const setLoading = createAction<boolean>(storeType.setLoading);

export const setLoadingMessage = createAction<boolean>(
  storeType.setLoadingMessage
);

export const loadingReducer = createReducer(initialState, (build) => {
  build.addCase(setLoading, (state, action) => {
    state.isLoading = action.payload;
  });
  build.addCase(setLoadingMessage, (state, action) => {
    state.isLoadingMessage = action.payload;
  });
});
