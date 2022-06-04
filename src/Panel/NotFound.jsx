import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { app } from './Panel';
import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        app.emit(app.componentLoaded, {});
    }, []);

    return <div className="flex flex-col items-center justify-center">
        <div className="text-9xl text-red-400 font-bold">404</div>
        <div className="uppercase mt-10 text-6xl font-bold tracking-widest text-gray-600 text-center">NOT FOUND</div>
        <div className="text-sm mt-10 text-gray-600 font-light text-center">The page you requested does not exist.<br />Please use the menu to navigate.<br />Or go to the home page.</div>
        <div className="mt-10">
            <Link
                to={"/"}
            >
                <Button
                    className="bg-green-200 hover:bg-green-400 mt-2 lg:mt-0 mr-2"
                    variant="outlined"
                >
                    Home
                </Button>
            </Link>
        </div>
    </div>
}

export default NotFound;