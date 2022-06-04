import Logo from '../Logo';
import { Link } from 'react-router-dom';

const Branding = ({ onClick }) => {
    return (
        <div
            id="logo"
            className=
            {
                'h-20 flex items-center justify-center'
            }
            onClick={onClick}
        >
            <Link
                to="/"
                className=
                {
                    'h-full w-full flex items-center justify-center'
                }
            >
                <Logo />
            </Link>
        </div>
    );
};

export default Branding;