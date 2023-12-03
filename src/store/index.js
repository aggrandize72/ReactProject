import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import administrator from "./slices/administrator";
import student from "./slices/student";
import teacher from "./slices/teacher";

const persistConfig = {
  key: "user",
  storage: storageSession,
};

const allReducers = combineReducers({
  administrator,
  student,
  teacher,
});

const persistedUserReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: persistedUserReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
