import Text from './Filters/Text'

const Title = () => {
    return <Text
        column='Title'
        placeholder='Title'
    />
}

const TitleSort = [
    {
        caption: 'Title A-Z',
        column: 'Title',
        direction: 'asc'
    },
    {
        caption: 'Title Z-A',
        column: 'Title',
        direction: 'desc'
    }
]

export { Title }
export { TitleSort }