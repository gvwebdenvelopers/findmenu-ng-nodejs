/* jshint -W079 */
var mockData = (function() {
  return {
    getMockStates: getMockStates,
    getMockMenus: getMockMenus,
    getMockLocation: getMockLocation
  };

  function getMockStates() {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/dashboard.html',
          title: 'dashboard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }

  function getMockMenus() {
    return [
      { id: 00, nombre: 'Elbar0', precio_menu: 13, valoracion: 4, latitud: 0.00000, longitud: 0.00000, direccion:'C/la direció' },
      { id: 01, nombre: 'Elbar1', precio_menu: 12, valoracion: 3, latitud: 1.00000, longitud: 1.00000, direccion:'C/la direció' },
      { id: 02, nombre: 'Elbar2', precio_menu: 11, valoracion: 1, latitud: 2.00000, longitud: 2.00000, direccion:'C/la direció' },
      { id: 03, nombre: 'Elbar3', precio_menu: 10, valoracion: 0, latitud: 3.00000, longitud: 3.00000, direccion:'C/la direció' },
      { id: 04, nombre: 'Elbar4', precio_menu: 9, valoracion: 4, latitud: 4.00000, longitud: 4.00000, direccion:'C/la direció' }
    ];
  }

  function getMockLocation(){
    return {
      coords: { latitude: 38.810543, longitude: -0.604137 }
    };
  }
})();
