!function () {
    "use strict";

    angular.module( "app", [
        "ngMaterial"
    ], function ( $mdThemingProvider ) {
        var theme = $mdThemingProvider.theme( "injoin" );
        theme.primaryColor( "blue-grey" )
             .accentColor( "blue" );

        // Share button styles
        $mdThemingProvider.theme( "facebook" ).primaryColor( "blue" );
        $mdThemingProvider.theme( "googleplus" ).primaryColor( "red" );
        $mdThemingProvider.theme( "twitter" ).primaryColor( "light-blue" );

        $mdThemingProvider.setDefaultTheme( "injoin" );
    });
}();