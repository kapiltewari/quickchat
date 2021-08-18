import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";
import { SocketContext, socket } from "./contexts/SocketContext";
import RoomContextProvider from "./contexts/RoomContext";

function PrivateRoute({ children, ...rest }) {
    const { token } = useAuth();

    return (
        <Route
            {...rest}
            render={() => (token ? children : <Redirect to='/login' />)}
        />
    );
}

function App() {
    return (
        <AuthContextProvider>
            <Switch>
                <PrivateRoute exact path='/'>
                    <SocketContext.Provider value={socket}>
                        <RoomContextProvider>
                            <Chat />
                        </RoomContextProvider>
                    </SocketContext.Provider>
                </PrivateRoute>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
            </Switch>
        </AuthContextProvider>
    );
}

export default App;
