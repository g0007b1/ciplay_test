import {BaseThunkType, InferActionsType} from "../../store";
import {api} from "../../../api";
import {UserDataType} from "../../../utils/types";

const initialState = {
    loggedIn: false,
    email: '' as string,
    password: '' as string,
    showNotificationRegister: 0 as number,
    showNotificationLogin: 0 as number,
    showNotificationChangePassword: false as boolean
}

type initialStateType = typeof initialState;

export const userReducer = (state = initialState, action:ActionsUserType):initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return ({
                ...state,
                loggedIn: true,
                email: action.data.email,
                password: action.data.password
            })
        }
        case 'LOGOUT': {
            return ({
                ...state,
                loggedIn: false,
                email: '',
                password: ''
            })
        }
        case 'SHOW_HIDE_NOTIFICATION_REGISTRATION': {
            return ({
                ...state,
                showNotificationRegister: action.typeOfNotification
            })
        }
        case 'SHOW_HIDE_NOTIFICATION_LOGIN': {
            return ({
                ...state,
                showNotificationLogin: action.typeOfNotification
            })
        }
        case "SET_NEW_PASSWORD": {
            return ({
                ...state,
                password: action.newPassword
            })
        }
        case 'CHANGE_PASSWORD_SUCCESS': {
            return ({
                ...state,
                showNotificationChangePassword: action.typeOfNotification
            })
        }
        default: return state
    }
}

type ThunkType = BaseThunkType<ActionsUserType>
export type ActionsUserType = InferActionsType<typeof userActions>


export const userActions = {
    setUserData: (data: UserDataType) => ({type: 'SET_USER_DATA', data} as const),
    logout: () => ({type: 'LOGOUT'} as const),
    regSuccess: (typeOfNotification: number) => ({type: 'SHOW_HIDE_NOTIFICATION_REGISTRATION', typeOfNotification} as const),
    logSuccess: (typeOfNotification: number) => ({type: 'SHOW_HIDE_NOTIFICATION_LOGIN', typeOfNotification} as const),
    setNewPassword: (newPassword: string) => ({type: 'SET_NEW_PASSWORD', newPassword} as const),
    changePasswordSuccess: (typeOfNotification: boolean) => ({type: 'CHANGE_PASSWORD_SUCCESS', typeOfNotification} as const),
}

export const changePassword = (data:UserDataType):ThunkType => {
    return async (dispatch) => {
        let response = await api.changePassword(data)
        if (response.resultCode === 0) {
            dispatch(userActions.changePasswordSuccess(true))
            setTimeout(() => {
                dispatch(userActions.changePasswordSuccess(false))
            }, 2000)
            dispatch(userActions.setNewPassword(response.password))
        }

    }
}

export const login = (data:UserDataType): ThunkType => {
    return async (dispatch) => {
        let response = await api.login(data)
        if (response.resultCode === 0) {
            dispatch(userActions.logSuccess(1))
            setTimeout(() => {
                dispatch(userActions.logSuccess(0))
            }, 2000)
            dispatch(userActions.setUserData(response.attrs));
        } else {
            dispatch(userActions.logSuccess(2))
            setTimeout(() => {
                dispatch(userActions.logSuccess(0))
            }, 2000)
        }
    }
}

export const registerUser = (data: UserDataType):ThunkType => {
    return async (dispatch) => {
        let responce = await api.registerUser(data)
        if (responce.resultCode === 0) {
            dispatch(userActions.regSuccess(1))
            setTimeout(() => {
                dispatch(userActions.regSuccess(0))
            }, 2000)
        } else {
            dispatch(userActions.regSuccess(2))
            setTimeout(() => {
                dispatch(userActions.regSuccess(0))
            }, 2000)
        }
    }
}