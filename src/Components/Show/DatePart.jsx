import { compareAsc, format, newDate } from 'date-fns-jalali'
import { app } from '@Panel'

const DatePart = ({ value }) => {
    const normalizedValue = (value && value.endsWith('Z')) ? value : (value + 'Z');
    return value ? <span>
        {
            app.getLocale().key === 'fa'
                ?
                format(new Date(normalizedValue), 'yyyy/MM/dd')
                :
                new Date(normalizedValue).toDateString()
        }
    </span> : null;
}

export { DatePart }