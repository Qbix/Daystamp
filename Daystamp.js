/**
 * Like a timestamp, but works with number of Gregorian Calendar 
 * days since fictional epoch year=0, month=0, day=1.
 * You can store daystamps and do arithmetic with them.
 * @class Daystamp
 */
const Daystamp = {
    /**
     * Get daystamp from a Javascript milliseconds-based timestamp
     * @method fromTimestamp
     * @static
     * @param {Number} timestamp 
     * @return {Number}
     */
	fromTimestamp: function (timestamp) {
		return Math.round(
			(timestamp - Daystamp.epoch) / Daystamp.msPerDay
		);
	},

    /**
     * Get daystamp from a Javascript Date object
     * @method fromDate
     * @static
     * @param {Date} date 
     * @return {Number}
     */
	fromDate: function (date) {
		return Daystamp.fromTimestamp(date.getTime());
	},

    /**
     * Get daystamp from a string of the form "yyyy-mm-dd"
     * or "yyyy-mm-dd hh:mm:ss"
     * @method fromDateTime
     * @static
     * @param {String} datetime 
     * @return {Number}
     */
	fromDateTime: function (datetime) {
		return this.fromTimestamp(Date.parse(datetime + ' UTC'));
	},

    /**
     * Get daystamp from a year, month and day
     * @method fromYMD
     * @static
     * @param {Number} year 
     * @param {Number} month January is 1
     * @param {Number} day
     * @return {Number}
     */
	fromYMD: function (year, month, day) {
		const date = new Date();
		date.setUTCFullYear(year, month-1, day);
		date.setUTCHours(0, 0, 0);
		return Math.round(
			(date.getTime() - Daystamp.epoch) / Daystamp.msPerDay
		);
	},

    /**
     * Get Javascript milliseconds-based timestamp from a daystamp
     * @method toTimestamp
     * @static
     * @param {Number} daystamp 
     * @return {Number}
     */
	toTimestamp: function (daystamp) {
		return Daystamp.epoch + Daystamp.msPerDay * daystamp;
	},

    /**
     * Get Javascript Date from a daystamp
     * @method toDate
     * @static
     * @param {Number} daystamp 
     * @return {Date}
     */
	toDate: function (daystamp) {
		return new Date(Daystamp.toTimestamp(daystamp));
	},

    /**
     * Get date-time string from a daystamp
     * @method toDateTime
     * @static
     * @param {Number} daystamp 
     * @return {String} String of the form "yyyy-mm-dd 00:00:00"
     */
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

    /**
     * Get Javascript milliseconds-based timestamp from a daystamp
     * @method toYMD
     * @static
     * @param {Number} daystamp 
     * @return {Array} [year, month, date] note January is month 1
     */
	toYMD: function (daystamp) {
		const date = Daystamp.toDate(daystamp);
		return [
			date.getUTCFullYear(),
			date.getUTCMonth() + 1,
			date.getUTCDate()
		];
	}
};

/**
 * The daystamp epoch as a timestamp
 * @property epoch
 * @static
 */
Object.defineProperty(Daystamp, 'epoch', {
	value: -62167219200000,
	configurable: false,
	writable: false,
	enumerable: true
});

/**
 * Number of milliseconds in a day
 * @property msPerDay
 * @static
 */
Object.defineProperty(Daystamp, 'msPerDay', {
	value: 8.64e7,
	configurable: false,
	writable: false,
	enumerable: true
});