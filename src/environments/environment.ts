// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '1.0.0',
   //serverUrl: 'http://13.235.142.89/api/v1/',
  //serverUrl: 'http://13.235.142.89:80/api/v1/',
  // serverUrl: 'http://192.168.0.237:3000/api/v1/'
  // serverUrl: ' http://3.108.244.201:3002/api/v1/',
   //serverUrl: 'http://yantra.local:40010/api/v1/',
  // http://52.66.140.40

  // serverUrl: 'http://192.168.0.129:3000/api/v1/',
  // serverUrl1: '192.168.0.129:3000',

 serverUrl: `${window.location.protocol}//${window.location.hostname}:${Number(window.location.port) - 10}/api/v1/`,
 serverUrl1: `${window.location.hostname}:${Number(window.location.port) - 10}`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
