import {SubmitHandler, useForm} from "react-hook-form";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/user-reducer";
import {FC, useState} from "react";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {UserDataType} from "../../utils/types";

type Inputs = {
    email: string,
    password: string,
};

type Props = {
    login: (data: UserDataType) => void,
    loggedIn: boolean,
    showNot: number
}
const LoginPage: FC<Props> = ({login, loggedIn,showNot}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [loading, setIsLoading] = useState(false)
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setIsLoading(true)
        login(data)
        setIsLoading(false)
    }
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    if (loggedIn)
        return <Navigate to={'/home'}/>
    if (loading)
        return <div className="spinner-border" role="status">
            <span className="sr-only"/>
        </div>
    return (
        <div className='card w-50'>
            <div>
                <h1 className='card-header'>LOGIN</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                           placeholder={'email'}
                           {...register("email",
                               {
                                   required: 'This field is required',
                                   validate: value => validateEmail(value) ? true : "Enter valid email"
                               })} />
                    {errors.email && <p className={'invalid-feedback'}>{errors.email.message}</p>}

                    <input type={'password'} className={'form-control ' + (errors.password ? 'is-invalid' : '')}
                           placeholder={'password'}
                           {...register("password",
                               {
                                   required: 'This field is required',
                               })} />
                    {errors.password && <p className={'invalid-feedback'}>{errors.password.message}</p>}
                    <button className={'btn btn-primary'} type="submit">Login</button>
                </form>
                {showNot === 2 ? <div className={'alert alert-danger'}>Error, try again</div> : ''}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    loggedIn: state.userReducer.loggedIn,
    showNot: state.userReducer.showNotificationLogin
})

const connectedLoginPage = connect(mapStateToProps, {login})(LoginPage)
export {connectedLoginPage as LoginPage};