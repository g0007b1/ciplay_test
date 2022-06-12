import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {persistReducer} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from 'redux-persist/lib/storage'
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {userReducer} from "./reducers/user-reducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['showNotificationRegister', 'showNotificationLogin']
};


const RootReducers = combineReducers({
    userReducer
})

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, RootReducers)

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
type RootReduserType = typeof RootReducers
export type AppStateType = ReturnType<RootReduserType>
export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
let persistor = persistStore(store)

export {store, persistor}