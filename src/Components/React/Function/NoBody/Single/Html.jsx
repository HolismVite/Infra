const html = (props) => <div>
    <h1>I am HTML returned by a function component without body</h1>
    {
        Object.getOwnPropertyNames(props).map((item, index) => <div key={index}>{item} - {props[item].toString()}</div>)
    }
</div>

export default html