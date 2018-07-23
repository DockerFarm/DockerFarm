import json from 'config/env/env.json';
const env = process.env.NODE_ENV || 'dev';
export default json[env]; 