import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';
import { Button, Menu, Segment } from 'semantic-ui-react'

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = () => {
        return (
            <Segment inverted style={{margin:"auto"}}> 
                <Menu inverted secondary size="huge">
                    <Link to="/">
                        <Menu.Item
                            name='home'
                        />
                    </Link>
                    <h2 style={{
                        textAlign: "end",
                        width: "47%",
                        display: "block"
                    }}>TUTOR MATCH</h2>
                    <Menu.Menu position='right'>
                        <Link to="/login">
                            <Menu.Item>
                                <Button>Log-in</Button>
                            </Menu.Item>
                        </Link>
                        <Link to="/signup">
                            <Menu.Item>
                                <Button primary>Sign up</Button>
                            </Menu.Item>
                        </Link>
                    </Menu.Menu>
                </Menu>
         </Segment>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <Menu>
                <Link to="/">
                    <Menu.Item
                        name='home'
                    />
                </Link>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary onClick={onClickLogoutHandler}>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

        )
    }
    return (
        <>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </>
    )
}

export default Navbar;