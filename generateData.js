/**
 * This code need for generate test data for testing.
 */

const datastore = require('nedb-promise');
const _ = require('lodash');
const moment = require('moment');

const DAY_RANGE = 365 * 2;
const ACTIVITIES_IN_DAY = 50;

const dataBase = datastore({
	filename: './dataBaseTest',
	autoload: true
});


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createForDay = (date) => {
	return _.times(ACTIVITIES_IN_DAY, () => (
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
_.times(DAY_RANGE, (index) => {
	const date = moment().add(index, 'day').format('D.MM.GGGG');
	return result = [...result, ...createForDay(date)];
});

console.time('Generate data');

const load = async () => {
	await dataBase.remove({}, { multi: true });
	await dataBase.insert(result);

	console.timeEnd('Generate data');
	console.log(`Added ${result.length} items`);
};

load();
