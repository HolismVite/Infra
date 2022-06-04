import { useState } from 'react'

const Panel = () => {
    const [count, setCount] = useState(0)

    return <div className="Panel">
        <h1 className="text-3xl font-bold text-red-400">
            Hello world!
        </h1>
    </div>
}

export default Panel
