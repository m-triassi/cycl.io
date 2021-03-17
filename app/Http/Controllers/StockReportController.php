<?php

namespace App\Http\Controllers;

use App\Actions\GenerateStockCSVAction;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StockReportController extends Controller
{
    public function show()
    {
        $storage = Storage::disk('public');
        $filename = now()->format('Y-m-d-His')."_stock_report.csv";
        $storage->put($filename, (new GenerateStockCSVAction())->execute());
        
        return response()->download($storage->path($filename));
    }
}
