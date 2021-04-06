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
}
