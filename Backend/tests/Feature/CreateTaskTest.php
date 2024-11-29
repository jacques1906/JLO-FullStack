<?php

namespace Tests\Feature\GraphQL\Mutations;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateTaskTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_can_create_task(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation {
                createTask(
                    description: "Test task"
                ) {
                    id
                    description
                    status
                    tags {
                        id
                        name
                    }
                }
            }
        ');

        $response->assertJson([
            'data' => [
                'createTask' => [
                    'description' => 'Test task',
                    'status' => 'in_progress',
                    'tags' => []
                ]
            ]
        ]);
    }
} 