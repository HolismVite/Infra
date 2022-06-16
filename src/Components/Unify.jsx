import React from 'react'
import app from "../Base/App"

const Unify = ({ component, ...rest }) => {

    if (!component) {
        return <span className="hidden">Component passed to the wrapper is null or undefined</span>
    }
    if (typeof component === 'string') {
        return <>{component}</>
    }
    if (component.props && component.props.superAdmin && !app.isSuperAdmin()) {
        return <span className="hidden"></span>
    }
    if (component.type) {
        if (typeof component.type === 'string') {
            return <>{component}</>
        }
        if (typeof component.type === 'function') {
            const Component = component.type;
            return <Component {...component.props} {...rest} />
        }
        if (typeof component.type === 'string') {
            return <>
                {component.type}
            </>
        }
        if (typeof component.type === 'symbol') {
            if (component.type.toString() === 'Symbol(react.fragment)') {
                if (component.props && component.props.children && Array.isArray(component.props.children)) {
                    return <>
                        {
                            component.props.children
                                .filter(i => {
                                    if (i.props?.superAdmin === true) {
                                        return app.isSuperAdmin()
                                    }
                                    else {
                                        return true;
                                    }
                                })
                                .map((i, index) => <Unify
                                    key={i}
                                    component={i}
                                    {...i.props}
                                    {...rest}
                                />)
                        }
                    </>
                }
            }
        }
    }
    if (typeof component === 'function') {
        const Component = component;
        return <Component />
    }

    console.log(component)
    return <div>wrapper</div>
}

export default Unify
export { Unify }