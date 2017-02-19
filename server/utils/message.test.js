var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {

		
		var from = "Matt";
		var text = "Sample text";
		
		var res = generateMessage(from, text);
		
		// expect(res.from).toBe(from);
		// expect(res.text).toBe(text);
		expect(res).toInclude({
			from,
			text
		});
		expect(res.createdAt).toBeA('number');
	})
});

describe('generateLocationMessage', () => {
	it('should generate the correct location object', () => {

		
		var from = "Matt";
		var coords = {
			latitude: 15,
			longitude: 19
		};
		var url = "https://google.com/maps?q=15,19";
		
		var res = generateLocationMessage(from, coords.latitude, coords.longitude);
		
		expect(res).toInclude({
			from,
			url
		});
		expect(res.createdAt).toBeA('number');
	})
});