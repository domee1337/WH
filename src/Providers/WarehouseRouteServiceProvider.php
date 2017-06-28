<?php

namespace WH\Providers;

use Plenty\Plugin\RouteServiceProvider;
use Plenty\Plugin\Routing\Router;

class WarehouseRouteServiceProvider extends RouteServiceProvider
{
    /**
     * @param Router $router
     */
    public function map(Router $router)
    {

        /**
        * GET Routing CALLS
        */
        $router->get('warehouse/calls/findStock/{id}',            'WH\Controllers\ContentController@findStock');
        $router->get('warehouse/calls/stockByVariation/{id}',     'WH\Controllers\ContentController@stockByVariation');
        $router->get('warehouse/calls/warehouses',                'WH\Controllers\ContentController@listWarehouses');
        $router->get('warehouse/calls/findVariant',                  'WH\Controllers\ContentController@searchByBarcode');

        /**
        * GET Routing Templates
        */

        $router->get('warehouse',                       'WH\Controllers\ContentController@render_start');
        $router->get('warehouse/start-page',            'WH\Controllers\ContentController@render_start');
        $router->get('warehouse/incoming',              'WH\Controllers\ContentController@render_incoming');
        $router->get('warehouse/transfer',              'WH\Controllers\ContentController@render_transfer');
        $router->get('warehouse/inventur',              'WH\Controllers\ContentController@render_inventur');
        /**
        * TEST ROUTING
        */
        $router->get('warehouse/calls/findArticle',                 'WH\Controllers\ContentController@findArticle');
        $router->get('warehouse/test',                  'WH\Controllers\ContentController@searchByBarcode');

        /**
        * POST Routing
        */
        $router->post('warehouse/calls/bookStock',                'WH\Controllers\ContentController@bookStock');
        $router->post('warehouse/calls/correctStock',             'WH\Controllers\ContentController@correctStock');

        /*listStockStorageLocationsByVariationId
        $router->put('todo/{id}', 'ToDoList\Controllers\ContentController@updateToDo')->where('id', '\d+');
        $router->delete('todo/{id}', 'ToDoList\Controllers\ContentController@deleteToDo')->where('id', '\d+');*/
    }

}

?>
