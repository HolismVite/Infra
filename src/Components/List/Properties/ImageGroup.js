import { useNavigate } from 'react-router-dom'

const ImageGroup = ({
    urls,
    link
}) => {

    const firstFiveUrls = urls?.slice(0, 5)
    const navigate = useNavigate();

    const handleClick = () => {
        if (link) {
            navigate(link)
        }
    }

    return <div
        className={"imageGroup flex items-center justify-center " + (link && "cursor-pointer")}
        title={link && 'Manage images'}
        onClick={() => handleClick()}
    >
        {
            firstFiveUrls?.map(url => <span className="w-8 h-8 inline-block rounded-full -ml-3 bg-white" key={url}>
                <img className="w-full h-full object-cover rounded-full border" src={url} />
            </span>)
        }
        {
            urls?.length > 5 &&
            <span className="w-8 h-8 inline-block rounded-full border -ml-3 z-10 bg-white flex items-center justify-center font-medium text-slate-600 text-xs">
                {`+${urls.length - 5}`}
            </span>
        }
    </div>
}

export { ImageGroup }