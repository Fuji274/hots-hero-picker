var HeroesPage = function() {
    this.api = new Api();
    this.fields = {
        chosenHero: $('#chosen_hero'),
        heroList: $('#hero_list'),
        pickButton: $('#pick_hero'),
        selectAll: $('#select_all')
    };
    this.heroes = [];

    var self = this;

    this.renderHeroes = function() {
        this.api.loadHeroes(function (obj) {
            obj.pop();
            var html = '';
            $.each(obj, function (index, val) {
                var hero = new Hero(val);
                html += '<div class="col-2">' + hero.render() + '</div>';
            });
            self.fields.heroList.html(html);
            var heroes = self.loadHeroes();
            self.markSelected($('#' + heroes.join(",#")));
        });
    };

    this.renderHero = function(hero) {
        this.api.getHero(hero, function(obj) {
            var hero = new Hero(obj);
            var html = '<div class="offset-3 col-6">' + hero.render() + '</div>';
            var parsed = $.parseHTML(html);
            $(parsed).find('input').remove();
            self.fields.chosenHero.html(parsed);
        });
    };

    this.markSelected = function(selector) {
        selector.addClass('selected');
        selector.find('input[type="checkbox"]').prop('checked', true);
    };

    this.getHeroesArray = function() {
        var heroes = [];
        self.fields.heroList.find('input:checked').each(function () {
            heroes.push($(this).val());
        });

        return heroes;
    };

    this.saveHeroes = function (heroes) {
        var storage = new StorageWrapper('local');
        storage.setObject('heroes', heroes);
    };

    this.loadHeroes = function() {
        var storage = new StorageWrapper('local');
        var heroes = storage.getObject('heroes');

        if(!Array.isArray(heroes)) {
            heroes = self.getHeroesArray();
        }

        return heroes;
    }
};


$(document).ready(function () {

    var page = new HeroesPage();

    page.fields.heroList.on('click', '.tile', function (event) {
        var tile = $(this);
        tile.toggleClass('selected');
        var checkbox = tile.find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        page.saveHeroes(page.getHeroesArray());
    });

    page.renderHeroes();

    page.fields.pickButton.on('click', function() {
        var heroes = page.loadHeroes();

        var randomHero = new Random(heroes);
        page.renderHero(randomHero.randomValue());
    });

    page.fields.selectAll.on('click', function() {
        page.markSelected($('.tile'));
        page.saveHeroes(page.getHeroesArray());
    });
});

