import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PublishIcon from '@mui/icons-material/Publish';
import {
    axios,
    errorInterceptor,
    requestInterceptor,
} from '../../Base/Api'
import HeaderAction from "./HeaderAction"

const ClearCache = () => {

    const siteApiUrl = import.meta.env.VITE_SITE_API_URL

    if (!siteApiUrl)
    {
        console.warn('Site API URL is not specified')
    }

    const axiosApi = axios.create({
        baseURL: siteApiUrl
    })

    axiosApi.interceptors.request.use(requestInterceptor);

    axiosApi.interceptors.response.use(response => response, errorInterceptor)

    const post = async (url, data) => {
        return await axiosApi
            .post(url)
            .then(response => response?.data)
    }

    return <HeaderAction
        title="Publish"
        icon={PublishIcon}
        action={({ setProgress, success, error }) => {
            setProgress(true)
            post('/cache/clear')
                .then(data => {
                    success('Published')
                    setProgress(false)
                }, e => {
                    error(e)
                    setProgress(false)
                })
        }}
    />
}

export default ClearCache 