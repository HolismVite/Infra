const Url = {
    parseQuery: () => {
        var params = new URLSearchParams(window.location.search);
        var result = {};
        params.forEach((value, key) => result[key] = value);
        return result;
    }
}

export default Url;