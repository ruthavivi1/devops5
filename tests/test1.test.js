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



test('register user with missing fields', async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name: 'John Doe',
      exam1: 80
      // Missing exam2 and exam3 fields
    });

    console.log(response.data);
    // Assert the response status and error message accordingly
    expect(response.status).toBe(400); // Assuming a 400 Bad Request status is returned
    expect(response.data.success).toBe(false);
    expect(response.data.message).toBe('Missing required fields');
  } catch (error) {
    console.error(error);
    // Handle the error case, if necessary
  }
});

test('register user with invalid exam scores', async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name: 'John Doe',
      exam1: 80,
      exam2: 'Ninety', // Invalid exam score
      exam3: 75
    });

    console.log(response.data);
    // Assert the response status and error message accordingly
    expect(response.status).toBe(400); // Assuming a 400 Bad Request status is returned
    expect(response.data.success).toBe(false);
    expect(response.data.message).toBe('Invalid exam scores');
  } catch (error) {
    console.error(error);
    // Handle the error case, if necessary
  }
});

test('access root route and redirect to register page', async () => {
  try {
    const response = await axios.get('http://localhost:3000/');

    console.log(response.data);
       // Assert the response status and redirection to the register page
       expect(response.status).toBe(302); // Assuming a 302 Found status is returned for redirection
       expect(response.headers.location).toBe('/register');
  } catch (error) {
    console.error(error);
    // Handle the error case, if necessary
  }
});