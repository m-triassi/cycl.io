<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Sale;

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
            $table->string('client_name');
            $table->string('description')->nullable();
            // pending, complete, cancelled
            $table->string('status')->default(Sale::PENDING);
            $table->string('payment_type');
            // to be hashed
            $table->string('card_number');
            $table->string('last_four')->nullable();
            $table->string('cardholder_name');
            $table->float('price')->nullable();
            $table->timestamp('delivery_date')->nullable();
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
