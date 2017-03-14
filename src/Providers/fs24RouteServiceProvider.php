<?php
 
namespace fs24\Providers;
 
 
use Plenty\Plugin\RouteServiceProvider;
use Plenty\Plugin\Routing\Router;
 
class fs24RouteServiceProvider extends RouteServiceProvider
{
    public function map(Router $router)
    {
        $router->get('123','fs24\Controllers\ContentController@sayHello');
    }
}

?>