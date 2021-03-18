<?php

namespace Tests\Feature;

use App\Actions\GenerateStockCSVAction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Tests\TestCase;

class StockReportTest extends TestCase
{

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_report_is_downloaded()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/stock/report');
        $file = $response->getFile();

        $this->assertFileExists($file->getPathname());
        $response->assertStatus(200);

        // clean up
        Storage::disk('public')->delete($file->getBasename());
    }
}
