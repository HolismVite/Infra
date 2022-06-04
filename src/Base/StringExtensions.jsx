const StringExtensions = {
    cut: function (length) {
        if (this.length > length) {
            return this.substring(0, length) + ' ...';
        }
        return this;
    }
}

Object.assign(String.prototype, StringExtensions)

export default StringExtensions;