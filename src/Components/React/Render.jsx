import jsxSingleElement from "./JsxSingleElement"
import jsxArray from "./JsxArray"
import ArrowItemReturningSingleJsx from "./ArrowFunctionReturningSingleJsx"
import ArrowFunctionReturningJsxFragmentAndArray from "./ArrowFunctionReturningJsxFragmentAndArray"
import Unify from "../Unify"

const PascalCasedJsxSingleElement = jsxSingleElement

const Render = ({ component }) => {
    const Component = component
    return <div>
        <h1>test</h1>
        {/* <Unify component={jsxSingleElement} /> */}
        {/* <jsxSingleElement /> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter. */}
        {/* <PascalCasedJsxSingleElement /> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. */}
        {/* <Unify component={jsxArray} />
        <ArrowItemReturningSingleJsx />
        <ArrowFunctionReturningJsxFragmentAndArray /> */}
        <Unify
            component={
                <Component>
                    <span>something</span>
                </Component>}
        />
    </div>
}

export default Render