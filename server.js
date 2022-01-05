const express = require("express");
const app = express();	
const port = process.env.PORT || 3000;
const path = require("path");
const apiKey = 'l7u502p8v46ba3ppgvj5y2aad50lb9'; //Change Placement
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
	res.redirect('/public');
});

app.get("/public/Properties/:page",(req, res) => 
{
  const options = {
    hostname: 'api.stagingeb.com',
    path: `/v1/properties?page=${req.params.page}&limit=20&search%5Bstatuses%5D%5B%5D=published`,
    headers: {
        'X-Authorization': apiKey
    }
}
	https.get(options, resp => {
  let data = [];
  console.log('Status Code:', resp.statusCode);
    
  resp.on('data', chunk => {
    data.push(chunk);
  });

  resp.on('end', () => {
    console.log('Response ended: ');
    const properties = JSON.parse(Buffer.concat(data).toString());
	res.send(properties)
  });
	}).on('error', err => {
  		console.log('Error: ', err.message);
	});
	
})

app.get("/public/Property/:id",(req, res) => 
{
  const options = {
    hostname: 'api.stagingeb.com',
    path: `/v1/properties/${req.params.id}`,
    headers: {
        'X-Authorization': apiKey
    }
}
	https.get(options, resp => {
  let data = [];
  console.log('Status Code:', resp.statusCode);
    
  resp.on('data', chunk => {
    data.push(chunk);
  });

  resp.on('end', () => {
    console.log('Response ended: ');
    const properties = JSON.parse(Buffer.concat(data).toString());
	res.send(properties)
  });
	}).on('error', err => {
  		console.log('Error: ', err.message);
	});
	
})

app.post("/public/Contact/:id",(req, res) => 
{
  const info = JSON.stringify({
    "name": req.body.name,
    "phone": req.body.phone,
    "email": req.body.email,
    "property_id": req.params.id,
    "message": req.body.message,
    "source": "testing.com"
  })

  console.log(info);
  console.log(req.body.fname);

  const options = {
    hostname: 'api.stagingeb.com',
    path: `/v1/contact_requests`,
    method: 'POST',
    headers: {
        'Content-Type' : "application/json",
        'X-Authorization': apiKey
    }
}
	const contact = https.request(options, resp => {
  let data = [];
  console.log('Status Code:', resp.statusCode);
    
  resp.on('data', chunk => {
    data.push(chunk);
  });

  resp.on('end', () => {
    console.log('Response ended: ');
    const properties = JSON.parse(Buffer.concat(data).toString());
    console.log(properties)
  res.redirect('/public');
  });
	}).on('error', err => {
  		console.log('Error: ', err.message);
	});

  contact.write(info);
  contact.end();
})

//Listening on port
app.listen(port,() => console.log("Server running"))