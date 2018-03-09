const Express = require('express');
const request = require('request');
const bodyParser = require('body-parser');


const app = Express();
const port = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("abc"));
app.post('/', (req, res) => res.send(req.body))




// app.use('/abc', (req, res) => {
// 	request.post('http://elaad-pp.driivz.com/api/ndr',
// 	{
// 		"operator": "NL-ELA",
// 		"subscription_id" : "JmO6uPb-U=1Kg7",
// 		[{
// 		 "evse_id": "evseId2",
// 		 "connector_no": 1,
// 		 "contract_id":"NL-TNM-023232-X",
// 		 "timestamp":"2014-11-11T12:56Z",
// 		 "event" : {
// 		 "type" : "session-started",
// 		 "start_datetime":"2014-11-11T12:55Z"
// 		}]
// 	})
// 	.on('response', response => res.send(response))

// 	res.send("asfw")
// });







app.listen(port);

