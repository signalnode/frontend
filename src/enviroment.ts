const development = {
  BACKEND_URL: 'http://localhost:4000',
  ADDON_SERVER_URL: 'https://my-json-server.typicode.com/signalnode/backend/addons',
};

const productive = {
  BACKEND_URL: '',
  ADDON_SERVER_URL: '',
};

export default process.env.NODE_ENV === 'development' ? development : productive;
