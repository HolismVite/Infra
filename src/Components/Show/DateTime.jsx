import DatePart from './DatePart'
import TimePart from './TimePart'

const DateTime = ({ date }) => {
    return <>
        <DatePart value={date} />
        <br />
        <TimePart
            value={date}
            className="text-xs"
        />
    </>
}

export default DateTime 