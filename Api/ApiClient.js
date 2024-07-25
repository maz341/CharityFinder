class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint, queryParams = {}) {
    const queryString = new URLSearchParams({ ...queryParams, }).toString();
    const url = `${this.baseURL}${endpoint}`;
    console.log(`url ${url}`);


    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You can add any other headers you need here.
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  // You can add more methods for POST, PUT, DELETE requests as needed.
}

export default APIClient;
