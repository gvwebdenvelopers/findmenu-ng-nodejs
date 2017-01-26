(function() {
  'use strict';

  var widgets = angular.module('app.widgets');

  //Google maps configuration
  widgets.config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          //key: 'AIzaSyALz3o_cMEcTa8pzYf5jUhJcBDn48Wlpn8',
          v: '3.26', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  });
})();
