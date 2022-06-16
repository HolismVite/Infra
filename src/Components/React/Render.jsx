import Unify from "../Unify"
import stringVariable from "./StringVariable"
import jsxSingleHtml from "./Jsx/Single/Html"
import jsxSingleFunctionComponent from "./Jsx/Single/FunctionComponent"
import jsxSingleFunctionComponentWithChildren from './Jsx/Single/FunctionComponentWithChildren'
import jsxSingleFunctionComponentWithProps from './Jsx/Single/FunctionComponentWithProps'
import jsxArrayHtml from './Jsx/Array/Html'
import jsxArrayFunctionComponent from "./Jsx/Array/FunctionComponent"
import functionNoBodySingleHtml from './Function/NoBody/Single/Html'
import functionNoBodySingleFunctionComponent from './Function/NoBody/Single/FunctionComponent'
import functionWithBodyHtml from './Function/WithBody/Html'

const Render = ({ component }) => {
    const Component = component
    return <div>
        {/* <Unify component={stringVariable} />
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
        <hr />
        <Unify component={functionNoBodySingleHtml} />
        <hr />
        <Unify component={functionNoBodySingleHtml} someProp={15} />
        <hr />
        <Unify component={functionNoBodySingleFunctionComponent} someProp={15} /> */}

        <hr />
        <Unify component={functionWithBodyHtml} someProp={7} />

    </div>
}

export default Render