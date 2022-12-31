// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
  production: true,
  adminEmail: "info@cinarturan.com",
  api_key: "AIzaSyDyFVtGZ7hvlhLIO4p8GkleoHU51EFV5EA",
  database_url: "https://ng-shopapp-d4ef5-default-rtdb.firebaseio.com/"
};

const mongoEnvironment = {
  connectionString:'mongodb://localhost:27017',
  dbName:'angular'
};

export { environment, mongoEnvironment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
