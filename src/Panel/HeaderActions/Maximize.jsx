import { HeaderAction } from "./HeaderAction"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import app from "../../Base/App";

const Maximize = () => {
    return <HeaderAction
        title="Maximize"
        icon={ExpandLessIcon}
        action={() => app.emit(app.makeRoom)}
    />
}

export { Maximize }