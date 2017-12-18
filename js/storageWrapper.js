var StorageWrapper = function(type) {
    this.type = type;
};

StorageWrapper.prototype.getObject = function(name) {
    return JSON.parse(window[this.type + 'Storage'].getItem(name));
};

StorageWrapper.prototype.setObject = function(name, obj) {
    window[this.type + 'Storage'].setItem(name, JSON.stringify(obj));
};