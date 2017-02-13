/* customerInfo.directive.js */

/**
* @desc directiva que muestra el numero de estrellas según el atributo rating
* @example <div stars-menus-rating></div>
*/
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('starsMenusRating', starsMenusRating);

  /* @ngInject */
  function starsMenusRating() {
    //Usage:
    //<div stars-menus-rating rating="{{menu.valoracion}}" over="max_stars"></div>
    // Creates:
    //
    var directive = {
      scope: {
        'rating': '@',
        'over': '@',
        'stars': '@',
      },
      templateUrl: 'app/menus/directives/svg-stars.html',

      restrict: 'EA',
      link:link
    };
    return directive;

    function link(scope, element, iAttrs) {
        scope.stars=["silver", "silver","silver","silver","silver"];
        var rating = iAttrs.rating;
        console.log(rating);
        for(var i=0; i< rating; i++ ){
          scope.stars[i] = "gold";
        }
        //attr.stars = stars[i];
        console.log(scope.stars);
    }
  }
})();
