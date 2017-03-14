<?php
 
namespace HelloWorld\Providers;
 
 
use Plenty\Plugin\ServiceProvider;
 
class HelloWorldServiceProvider extends ServiceProvider
{
 
    /**
     * Register the service provider.
     */
 
    public function register()
    {
        $this->getApplication()->register(HelloWorldRouteServiceProvider::class);
    }
}

?>