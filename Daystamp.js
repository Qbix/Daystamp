/**
 * Like a timestamp, but works with number of Gregorian Calendar 
 * days since fictional epoch year=0, month=0, day=1.
 * You can store daystamps and do arithmetic with them.
 * @class Daystamp
 */
const Daystamp = {
	fromTimestamp: function (timestamp) {
		return Math.round(
			(timestamp - Daystamp.epoch) / Daystamp.msPerDay
		);
	},
	fromDate: function (date) {
		return Daystamp.fromTimestamp(date.getTime());
	},
	fromDateTime: function (datetime) {
		const time = Date.parse(datetime + ' UTC');
		return Math.round(
			(new Date(time).getTime() - Daystamp.epoch) / Daystamp.msPerDay
		);
	},
	fromYMD: function (y, m, d) {
		const date = new Date();
		date.setUTCFullYear(y, m+1, d);
		date.setUTCHours(0, 0, 0);
		return Math.round(
			(date.getTime() - Daystamp.epoch) / Daystamp.msPerDay
		);
	},
	toTimestamp: function (daystamp) {
		return Daystamp.epoch + Daystamp.msPerDay * daystamp;
	},
	toDate: function (daystamp) {
		return new Date(Daystamp.toTimestamp(daystamp));
	},
	toDateTime(daystamp, separator) {
		const date = Daystamp.toDate(daystamp);
		if (separator === undefined) {
			separator = ' ';
		}
		return String(date.getUTCFullYear()).padStart(4, 0)
			+ '-' + String(date.getUTCMonth()+1).padStart(2, 0)
			+ '-' + String(date.getUTCDate()).padStart(2, 0)
			+ separator + '00:00:00';
	},
	toYMD: function (daystamp) {
		const date = Daystamp.toDate(daystamp);
		return [
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate()
		];
	}
};

Object.defineProperty(Daystamp, 'epoch', {
	value: -62167219200000,
	configurable: false,
	writable: false,
	enumerable: true
});

Object.defineProperty(Daystamp, 'msPerDay', {
	value: 8.64e7,
	configurable: false,
	writable: false,
	enumerable: true
});