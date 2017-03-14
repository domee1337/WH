<?php
 
namespace HelloWorld\Controllers;
 
 
use Plenty\Plugin\Controller;
use Plenty\Plugin\Templates\Twig;
 
class ContentController extends Controller
{
    ublic function sayHello(Twig $twig):string
    {
        return $twig->render('HelloWorld::content.hello');
    }
}

?>