const development = {
  BACKEND_URL: 'http://localhost:4000',
};

const productive = {
  BACKEND_URL: '',
};

export default process.env.NODE_ENV === 'development' ? development : productive;
