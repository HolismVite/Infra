import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        //console.log(size);
    }, [size]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Section = ({
    children
}) => {

    const ref = useRef(null);
    const [windowWidth, windowHeight] = useWindowSize();
    const [sectionWidth, setSectionWidth] = useState(null);
    const [count] = useState(children.length ? children.length : (children.props ? 1 : null));

    const clonedChildren = React.Children
        .toArray(children)
        .map(child => React.cloneElement(child, {
            allSiblingsCount: count,
        }));

    let widgetWidth = "";

    if (count < 1 || count > 4) {
        throw new Error('Dashboard widgets are only supported in 1,2,3, and 4 widgets per section.');
    }

    useEffect(() => {
        setSectionWidth(ref.current.offsetWidth);
    }, [ref]);

    return <div
        className={
            "section grid justify-between w-full grid gap-6 "
            + /* from zero */ " grid-cols-1 "
            + /* sm */ " sm:grid-cols-" + (count > 2 ? '2' : count)
            + /* md */ " md:grid-cols-" + (count > 3 ? '2' : count)
            + /* lg */ " lg:grid-cols-" + count
            + ` windowWidth_${windowWidth} windowHeight_${windowHeight}`
        }
        classes="fullClassNamesForTailwindPurge sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4"
        ref={ref}
    >
        {
            clonedChildren.map((clonedChild, index) => {
                return <div
                    key={index}
                    className={
                        "widgetWrapper"
                    }
                    style={{
                        width: widgetWidth
                    }}
                >
                    {clonedChild}
                </div>
            })
        }
    </div>
}

export { Section };