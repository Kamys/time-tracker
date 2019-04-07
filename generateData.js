const datastore = require('nedb-promise');
const _ = require('lodash');
const moment = require('moment');

let dataBase = datastore({
	filename: './dataBaseTest',
	autoload: true
});


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const createForDay = (date) => {
	return _.times(1000, () => (
		{
			date,
			title: `Test ${getRandomInt(1, 600000)}`,
			secondsSpent: getRandomInt(60, 600000),
			group: '',
			lastUpdate: getRandomInt(1, 600000),
		}
	));
};

let result = [];
_.times(360, (index) => {
	const date = moment().add(index, 'day').format('D.MM.GGGG');
	return result = [...result, ...createForDay(date)];
});

console.time('Generate data');

const load = async () => {
	// await dataBase.remove({}, { multi: true });
	await dataBase.insert(result);

	console.timeEnd('Generate data');
	console.log(`Added ${result.length} items`);
};

load();