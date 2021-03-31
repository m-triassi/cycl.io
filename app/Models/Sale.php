<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Hash;

class Sale extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $hidden = ['card_number'];

    protected $appends = ['cost'];

    public const PENDING = 'pending';
    public const RECEIVED = 'received';
    public const PAID = 'paid';
    public const CANCELLED = 'cancelled';

    public const VISA = 'Visa';
    public const MASTER_CARD = 'Master Card';


    public function order_items() : MorphToMany
    {
        return $this->morphToMany(InventoryItem::class, 'orderable')->withPivot('quantity');
    }

    public function getCostAttribute()
    {
        return round(collect($this->order_items->pluck('cost'))->sum(), 2);
    }

    public function setCardNumberAttribute()
    {
        $this->attributes['last_four'] = substr($this->card_number, -4, 4);
        $this->attributes['card_number'] = Hash::make($this->card_number);
    }

    /**
     * scope query that allows for filtering sales by status
     * @return Builder
     */
    public function scopeFilterByStatus(Builder $query,$status)
    {
        return $query->where('status','LIKE',$status."%");
    }

}
