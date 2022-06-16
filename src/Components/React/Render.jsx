import jsxVariableFunctionComponent from "./JsxVariableFunctionComponent"
import jsxArray from "./JsxArray"
import ArrowItemReturningSingleJsx from "./ArrowFunctionReturningSingleJsx"
import ArrowFunctionReturningJsxFragmentAndArray from "./ArrowFunctionReturningJsxFragmentAndArray"
import Unify from "../Unify"
import StringVariable from "./StringVariable"
import JsxVariable from "./JsxVariable"

const Render = ({ component }) => {
    const Component = component
    return <div>
        <Unify component={StringVariable} />
        <hr />
        <Unify component={JsxVariable} />
        <hr />
        <Unify component={jsxVariableFunctionComponent} />
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