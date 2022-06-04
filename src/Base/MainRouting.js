import { Routes, Route } from "react-router-dom";
import app from './App.js';
import NotFound from '../Panel/NotFound';
import Test from '../Panel/Test'
import routes from '../Routes.js';

const MainRouting = () => {
    return (
        <Routes>
            <Route
                path="/test"
                element={<Test />}
            />
            {
                routes.filter(item => {
                    if (item.superAdmin === true) {
                        return app.isSuperAdmin()
                    }
                    else {
                        return true;
                    }
                }).map(route => {
                    const Component = route.component;
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={<Component />}
                    />
                })
            }
            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    );
}

export default MainRouting;