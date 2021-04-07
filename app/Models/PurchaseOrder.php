<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class PurchaseOrder extends Model
{
    use HasFactory;

    public const PENDING = 'pending';
    public const RECEIVED = 'received';
    public const PAID = 'paid';
    public const CANCELLED = 'cancelled';

    protected $guarded = ['id'];

    protected $appends = ['cost'];

    public function order_items() : MorphToMany
    {
        return $this->morphToMany(InventoryItem::class, 'orderable')->withPivot('quantity');
    }

    public function getCostAttribute()
    {
        return round($this->order_items->map(function ($orderable) {
            return $orderable->cost*$orderable->pivot->quantity;
        })->sum(), 2);
    }
}
