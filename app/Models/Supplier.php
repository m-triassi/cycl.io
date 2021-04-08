<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Constant indicating a supplier must pay after 60 days
     */
    public const DELAY_60 = 60;

    /**
     * Constant indicating a supplier must pay after 30 days
     */
    public const DELAY_30 = 30;

    /**
     * Constant indicating a supplier may pay immediately
     */
    public const DELAY_NONE = 0;



    public function inventory_items() : HasMany
    {
        return $this->hasMany(InventoryItem::class);
    }

    /**
     * attribute that can be used to check if partnerships are valid
     * @return bool
     */
    public function getValidPartnershipAttribute()
    {
        $now = now();
        return $now->isBefore($this->partnership_end_date) && $now->isAfter($this->partnership_start_date);
    }

    /**
     * scope query that allows for pulling all valid partnerships
     * @return mixed
     */
    public function scopeHasValidPartnership()
    {
        $now = now()->format('Y-m-d');
        return $this->where('partnership_end_date', ">", $now)
            ->where("partnership_start_date", "<", $now);
    }
}
