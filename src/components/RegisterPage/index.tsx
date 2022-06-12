import {SubmitHandler, useForm} from "react-hook-form";
import {FC, useRef, useState} from "react";
import {connect} from "react-redux";
import {registerUser} from "../../redux/reducers/user-reducer";
import {NavLink} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {UserDataType} from "../../utils/types";


type Inputs = {
    email: string,
    password: string,
    repeatedPassword: string
};

type Props = {
    registerUser: (data: UserDataType) => void,
    showNot: number
}

const RegisterPage: FC<Props> = ({registerUser, showNot}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const password = useRef({});
    const [loading, setIsLoading] = useState(false)
    password.current = watch("password");

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const {email, password} = data
        registerUser({email, password})
        setIsLoading(false)
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    if (!loading) {
        return (
            <div className={'card w-50'}>
                <div>
                    <h1 className={'card-header'}>REGISTER</h1>
                    <form className={'form-group'} onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className={'form-control ' + (errors.email ? 'is-invalid' : '') + ' control-label col-md-3'}
                            placeholder={'email'}
                            {...register("email",
                                {
                                    required: 'This field is required',
                                    validate: value => validateEmail(value) ? true : "Enter valid email"
                                })} />
                        {errors.email && <p className={'invalid-feedback'}>{errors.email.message}</p>}

                        <input className={'form-control ' + (errors.password ? 'is-invalid' : '')}
                               placeholder={'password'}
                               {...register("password",
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
                                       validate: value => value.match(/[A-Z]+/) ? true : "Password should match at least one capital letter"
                                   })} />
                        {errors.password && <p className={'invalid-feedback'}>{errors.password.message}</p>}

                        <input className={'form-control ' + (errors.repeatedPassword ? 'is-invalid' : '')}
                               placeholder={'repeat your password'}
                               {...register("repeatedPassword",
                                   {
                                       required: 'This field is required',
                                       validate: value =>
                                           value === password.current || "The passwords do not match"
                                   })} />
                        {errors.repeatedPassword &&
                        <p className={'invalid-feedback'}>{errors.repeatedPassword.message}</p>}

                        <button className={'btn btn-primary'} type="submit">Register</button>
                    </form>
                </div>
                {showNot === 1 ? <div className={'alert alert-success'}>Success registration! now you can <NavLink
                    to={'/login'}>login</NavLink></div> : showNot === 2 ?
                    <div className={'alert alert-danger'}>Error, this email is occupied</div> : ''}
            </div>
        )
    } else {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only"/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    showNot: state.userReducer.showNotificationRegister
})

const connectedRegisterPage = connect(mapStateToProps, {registerUser})(RegisterPage)
export {connectedRegisterPage as RegisterPage};