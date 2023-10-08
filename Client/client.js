const axios = require('axios');

const API_URL = 'http://loadbalanced-api-970437802.us-east-1.elb.amazonaws.com:5000/api/sensorData';

function postData() {
  const data = Math.random() * 2000;

  axios
    .post(API_URL, { data })
    .then((response) => {
      console.log(`Stored sensor data: ${data}`);
    })
    .catch((error) => {
      console.error('Error storing sensor data:', error);
    });
}

setInterval(postData, 2000);
