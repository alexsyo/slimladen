const Express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const moment = require('moment');


const app = Express();
const port = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("abc"));
app.post('/', (req, res) => {
	console.log('--------')
	console.log(req.body)
	res.send(req.body)
})

app.get('/session', (req, res) => {
	const now = moment().utc().add(1, 'minute').format();
	console.log(now)
	session(mock_schedule(now), res)
})


const mock_schedule = now => ({
    "chargingschedule_periods": [
        {
            "max_current": "16",
            "start_period": "0"
        },
        {
            "max_current": "0",
            "start_period": "1"
        }
    ],
    "duration": "60",
    "start_schedule": now
});


app.listen(port);


const session = (schedule, res) => {
	request({
		method: 'POST',
		headers: {
			'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
			'Content-Type': 'application/json'
		},
		url: 'https://elaad-pp.driivz.com/externalIncoming/secured/ocpi/smartcharge',
		json: {
		    "contract_id": "NLTS3C0000001",
		    "evse_id": "NL-EVN-E32486-13208",
		    "schedule": schedule,
		    "subscription_id": "20582",
		    "tariff_type": "D1"
		}
	}, (err, res, body) => console.log(res.statusCode + ' ' + body))

	res.send('ok');
}

