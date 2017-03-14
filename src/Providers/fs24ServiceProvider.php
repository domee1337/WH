<?php
 
namespace fs24\Providers;
 
 
use Plenty\Plugin\ServiceProvider;
 
class fs24ServiceProvider extends ServiceProvider
{
 
    /**
     * Register the service provider.
     */
 
    public function register()
    {
        $this->getApplication()->register(fs24RouteServiceProvider::class);
    }
}

?>