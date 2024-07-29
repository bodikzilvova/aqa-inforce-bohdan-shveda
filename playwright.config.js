module.exports = {
    use: {
      headless: false,
      baseURL: 'https://www.demoblaze.com',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure'
    },
    timeout: 5000,
    retries: 1
  };