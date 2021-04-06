<?php

namespace Tests\Feature;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SaleTest extends TestCase
{
    use DatabaseTransactions;

    /**
     *
     * @test
     * @return void
     */
    public function test_sales_can_be_stored()
    {
        // Make sure we're redirected if we try to store without authentication
        $redirected = $this->post('/sale', [
            'client_name' => "Test client",
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);

        $redirected->assertStatus(302);

        $user = User::first();

        $salesBefore = Sale::count();
        // Try proper inputs
        $proper = $this->actingAs($user)->post('/sale', [
            'client_name' => "Test client",
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);

        // Did we succeed?
        $proper->assertStatus(200);
        $properData = $proper->getOriginalContent();
        $this->assertTrue($properData['success']);
        $this->assertEquals($salesBefore + 1, Sale::count());


        // Try improper inputs, invalid status
        $improper = $this->actingAs($user)->post('/sale', [
            'client_name' => "Test client",
            'status' => 'not arrived',
            'payment_type' => 'Visa',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);


        // Try improper inputs, invalid payment type
        $improper = $this->actingAs($user)->post('/sale', [
            'client_name' => 'Test client',
            'status' => 'pending',
            'payment_type' => 'gold doubloons',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);


        // Try improper inputs, invalid card number (not enough numbers)
        $improper = $this->actingAs($user)->post('/sale', [
            'client_name' => 'Test client',
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => '12341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);


        // Try improper inputs, invalid card number (non numeric instance)
        $improper = $this->actingAs($user)->post('/sale', [
            'client_name' => 'Test client',
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => 'A234B234C234D234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description'=>'This is a test',
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);


        // Try improper inputs, invalid price
        $improper = $this->actingAs($user)->post('/sale', [
            'client_name' => 'Test client',
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => 'eighty six dollars',
            'description'=>'This is a test',
        ]);
        $improperData = $improper->getOriginalContent();

        // Did we fail?
        $this->assertFalse($improperData['success']);
        $this->assertNotNull($improperData['errors']);
    }

    /**
     *
     * @test
     * @return void
     */
    public function test_sales_can_be_updated()
    {
        $sale = Sale::create([
            'client_name' => 'Test client',
            'status' => 'pending',
            'payment_type' => 'Visa',
            'card_number' => '1234123412341234',
            'cardholder_name' => 'Mr. Test',
            'price' => '86.99',
            'description' => 'This is a test',
        ]);

        // make sure we're redirected
        $redirected = $this->put("/sale/$sale->id", [
            'description' => 'redirection test',
        ]);

        $redirected->assertStatus(302);


        $user = User::first();

        // proper update
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'status' => "shipped",
            'payment_type' => 'Master Card',
            'card_number' => '1234123466669999',
            'price' => '69.99',
        ]);
        $updatedData = $updated->getOriginalContent();
        $updated->assertStatus(200);
        $this->assertNotEquals($sale, $updatedData['data']);
        $this->assertEquals("shipped", $updatedData['data']->status);
        $this->assertNotEquals($sale->card_number, $updatedData['data']->card_number);
        $this->assertEquals("Master Card", $updatedData['data']->payment_type);
        $this->assertEquals("69.99", $updatedData['data']->price);

        // improper update, invalid status
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'status' => 'still not here yet',
        ]);
        $this->assertEquals("shipped", $updatedData['data']->status);


        // improper update, invalid payment type
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'payment_type' => 'gold doubloons',
        ]);
        $this->assertEquals("Master Card", $updatedData['data']->payment_type);

        // improper update, invalid card number (not enough digits)
        $cardNumberBefore = $updatedData['data']->card_number;
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'card_number' => '12341234',
        ]);
        $this->assertEquals($cardNumberBefore, $updatedData['data']->card_number);


        // improper update, invalid card number (non numeric instance)
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'card_number' => 'A234B234C234D234',
        ]);
        $this->assertEquals($cardNumberBefore, $updatedData['data']->card_number);


        // improper update, invalid price
        $updated = $this->actingAs($user)->put("/sale/$sale->id", [
            'price' => 'eighty six dollars',
        ]);
        $this->assertEquals("69.99", $updatedData['data']->price);
    }

        /**
     *
     * @test
     * @return void
     */
    public function test_sales_can_be_shown()
    {

        // Create a sale
        $sale = Sale::create([
            'description' => "This items will be a test sale",
            'client_name' => "test name",
            'status' => "test status",
            'payment_type' => "test payment",
            'card_number' => "12341234123412349876987698769876",
            'cardholder_name' => "john doe",
            'price' => 1,
        ]);

        $user = User::first();
        $sales = $this->actingAs($user)->get("/sale/$sale->id");
        $salesData = $sales->getOriginalContent();

        $ids = $salesData['data']->pluck('id');

        $sales->assertStatus(200);
        $this->assertTrue($sales["success"]);
        $this->assertContains($sale->id, $ids);
    }

    /**
     *
     * @test
     * @return void
     */
    public function test_sales_can_be_indexed()
    {
        // make sure we're redirected if un-authenticated
        $redirect = $this->get("/sale");
        $redirect->assertStatus(302);

        $user = User::first();
        $index = $this->actingAs($user)->get("/sale");
        $indexData = $index->getOriginalContent();

        // check that we got everything
        $index->assertStatus(200);
        $this->assertTrue($indexData['success']);
        $this->assertEquals(Sale::count(), count($indexData['data']));

        // check filters work
        $filtered = $this->actingAs($user)->get('/sale?status=quod');
        $filteredData = $filtered->getOriginalContent();

        $this->assertTrue($filteredData['success']);
        $filtered->assertStatus(200);
        $this->assertLessThan(Sale::count(), count($filteredData['data']));
    }
}
