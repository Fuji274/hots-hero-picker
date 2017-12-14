var Random = function (array) {
    this.array = array;
};

Random.prototype.randomValue = function() {
    var min = 0;
    var max = this.array.length - 1;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    return this.array[random];
};