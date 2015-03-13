!function () {
    "use strict";

    var $ = angular.element;

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
    }).directive( "img", function () {
        var dfn = {};

        dfn.compile = function ( element ) {
            var parent = element;
            while ( parent.length ? parent = parent.parent() : null ) {
                if ( parent.hasClass( "post-body" ) ) {
                    return dfn.link;
                }
            }
        };

        dfn.link = function ( scope, element, attrs ) {
            element.wrap( "<div class='img-container'></div>" );
        };

        return dfn;
    });
}();