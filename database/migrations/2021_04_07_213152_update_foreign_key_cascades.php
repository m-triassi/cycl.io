<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UpdateForeignKeyCascades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // if we're in a sqlite (aka CI/CD container) database, this wont work so skip.
        if (config('database.default') == 'sqlite') {
            return;
        }

        Schema::table('orderables', function (Blueprint $table) {
            $table->dropForeign('orderables_inventory_item_id_foreign');

            $table->foreign('inventory_item_id')
                ->references('id')
                ->on('inventory_items')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });

        Schema::table('inventory_items', function (Blueprint $table) {
            $table->dropForeign('inventory_items_supplier_id_foreign');

            $table->foreign('supplier_id')
                ->references('id')
                ->on('suppliers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
