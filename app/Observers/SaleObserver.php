<?php

namespace App\Observers;

use App\Models\Sale;

class SaleObserver
{
    /**
     * Handle the Sale "updating" event.
     *
     * @param  \App\Models\Sale  $sale
     * @return void
     */
    public function updating(Sale $sale)
    {
        if ($sale->status == Sale::PAID) {
            $sale->delivery_date = now();

            foreach ($sale->order_items as $item) {
                $item->stock = $item->stock - $item->pivot->quantity;
                $item->save();
            }
        }
    }
}
