<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InventoryItem extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function materials() : BelongsToMany
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'assembly_id', 'material_id');
    }

    public function assemblies() : BelongsToMany
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'material_id', 'assembly_id');
    }

    public function supplier() : BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
