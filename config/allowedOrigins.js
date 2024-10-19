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
console.log(allowedOrigin);
