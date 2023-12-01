
const fetch = require('node-fetch');

// Set the IP address and port of your server
const serverAddress = 'http://192.168.18.20:8080';

// Authentication credentials
const credentials = {
  email: 'mahmed@email.com',
  password: '123456789abc',
};

// Login endpoint
const loginEndpoint = `${serverAddress}/api/signin`;

// Orders endpoint
const ordersEndpoint = `${serverAddress}/api/order`;

// Function to authenticate and get a token
async function authenticate() {
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data.message);

      // Call the function to fetch orders after successful login
      await fetchOrders(data.user);
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (error) {
    console.error('Error during authentication:', error.message);
  }
}

// Function to fetch orders
async function fetchOrders(user) {
  try {
    const response = await fetch(ordersEndpoint, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Assuming the server sends a token upon successful login
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Orders:', data);
    } else {
      console.error('Error fetching orders:', data.message);
    }
  } catch (error) {
    console.error('Error during fetch orders:', error.message);
  }
}

// Call the authentication function
authenticate();
