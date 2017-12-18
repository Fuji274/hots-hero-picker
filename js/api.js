var Api = function () {
};

Api.prototype.loadHeroes = function (callback) {
    $.ajax({
        dataType: 'json',
        success: callback,
        url: 'http://hotsapi.net/api/v1/heroes'
    });
};

Api.prototype.getHero = function (hero, callback) {
    $.ajax({
        dataType: 'json',
        success: callback,
        url: 'http://hotsapi.net/api/v1/heroes/' + hero
    });
};
