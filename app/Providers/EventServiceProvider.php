<?php

namespace App\Providers;

use App\Models\InventoryItem;
use App\Models\PurchaseOrder;
use App\Models\Sale;
use App\Observers\InventoryItemObserver;
use App\Observers\PurchaseOrderObserver;
use App\Observers\SaleObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        PurchaseOrder::observe(PurchaseOrderObserver::class);
        InventoryItem::observe(InventoryItemObserver::class);
        Sale::observe(SaleObserver::class);
    }
}
