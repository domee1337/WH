<?php
 
namespace fs24\Controllers;
 
 
use Plenty\Plugin\Controller;
use Plenty\Plugin\Templates\Twig;
 
class ContentController extends Controller
{  
    public function sayHello(Twig $twig):string
    {
        return $twig->render('fs24::content.hello');
    }
}

?>