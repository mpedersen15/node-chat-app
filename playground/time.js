var moment = require('moment');

var date = moment();
date.add(1,'year')
console.log(date.format('h:mm a'));