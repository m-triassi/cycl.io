<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPaymentDelayToSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            // can be either 60, 30, or 0
            $table->integer('payment_delay')->default(0)->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            //
        });
    }
}
