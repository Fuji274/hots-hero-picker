var Hero = function (obj) {
    this.name = obj.name;
    this.shortName = obj.short_name;
    this.role = obj.role;
    this.icon = obj.icon_url['92x93'];
};

Hero.prototype.render = function (checkbox) {
    var html = '<div class="tile hero-details p-2 text-center" id="' + this.shortName + '"><div class="hero-img"><img src="' +
        this.icon + '" class="rounded img-fluid" alt="' + this.shortName +'"></div><div class="hero-name mt-2">';

    if(checkbox) {
        html += '<input type="checkbox" value="' + this.shortName + '"> ';
    }

    html +=  this.name + '</div></div>';

    return html
};