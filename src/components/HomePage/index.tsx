import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {FC} from "react";
import {userActions} from "../../redux/reducers/user-reducer";
import {NavLink} from "react-router-dom";

type Props = {
    loggedIn: boolean,
    email: string,
}

const HomePage: FC<Props> = ({loggedIn, email}) => {
    return (

        <div>
            {(loggedIn)
                ? <div>Hello, {email}!</div>
                : <div>New user? You can <NavLink to={'/register'}>register</NavLink> or <NavLink
                    to={'/login'}>login</NavLink></div>}
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    loggedIn: state.userReducer.loggedIn,
    email: state.userReducer.email,
})

const connectedHomePage = connect(mapStateToProps, {logout: userActions.logout})(HomePage)
export {connectedHomePage as HomePage};