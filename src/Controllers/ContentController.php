<?php

namespace Warehouse\Controllers;

use Plenty\Plugin\Controller;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Templates\Twig;
//use Plenty\Modules\StockManagement\Stock\Contracts\StockRepositoryContract;

/**
 * Class ContentController
 * @package ToDoList\Controllers
 */
class ContentController extends Controller
{
    /**
    * RENDER TWIG TEMPLATES ROUTING
    */
    public function render_start(Twig $twig): string
    {
       return $twig->render('Warehouse::content.start');
    }
    public function render_incoming(Twig $twig): string
    {
       return $twig->render('Warehouse::content.incoming');
    }
    public function render_transfer(Twig $twig): string
    {
       return $twig->render('Warehouse::content.transfer');
    }
    public function render_inventur(Twig $twig): string
    {
       return $twig->render('Warehouse::content.inventur');
    }


    /**
     * @param int                           $id
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function findStock(int $id, StockRepositoryContract $stockRepo): string
    {
    }
    /**
     * @param int                           $id
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function stockByVariation(int $id, StockRepositoryContract $stockRepo): string
    {

    }

    /**
     * @param  \Plenty\Plugin\Http\Request  $request
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function bookStock(Request $request, StockRepositoryContract $stockRepo): string
    {

    }


    /**
     * @param  \Plenty\Plugin\Http\Request  $request
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function correctStock(Request $request, StockRepositoryContract $stockrepo): string
    {

    }
}
