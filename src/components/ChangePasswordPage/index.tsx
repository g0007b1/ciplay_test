import {useForm} from "react-hook-form";
import {FC, useRef} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {changePassword} from "../../redux/reducers/user-reducer";
import {UserDataType} from "../../utils/types";

type Inputs = {
    oldPassword: string,
    newPassword: string,
    repeatedPassword: string
};

type Props = {
    currentPassword: string,
    loggedIn: boolean,
    changePassword: (data: UserDataType) => void,
    email: string,
    showNot: boolean
}

const ChangePasswordPage: FC<Props> = ({currentPassword, loggedIn, changePassword, email, showNot}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const password = useRef({});
    password.current = watch("newPassword");

    const onSubmit = (data: Inputs) => {
        console.log(data)
        let {newPassword} = data
        let password = newPassword
        changePassword({password, email})
    }

    if (!loggedIn)
        return <Navigate to={'/home'}/>


    return (
        <div className={'card w-50'}>
            <div>
                <h1 className={'card-header'}>CHANGE PASSWORD</h1>
                <form className={'form-group'} onSubmit={handleSubmit(onSubmit)}>

                    <input type={'password'} className={'form-control ' + (errors.oldPassword ? 'is-invalid' : '')}
                           placeholder={'password'}
                           {...register("oldPassword",
                               {
                                   required: 'This field is required',
                                   validate: value => value === currentPassword ? true : "It is not your old password!"
                               })} />

                    {errors.oldPassword && <p className={'invalid-feedback'}>{errors.oldPassword.message}</p>}

                    <input type={'password'} className={'form-control ' + (errors.newPassword ? 'is-invalid' : '')}
                           placeholder={'newPassword'}
                           {...register("newPassword",
                               {
                                   required: 'This field is required',
                                   minLength: {
                                       value: 4,
                                       message: "Password must have at least 4 characters"
                                   },
                                   maxLength: {
                                       value: 10,
                                       message: "Password must have less then 10 characters"
                                   },
                                   validate: (value) => {
                                       if (!value.match(/[A-Z]+/)) return "Password should match at least one capital letter"
                                       if (value === currentPassword) return "Password should not be the same as previous"
                                       return true
                                   },
                               })} />
                    {errors.newPassword && <p className={'invalid-feedback'}>{errors.newPassword.message}</p>}

                    <input type={'password'} className={'form-control ' + (errors.repeatedPassword ? 'is-invalid' : '')}
                           placeholder={'repeat your password'}
                           {...register("repeatedPassword",
                               {
                                   required: 'This field is required',
                                   validate: value =>
                                       value === password.current || "The passwords do not match"
                               })} />
                    {errors.repeatedPassword &&
                    <p className={'invalid-feedback'}>{errors.repeatedPassword.message}</p>}
                    <input type="submit"/>
                </form>
                {showNot ? <div className={'alert alert-success'}> Success changed password! </div> : ''}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    currentPassword: state.userReducer.password,
    loggedIn: state.userReducer.loggedIn,
    email: state.userReducer.email,
    showNot: state.userReducer.showNotificationChangePassword
})

const connectedChangePasswordPage = connect(mapStateToProps, {changePassword})(ChangePasswordPage)
export {connectedChangePasswordPage as ChangePasswordPage}