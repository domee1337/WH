<?php

namespace Warehouse\Providers;

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
        * GET Routing
        */
        $router->get('warehouse/{id}',                      'Warehouse\Controllers\ContentController@findStock')->where('id', '\d+');
        $router->get('warehouse/stockByVariation/{id}',     'Warehouse\Controllers\ContentController@stockByVariation')->where('id', '\d+');
        /**
        * POST Routing
        */
        $router->post('warehouse/bookStock',                'Warehouse\Controllers\ContentController@bookStock');
        $router->post('warehouse/correctStock',             'Warehouse\Controllers\ContentController@correctStock');

        /*listStockStorageLocationsByVariationId
        $router->put('todo/{id}', 'ToDoList\Controllers\ContentController@updateToDo')->where('id', '\d+');
        $router->delete('todo/{id}', 'ToDoList\Controllers\ContentController@deleteToDo')->where('id', '\d+');*/
    }

}

?>
