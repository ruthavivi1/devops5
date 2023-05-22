// Import necessary libraries
const axios = require('axios');


test('register user', async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name: 'John Doe',
      exam1: 80,
      exam2: 90,
      exam3: 75
    });

    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('User registered successfully');
  } catch (error) {
    console.error(error);
    // Handle the error case, if necessary
  }
});