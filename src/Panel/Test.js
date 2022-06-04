import Render from "../Components/React/Render"
import Dummy from '../Components/React/Dummy'

const Test = () => {
    return <div>
        <Render component={Dummy} />
        <Render component={<Dummy />} />
    </div>
}

export default Test