<?php

namespace App\Mail;

use App\Actions\GenerateStockCSVAction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class StockReport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $storage = Storage::disk('public');
        $filename = now()->format('Y-m-d-His')."_stock_report.csv";
        $storage->put($filename, (new GenerateStockCSVAction())->execute());
        return $this->view("emails.stock.report_plain")
            ->from('no-reply@cycl.io')
            ->attach($storage->path($filename));
    }
}
