<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function order_items() : MorphToMany
    {
        return $this->morphToMany(InventoryItem::class, 'orderable');
    }
}
