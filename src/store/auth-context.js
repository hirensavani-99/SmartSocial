import React, {
    useState
} from "react";


//creating context
const AuthContex = React.createContext({
    token: '',
    isLogedIn: false,
    login: (token) => { },
    logout: () => { },
    fetchuser: (data) => { },
    user: {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token")
    const initialUser = JSON.parse(localStorage.getItem("user"))
    const [token, setToken] = useState(initialToken)
    const [user, setuser] = useState(initialUser)




    const userIsLoggedIn = !!token;
    console.log(token);

    const logInHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)

    }

    const LogOutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')

    }

    const fetchuser = (data) => {
        console.log(data);
        setuser(data)
        localStorage.setItem('user', JSON.stringify(data))
    }

    const contextValue = {
        login: logInHandler,
        logout: LogOutHandler,
        fetchuser: fetchuser,
        isLogedIn: userIsLoggedIn,
        user: user,
        token: token
    }

    console.log(contextValue);

    return <AuthContex.Provider value={contextValue}>
        {props.children}
    </AuthContex.Provider>
}

export default AuthContex;