<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use phpDocumentor\Reflection\Types\Boolean;

class InventoryItem extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $appends = ['is_below_minimum'];

    /**
     * Relation function that lists materials comprising of $this assembly
     *
     * @return BelongsToMany
     */
    public function materials() : BelongsToMany
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'assembly_id', 'material_id')
            ->withPivot('quantity');
    }

    /**
     * Relation function that lists assemblies that $this material is a part of
     *
     * @return BelongsToMany
     */
    public function assemblies() : BelongsToMany
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'material_id', 'assembly_id')
            ->withPivot('quantity');
    }

    /**
     * Relation function that associates $this item with a supplier
     *
     * @return BelongsTo
     */
    public function supplier() : BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Accessor to dynamically / check $this object is above or below minimum stock
     *
     * @return bool
     */
    public function getIsBelowMinimumAttribute() : bool
    {
        return $this->stock <= $this->minimum_stock;
    }

    /**
     * Scope query that allows for pre-filtering of items below inventory items
     *
     * @return Builder
     */
    public function scopeBelowMinimum() : Builder
    {
        return $this->whereRaw('stock <= minimum_stock');
    }
}
