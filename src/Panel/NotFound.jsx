import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TopContext } from './Panel';

const NotFound = () => {

    const { setTitle, setSubtitle, setBreadcrumbItems, setFreeze } = useContext(TopContext)

    useEffect(() => {
        setTitle('')
        setSubtitle('')
        setBreadcrumbItems([])
    }, []);

    return <div className="flex flex-col items-center justify-center">
        <div className="text-9xl text-red-400 font-bold">404</div>
        <div className={"uppercase mt-10 text-6xl font-bold text-gray-600 text-center " + (app.getLocale().supportsLetterSpacing && " tracking-widest ")}>{app.t('NOT FOUND')}</div>
        <div className="text-sm mt-10 text-gray-600 font-light text-center">{app.t('The page you requested does not exist')}.<br />{app.t('Please use the menu to navigate')}.<br />{app.t('Or go to the home page')}.</div>
        <div className="mt-10">
            <Link
                to={"/"}
            >
                <Button
                    className="bg-green-200 hover:bg-green-400 mt-2 lg:mt-0 mr-2"
                    variant="outlined"
                >
                    {app.t('Home')}
                </Button>
            </Link>
        </div>
    </div>
}

export default NotFound;