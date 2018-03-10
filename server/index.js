const Express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const moment = require('moment');
const axios = require('axios')

let subscription_id = null;

const app = Express();
const port = 8000;

app.use(bodyParser.json());


app.get('/', (req, res) => res.send("abc"));
app.post('/', async (req, res) => {
	console.log('--------')
	console.log(req.body)

	if(req.body.event_type === 'session_started') {
		console.log('-- session started --')
		const {evse_id, connector_no} = req.body;
		try {
			const location = await findLocation(evse_id, connector_no);
			const schedule = await getSchedule();
			const smartChargeResponse = await smartCharge(schedule.data);
		} catch(err) {
			console.log(err)
			const {status, statusText} = err.response;
			return res.status(status).send(statusText)
		} 
	}

	res.send(req.body)
})

app.get('/findLocation', async(req, res) => {
	try {
		const location = await findLocation(
			'NL-EVN-E32486-13208',
			'2'
		);
		res.send('location: ' + JSON.stringify(location))
	} catch(err) {
		console.log(err)
		const {status, statusText} = err.response;
		// return res.status(status).send(statusText)
	} 
})

app.get('/chargeSchedule', async (req, res) => {
	const schedule = getSchedule()
	res.send(schedule.data)
})

app.get('/session', async (req, res) => {
	const now = moment().utc().add(1, 'minute').format();
	console.log(now)
	try {
		await smartCharge(mock_schedule(now), res)
		res.send('ok')
	} catch(err) {
		const {status, statusText} = err.response;
		res.status(status).send(statusText)
	} 
})

app.get('/sessionStatus', (req, res) => {
	res.send(Math.random().toString())
})

app.get('/subscribe', async (req, res) => {
	await subscribe();
	res.send(subscription_id)
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


const findLocation = async (evse_id, connector_no) => {
	console.log('finding location')

	const response = await axios.post(
		'https://elaad-pp.driivz.com/externalIncoming/secured/ocpi/find',
		{},
		{
			headers: {
				'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
				'Content-Type': 'application/json'
			}
		}
	)

	return response.data.map(b => {
			const evse = b.evses.find(x => x.evse_id === evse_id)
			if (evse)
				return evse.connectors.find(c => c.connector_no === connector_no).location.point
		}).find(x => x)
}

const getSchedule = async () => {
	console.log('get schedule')
	return axios.get('https://vandebron1.localtunnel.me/chargePlan?location=home&soc=50');
}

const smartCharge = async (schedule) => {
	console.log('sending smart charging schedule')
	return axios.post(
		'https://elaad-pp.driivz.com/externalIncoming/secured/ocpi/smartcharge',
		{
			"contract_id": "NLTS3C0000001",
		    "evse_id": "NL-EVN-E32486-13208",
		    "schedule": schedule,
		    "subscription_id": subscription_id,
		    "tariff_type": "D1"
		},
		{
			headers: {
				'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
				'Content-Type': 'application/json'
			}
		}
	);
}

const subscribe = async () => {
	console.log('subscribing')
	const response = await axios.post(
		'http://elaad-pp.driivz.com/externalIncoming/secured/ocpi/subscribe',
		{
			"endpoint" : "http://vandebron2.localtunnel.me/",
  			"interface_type" : "ndr"
		},
		{
			headers: {
				'Authorization': 'Basic c21hcnRfY2hhcmdlMzpQZTUxaHV0N2tt',
				'Content-Type': 'application/json'
			}
		}
	)

	subscription_id = response.data.subscription_id
}

