!function () {
    "use strict";

    angular.module( "app", [
        "ngMaterial"
    ], function ( $mdThemingProvider ) {
        var theme = $mdThemingProvider.theme( "injoin" );
        theme.primaryColor( "blue-grey" )
             .accentColor( "blue" );

        $mdThemingProvider.setDefaultTheme( "injoin" );
    });
}();