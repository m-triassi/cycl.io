<?php

namespace App\Http\Controllers;

use App\Actions\GenerateStockCSVAction;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StockReportController extends Controller
{
    /**
     * Downlaod the minimum stock report, showing all inventory item below their minimum_stock
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function show()
    {
        // call the action to generate the CSV data and store it in a file
        $storage = Storage::disk('public');
        $filename = now()->format('Y-m-d-His')."_stock_report.csv";
        $storage->put($filename, (new GenerateStockCSVAction())->execute());

        // send a download response to the front end to download the created file
        return response()->download($storage->path($filename));
    }
}
