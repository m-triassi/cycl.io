<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->float('cost');
            $table->float('sale_price');
            $table->integer('stock')->default(0);
            $table->string('category')->nullable();
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->string('finish')->nullable();
            $table->string('material')->nullable();
            $table->string('part_number')->nullable();
            $table->float('lead_time')->nullable();
            $table->float('labour_cost')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventory_items');
    }
}
