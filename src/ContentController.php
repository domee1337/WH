<?php

namespace Warehouse\Controllers;

use Plenty\Plugin\Controller;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Templates\Twig;
use Plenty\Modules\StockManagement\Stock\Contracts\StockRepositoryContract;
use Plenty\Modules\Frontend\Services\AccountService;

/**
 * Class ContentController
 * @package ToDoList\Controllers
 */
class ContentController extends Controller
{
    /**
     * @var AccountService
     */
    private $accountService;

    /**
     * UserSession constructor.
     * @param AccountService $accountService
     */
    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    /**
     * Get the current contact ID
     * @return int
     */
    public function getCurrentContactId(): int
    {
        return $this->accountService->getAccountContactId();
    }
    /**
    * RENDER TWIG TEMPLATES ROUTING
    */
    public function render_start(Twig $twig): string
    {
       $templateData['ContactId'] = $this->getCurrentContactId;
       return $twig->render('Warehouse::content.start', $templateData);
    }
    public function render_incoming(Twig $twig): string
    {
       $templateData['ContactId'] = $this->getCurrentContactId;
       return $twig->render('Warehouse::content.incoming', $templateData);
    }
    public function render_transfer(Twig $twig): string
    {
       $templateData['ContactId'] = $this->getCurrentContactId;
       return $twig->render('Warehouse::content.transfer', $templateData);
    }
    public function render_inventur(Twig $twig): string
    {
       $templateData['ContactId'] = $this->getCurrentContactId;
       return $twig->render('Warehouse::content.inventur', $templateData);
    }


    /**
     * @param int                           $id
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function findStock(int $id, StockRepositoryContract $stockRepo): string
    {
      $result = $stockRepo->listStockByWarehouseId($id, array(), 1, 30);
      return json_decode($result);
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
