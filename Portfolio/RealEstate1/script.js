import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://realty-mole-property-api.p.rapidapi.com/properties',
  params: {
    address: '5500 Grand Lake Dr, San Antonio, TX, 78244'
  },
  headers: {
    'X-RapidAPI-Key': '6785427809mshfd55c69b883ae4dp1bd259jsn0da9ddce0828',
    'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}