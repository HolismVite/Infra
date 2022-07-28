import Text from './Filters/Text'

const Title = <Text
    column='Title'
    placeholder='Title'
/>

const TitleAscending = {
    caption: 'Title A-Z',
    column: 'Title',
    direction: 'asc'
}

const TitleDescending = {
    caption: 'Title Z-A',
    column: 'Title',
    direction: 'desc'
}

export { Title }
export { TitleAscending }
export { TitleDescending }