const development = {
  SERVER_URL: 'http://localhost:4000',
};

const productive = {
  SERVER_URL: '',
};

export default process.env.NODE_ENV === 'development' ? development : productive;
