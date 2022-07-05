import Progress from '../Components/Progress'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import app from 'App'
import NotFound from '../Panel/NotFound';
import Test from '../Panel/Test'
import routes from '../Routes';
import Unify from "../Components/Unify";

const MainRouting = () => {

    const [pageProgress, setPageProgress] = useState(false)

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
                    return <Route
                        key={route.path}
                        path={route.path}
                        element={
                            pageProgress
                                ?
                                <Progress />
                                :
                                <Unify
                                    component={route.component}
                                    setPageProgress={setPageProgress}
                                    isSuperAdmin={app.isSuperAdmin()}
                                />
                        }
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