export const environment = {
  production: false,
  version: '1.0.0',
  //serverUrl: 'http://182.72.104.66:4456/api/v1/',
  // serverUrl: 'http://yantra.local:40010/api/v1/',
  //  serverUrl: ' http://13.235.142.89:81/api/v1/',
  
  // serverUrl: 'http://192.168.0.237:3000/api/v1/',
  // serverUrl1: ' 4.224.82.109:3000',

   serverUrl: `${window.location.protocol}//${window.location.hostname}:${Number(window.location.port) - 10}/api/v1/`,
 serverUrl1: `${window.location.hostname}:${Number(window.location.port) - 10}`
}; 