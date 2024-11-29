<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ConnectionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_graphql_endpoint_is_accessible(): void
    {
        $response = $this->postJson('/graphql', [
            'query' => '
                query {
                    tasks {
                        id
                        description
                        status
                    }
                }
            '
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'tasks'
                ]
            ]);
    }
} 