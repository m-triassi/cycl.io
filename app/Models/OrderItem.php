<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = 'orderables';

    protected $guarded = ['id'];

    protected $appends = ['quantity'];

    public function purchase_orders() : MorphToMany
    {
        return $this->morphedByMany(PurchaseOrder::class, 'orderable');
    }
}
