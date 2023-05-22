// Import necessary libraries
const axios = require('axios');

// Define the base URL of your server
const baseURL = 'http://localhost:3000'; // Update with your server URL

// Define the student data for registration
const studentData = {
  name: 'John Doe',
  exam1: 80,
  exam2: 90,
  exam3: 75
};

// Function to register a student
async function registerStudent() {
  try {
    // Send a POST request to the register endpoint with student data
    const response = await axios.post(`${baseURL}/register`, studentData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Call the registerStudent function
registerStudent();