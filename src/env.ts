const development = {
  BACKEND_URL: 'http://localhost:3000',
  ADDON_SERVER_URL: 'http://localhost:3000/store',
};

const productive = {
  BACKEND_URL: '',
  ADDON_SERVER_URL: '',
};

export default process.env.NODE_ENV === 'development' ? development : productive;
