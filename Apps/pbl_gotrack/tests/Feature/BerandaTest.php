<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BerandaTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_beranda_page_is_accessible(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('Elevasi Identitas Apparel Anda');
        $response->assertSee('Belanja Sekarang');
        $response->assertSee('Testimonials');
    }
}
