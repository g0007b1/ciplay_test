import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {FC} from "react";
import {userActions} from "../../redux/reducers/user-reducer";

type Props = {
    loggedIn: boolean,
    logout: () => void,
    showNot: number
}

const Navbar: FC<Props> = ({loggedIn, logout, showNot}) => {

    return <nav className="navbar navbar-expand navbar-light bg-light rounded">
        <div className="collapse navbar-collapse justify-content-md-center" id="navbarNav">
            <ul className="navbar-nav">
                {showNot === 1 ? <li className="nav-item"><a className="nav-link" style={{color:'green'}}>Success login!</a></li>: ''}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/home">Home</NavLink>
                </li>
                {loggedIn
                    ? <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/changePassword">Change Password</NavLink>
                        </li>
                        <button className='btn btn-primary' onClick={logout}>logout</button>
                    </>
                    : <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    </>}

            </ul>
        </div>
    </nav>
}

const MapStateToProps = (state: AppStateType) => ({
    loggedIn: state.userReducer.loggedIn,
    showNot: state.userReducer.showNotificationLogin
})

const connectedNavbar = connect(MapStateToProps, {logout: userActions.logout})(Navbar)
export {connectedNavbar as Navbar}