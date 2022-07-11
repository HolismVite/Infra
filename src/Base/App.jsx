import Account from './Account'
import Enums from './Enums'
import Env from "./Env"
import Globalization from './Globalization'
import Holism from "./Holism"
import Push from './Push'
import ReactUtils from "./ReactUtils"
import StringExtensions from "./StringExtensions"
import Url from './Url'
import Validation from "./Validation"

const app = {
    ...Account,
    ...Enums,
    ...Env,
    ...Globalization,
    ...Holism,
    ...Push,
    ...ReactUtils,
    ...StringExtensions,
    ...Url,
    ...Validation,
}

export default app