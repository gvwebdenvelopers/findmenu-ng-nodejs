(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-top-center';
  }

  var config = {
    appErrorPrefix: '[findmenu Error] ',
    appTitle: 'findmenu'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    $translateProvider.registerAvailableLanguageKeys(['ca','gl','en','es'],{
      'ca-ES': 'ca',
      'gl_ES': 'gl',
      'en-US': 'en',
      'en_AU': 'en',
      'en_CA': 'en',
      'en_GB': 'en',
      'en_IE': 'en',
      'en_IN': 'en',
      'en_MT': 'en',
      'en_NZ': 'en',
      'en_PH': 'en',
      'en_SG': 'en',
      'en_US': 'en',
      'en_ZA': 'en',
      'es_AR': 'es',
      'es_BO': 'es',
      'es_CL': 'es',
      'es_CO': 'es',
      'es_CR': 'es',
      'es_DO': 'es',
      'es_EC': 'es',
      'es_ES': 'es',
      'es_GT': 'es',
      'es_HN': 'es',
      'es_MX': 'es',
      'es_NI': 'es',
      'es_PA': 'es',
      'es_PE': 'es',
      'es_PR': 'es',
      'es_PY': 'es',
      'es_SV': 'es',
      'es_US': 'es',
      'es_UY': 'es',
      'es_VE': 'es'
    });

    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/app/{part}/i18n/{lang}.json',
      loadFailureHandler: 'MyErrorHandler'
    });
    $translateProvider.useCookieStorage();

    $translateProvider
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('sanitize');


    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }

})();
