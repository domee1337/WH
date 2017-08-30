<?php

namespace WH\Controllers;

use Plenty\Plugin\Controller;
use Plenty\Plugin\Http\Request;
use Plenty\Plugin\Templates\Twig;
use Plenty\Modules\StockManagement\Stock\Contracts\StockRepositoryContract;
use Plenty\Modules\StockManagement\Warehouse\Contracts\WarehouseRepositoryContract;
use Plenty\Modules\Item\Variation\Contracts\VariationLookupRepositoryContract;
use Plenty\Modules\Item\Variation\Contracts\VariationRepositoryContract;
use Plenty\Modules\DataExchange\Contracts\CSVGenerator;

/**
 * Class ContentController
 * @package ToDoList\Controllers
 */
class ContentController extends Controller
{
    /**
    * RENDER TWIG TEMPLATES ROUTING
    */
    public function render_start(Twig $twig, WarehouseRepositoryContract $whRepo)
    {
      $result = $whRepo->all();
      $templateData = array('warehouses' => $result);
      return $twig->render('WH::content.start', $templateData);
    }
    public function render_incoming(Twig $twig, WarehouseRepositoryContract $whRepo)
    {
      $result = $whRepo->all();
      $templateData = array('warehouses' => $result);
      return $twig->render('WH::content.incoming', $templateData);
    }
    public function render_transfer(Twig $twig, WarehouseRepositoryContract $whRepo)
    {
      $result = $whRepo->all();
      $templateData = array('warehouses' => $result);
      return $twig->render('WH::content.transfer', $templateData);
    }
    public function render_inventur(Twig $twig, WarehouseRepositoryContract $whRepo)
    {
      $result = $whRepo->all();
      $templateData = array('warehouses' => $result);
      return $twig->render('WH::content.inventur', $templateData);
    }
    public function listWarehouses(WarehouseRepositoryContract $whRepo)
    {
      $resultx = $whRepo->all();
      return $resultx;
    }
    public function test(CSVGenerator $csv)
    {

    }
    /**
     * @param int                           $id
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function findStock(int $id, StockRepositoryContract $stockRepo)
    {

    }
    /**
     * @param int                           $id
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function stockByVariation(int $id, StockRepositoryContract $stockRepo)
    {

    }

    /**
     * @param  \Plenty\Plugin\Http\Request  $request
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function bookStock(Request $request, StockRepositoryContract $stockRepo)
    {

    }


    /**
     * @param  \Plenty\Plugin\Http\Request  $request
     * @param StockRepositoryContract       $stockRepo
     * @return string
     */
    public function correctStock(Request $request, StockRepositoryContract $stockrepo)
    {

    }

    public function findArticle(Request $request, VariationLookupRepositoryContract $varRepo, VariationRepositoryContract $varRepoCo)
    {
      $rs = $request->all();

      $varRepo->hasBarcode($rs['barcode']);
      $result = $varRepo->lookup();
      if(empty($result))
      {
        $return['valid'] = false;
      }
      else {
        foreach($result as $item)
        {
          $resultx = $varRepoCo->findById($item['variationId']);
          $return['variants'][] = $resultx;
        }
        $return['valid'] = true;

      }
      return json_encode($return);

    }

    public function GetOrder(Request $request)
    {
        $rs = $request->all();
        $curl = curl_init();
        $rs['action'] = "GetOrder";
        $url = "http://pherrewyn1.timmeserver.de/StorageRest/";
        $url = sprintf("%s?%s", $url, http_build_query($rs));
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        curl_close($curl);
        return json_decode($result);
    }

    public function GetArticlePlaces(Request $request)
    {
      $rs = $request->all();
      $curl = curl_init();
      $rs['action'] = "GetArticlePlaces";
      $url = "http://pherrewyn1.timmeserver.de/StorageRest/";
      $url = sprintf("%s?%s", $url, http_build_query($rs));
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      $result = curl_exec($curl);
      curl_close($curl);
      return json_decode($result);
    }

    public function FinishArticle(Request $request)
    {
      $rs = $request->all();
      $curl = curl_init();
      $rs['action'] = "FinishArticle";
      $url = "http://pherrewyn1.timmeserver.de/StorageRest/";
      $url = sprintf("%s?%s", $url, http_build_query($rs));
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      $result = curl_exec($curl);
      curl_close($curl);
      return json_decode($result);
    }
}
