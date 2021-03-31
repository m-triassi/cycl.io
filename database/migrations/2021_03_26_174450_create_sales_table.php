<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('client_name');
            // pending, complete, cancelled
            $table->string('status');
            $table->string('payment_type');
            // to be hashed
            $table->string('card_number');
            $table->string('last_four')->nullable();
            $table->string('cardholder_name');
            $table->float('price');
            $table->timestamp('delivery_date');
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
        Schema::dropIfExists('sales');
    }
}
