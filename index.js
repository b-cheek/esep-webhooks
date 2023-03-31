const https = require('https');

exports.handler = async (event, context) => {
  const payload = JSON.parse(event.body);
  const slackUrl = process.env.SLACK_URL;
  
  const message = {
    text: `Issue Created: ${payload.issue.html_url}`
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const req = https.request(slackUrl, options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  });
  
  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });
  
  req.write(JSON.stringify(message));
  req.end();
};
