const Express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const moment = require('moment');

let subscription_id = null;

const app = Express();
const port = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("abc"));
app.post('/', (req, res) => {
	console.log('--------')
	console.log(req.body)

	if(req.body.event_type === 'session_started') {
		console.log('-- session started --')
		findLocation(
			req.body.evse_id,
			req.body.connector_no
		);
	}

	res.send(req.body)
})

app.get('/findLocation', (req, res) => {
	findLocation(
		'NL-EVN-E32486-13208',
		'2'
	);
	res.send("bau")
})

app.get('/chargeSchedule', (req, res) => {
	getSchedule()
	res.send('maio')
})

app.get('/session', (req, res) => {
	const now = moment().utc().add(1, 'minute').format();
	console.log(now)
	smartCharge(mock_schedule(now), res)
	res.send('ok')
})

app.get('/sessionStatus', (req, res) => {
	res.send(Math.random().toString())
})




const mock_schedule = now => ({
    "chargingschedule_periods": [
        {
            "max_current": "1",
            "start_period": "0"
        },
        {
            "max_current": "0",
            "start_period": "10"
        }
    ],
    "duration": "60",
    "start_schedule": now
});


app.listen(port);


const findLocation = (evse_id, connector_no, res) => {
	console.log('finding location')
	request({
		method: 'POST',
		headers: {
			'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
			'Content-Type': 'application/json'
		},
		url: 'https://elaad-pp.driivz.com/externalIncoming/secured/ocpi/find',
		json: {}
	}, (err, res, body) => {
		const location = body.map(b => {
			const evse = b.evses.find(x => x.evse_id === evse_id)
			if (evse)
				return evse.connectors.find(c => c.connector_no === connector_no).location.point
		}).find(x => x)

		console.log('location: ', JSON.stringify(location))
		console.log('user is at home')
		
		getSchedule()
	})
}

const getSchedule = () => {
	console.log('get schedule')
	request({
		method: 'GET',
		url: 'https://vandebron1.localtunnel.me/chargePlan?location=home&soc=50'
	}, (err, res, body) => {

		smartCharge(body, res)


	})
}

const smartCharge = (schedule) => {
	console.log('sending smart charging schedule')

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
		    "subscription_id": subscription_id,
		    "tariff_type": "D1"
		}
	}, (err, res, body) => console.log(res.statusCode + ' ' + body))
}

const subscribe = () => {
	request({
		method: 'POST',
		headers: {
			'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
			'Content-Type': 'application/json'
		},
		url: 'https://elaad-pp.driivz.com/externalIncoming/secured/ocpi/subscribe',
		json: {
 			"endpoint" : "https://vandebron.localtunnel.me/",
  			"interface_type" : "ndr"
		}
	}, (err, res, body) => {
		console.log('subscribe ' + res.statusCode)
		subscription_id = res.body.subscription_id
		console.log('subscription_id: ', subscription_id)
	})
}

subscribe();

