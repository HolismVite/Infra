import DatePart from './DatePart'
import TimePart from './TimePart'
import ValueWithTitle from './ValueWithTitle'

const DateTimeTitleAgo = ({ date, ago }) => {
    return <ValueWithTitle
        value={<>
            <DatePart value={date} />
            <br />
            <TimePart
                value={date}
                className="text-xs"
            />
        </>}
        title={ago + ' ago'}
    />
}

export default DateTimeTitleAgo 