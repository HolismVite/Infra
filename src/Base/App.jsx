import EventManager from "./EventManager"
import Validation from "./Validation"
import Push from './Push'
import Account from './Account'
import Holism from "./Holism"
import Messaging from "./Messaging"
import List from "./List"
import Globalization from './Globalization'
import Url from './Url'
import StringExtensions from "./StringExtensions"
import ReactUtils from "./ReactUtils"
import Env from "./Env"

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account,
    ...Messaging,
    ...List,
    ...Holism,
    ...Globalization,
    ...Url,
    ...ReactUtils,
    ...StringExtensions,
    ...Env
}

export default app

export { app }