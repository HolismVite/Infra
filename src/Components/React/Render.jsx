import Unify from "../Unify"
import stringVariable from "./StringVariable"
import jsxSingleHtml from "./Jsx/Single/Html"
import jsxSingleFunctionComponent from "./Jsx/Single/FunctionComponent"
import jsxSingleFunctionComponentWithChildren from './Jsx/Single/FunctionComponentWithChildren'
import jsxSingleFunctionComponentWithProps from './Jsx/Single/FunctionComponentWithProps'
import jsxArrayHtml from './Jsx/Array/Html'
import jsxArrayFunctionComponent from "./Jsx/Array/FunctionComponent"
import ArrowItemReturningSingleJsx from "./ArrowFunctionReturningSingleJsx"
import ArrowFunctionReturningJsxFragmentAndArray from "./ArrowFunctionReturningJsxFragmentAndArray"
<hr />

const Render = ({ component }) => {
    const Component = component
    return <div>
        <Unify component={stringVariable} />
        <hr />
        <Unify component={jsxSingleHtml} />
        <hr />
        <Unify component={jsxSingleFunctionComponent} />
        <hr />
        <Unify component={jsxSingleFunctionComponentWithChildren} />
        <hr />
        <Unify component={jsxSingleFunctionComponentWithProps} />
        <hr />
        <Unify component={jsxSingleFunctionComponent} anotherBooleanProp={false}/>
        <hr />
        <Unify component={jsxArrayHtml} />
        <hr />
        <Unify component={jsxArrayFunctionComponent} />
        <hr />
        <Unify component={jsxArrayFunctionComponent} someProp={10} />
        {/* <jsxSingleElement /> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter. */}
        {/* <PascalCasedJsxSingleElement /> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. */}
        {/* <Unify component={jsxArray} />
        <ArrowItemReturningSingleJsx />
        <ArrowFunctionReturningJsxFragmentAndArray /> */}
        {/* <Unify
            component={
                <Component>
                    <span>something</span>
                </Component>}
        /> */}
    </div>
}

export default Render