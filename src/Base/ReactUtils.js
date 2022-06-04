import React from 'react'

const ReactUtils = {
    analyzeComponent: (component) => {
        console.log(component)
        console.log('component? ', ReactUtils.isReactComponent(component))
        console.log('class component? ', ReactUtils.isClassComponent(component))
        console.log('function component? ', ReactUtils.isFunctionComponent(component))
        console.log('element? ', ReactUtils.isElement(component))
        console.log('DOM type element? ', ReactUtils.isDOMTypeElement(component))
        console.log('composite type element? ', ReactUtils.isCompositeTypeElement(component))
    },
    isReactComponent: (component) => {
        return (
            ReactUtils.isClassComponent(component) ||
            ReactUtils.isFunctionComponent(component)
        )
    },
    isClassComponent: (component) => {
        return (
            component &&
            typeof component === 'function' &&
            component.prototype &&
            !!component.prototype.isReactComponent
        )
    },
    isFunctionComponent: (component) => {
        return (
            typeof component === 'function' &&
            String(component).includes('return React.createElement')
        )
    },
    isElement: (element) => {
        return React.isValidElement(element)
    },
    isDOMTypeElement: (element) => {
        return ReactUtils.isElement(element) && typeof element.type === 'string'
    },
    isCompositeTypeElement: (element) => {
        return ReactUtils.isElement(element) && typeof element.type === 'function'
    }
}

export default ReactUtils