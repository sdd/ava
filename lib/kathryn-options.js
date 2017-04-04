'use strict';
const ansiStyles = require('ansi-styles');
const chalk = require('chalk');
const cloneDeepWith = require('lodash.clonedeepwith');
const options = require('./globals').options;

const forceColor = new chalk.constructor({enabled: true});

const colorTheme = {
	boolean: ansiStyles.yellow,
	circular: forceColor.grey('[Circular]'),
	date: {value: ansiStyles.blue},
	error: {
		ctor: {open: ansiStyles.grey.open + '(', close: ')' + ansiStyles.grey.close},
		name: ansiStyles.magenta
	},
	function: {
		name: ansiStyles.blue,
		stringTag: ansiStyles.magenta
	},
	global: ansiStyles.magenta,
	gutters: {
		actualIsExtraneous: forceColor.red('-') + ' ',
		actualIsWrong: forceColor.red('-') + ' ',
		expectedIsMissing: forceColor.green('+') + ' ',
		neutral: '  ',
		wasExpected: forceColor.green('+') + ' '
	},
	item: {after: forceColor.grey(',')},
	list: {open: forceColor.grey('['), close: forceColor.grey(']')},
	mapEntry: {after: forceColor.grey(',')},
	null: ansiStyles.yellow,
	number: ansiStyles.yellow,
	object: {
		open: forceColor.grey('{'),
		close: forceColor.grey('}'),
		ctor: ansiStyles.magenta,
		stringTag: {open: ansiStyles.magenta.open + '@', close: ansiStyles.magenta.close},
		secondaryStringTag: {open: ansiStyles.grey.open + '@', close: ansiStyles.grey.close}
	},
	property: {
		after: forceColor.grey(','),
		keyBracket: {open: forceColor.grey('['), close: forceColor.grey(']')},
		valueFallback: forceColor.grey('…')
	},
	regexp: {
		source: {open: ansiStyles.blue.open + '/', close: '/' + ansiStyles.blue.close},
		flags: ansiStyles.yellow
	},
	stats: {separator: forceColor.grey('---')},
	string: {
		open: ansiStyles.blue.open,
		close: ansiStyles.blue.close,
		line: {open: forceColor.blue('\''), close: forceColor.blue('\'')},
		multiline: {open: forceColor.blue('`'), close: forceColor.blue('`')},
		controlPicture: ansiStyles.grey,
		diff: {
			insert: {
				open: ansiStyles.blue.close + ansiStyles.bgGreen.open + ansiStyles.black.open,
				close: ansiStyles.black.close + ansiStyles.bgGreen.close + ansiStyles.blue.open
			},
			delete: {
				open: ansiStyles.blue.close + ansiStyles.bgRed.open + ansiStyles.black.open,
				close: ansiStyles.black.close + ansiStyles.bgRed.close + ansiStyles.blue.open
			},
			equal: ansiStyles.blue,
			insertLine: {
				open: ansiStyles.blue.close + ansiStyles.green.open,
				close: ansiStyles.green.close + ansiStyles.blue.open
			},
			deleteLine: {
				open: ansiStyles.blue.close + ansiStyles.red.open,
				close: ansiStyles.red.close + ansiStyles.blue.open
			}
		}
	},
	symbol: ansiStyles.yellow,
	typedArray: {
		bytes: ansiStyles.yellow
	},
	undefined: ansiStyles.yellow
};

const plainTheme = cloneDeepWith(colorTheme, value => {
	if (typeof value === 'string') {
		return chalk.stripColor(value);
	}
});

// TODO: For formatting and diffing:
// * Fix maxDepth usage
// * Format React trees

exports.withColors = {theme: colorTheme};
exports.plain = {theme: plainTheme};
exports.recommended = {theme: options.color === false ? plainTheme : colorTheme};
