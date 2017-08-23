var showsJson = require('./shows.json');

var shows = {};
var artists = {};


Object.keys(showsJson).forEach(key => {
	if (showsJson[key].performances) {
		showsJson[key].performances.forEach(({ performance }) => {
			Object.keys(performance).forEach(artistId => {
				artists[artistId] = performance[artistId];
			});
		});
	}
});

console.log('artists = ', artists);