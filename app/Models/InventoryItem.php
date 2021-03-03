<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function materials()
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'assembly_id', 'material_id');
    }

    public function assemblies()
    {
        return $this->belongsToMany(InventoryItem::class, 'bill_of_materials', 'material_id', 'assembly_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
