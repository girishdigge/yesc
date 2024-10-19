import os from 'os';

// Initial allowed origins
export const allowedOrigin = [
  'http://localhost:3000',
  'http://localhost:5173',

  // 'http://16.171.13.100', // Example of an IP (can be removed if not needed)
];

// Get the hostname
const hostname = os.hostname();
const dynamicHostHttp = `http://${hostname}`;
const dynamicHostHttps = `https://${hostname}`;

// Add the dynamic hosts to the allowedOrigin list if not already present
if (!allowedOrigin.includes(dynamicHostHttp)) {
  allowedOrigin.push(dynamicHostHttp);
  allowedOrigin.push(`${dynamicHostHttp}:3000`);
  console.log(
    `Added dynamic host (HTTP) to CORS allowed origins: ${dynamicHostHttp}`
  );
}

if (!allowedOrigin.includes(dynamicHostHttps)) {
  allowedOrigin.push(dynamicHostHttps);
  allowedOrigin.push(`${dynamicHostHttps}:3000`);
  console.log(
    `Added dynamic host (HTTPS) to CORS allowed origins: ${dynamicHostHttps}`
  );
}

const interfaces = os.networkInterfaces();
let ipAddress = null;

for (let interfaceName in interfaces) {
  const iface = interfaces[interfaceName];
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i];
    // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
    if (alias.family === 'IPv4' && !alias.internal) {
      ipAddress = alias.address;
      break;
    }
  }
  if (ipAddress) break;
}

const dynamicHost = ipAddress ? `http://${ipAddress}` : null;

if (dynamicHost && !allowedOrigin.includes(dynamicHost)) {
  allowedOrigin.push(dynamicHost);
  console.log(`Added dynamic host to CORS allowed origins: ${dynamicHost}`);
} else if (!dynamicHost) {
  console.log('Unable to determine the dynamic host IP.');
} else {
  console.log(`Dynamic host ${dynamicHost} is already in the allowed origins.`);
}

console.log(allowedOrigin);
