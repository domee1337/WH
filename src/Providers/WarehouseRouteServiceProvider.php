<?php

namespace WH\Providers;

use Plenty\Plugin\RouteServiceProvider;
use Plenty\Plugin\Routing\Router;

class WarehouseRouteServiceProvider extends RouteServiceProvider{
    /**
     * @param Router $router
     */
    public function map(Router $router){
        /**
        * GET Routing Templates
        */
        $router->get('storage',                         'WH\Controllers\ContentController@render_start');
        $router->get('storage/transfer',              'WH\Controllers\ContentController@render_transfer');
        $router->get('storage/inventur',              'WH\Controllers\ContentController@render_inventur');
    }

}

?>
