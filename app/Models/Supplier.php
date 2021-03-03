<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

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

    public function scopeHasValidPartnership()
    {
        $now = now()->format('Y-m-d');
        return $this->where('partnership_end_date', ">", $now)
            ->where("partnership_start_date", "<", $now);
    }
}
