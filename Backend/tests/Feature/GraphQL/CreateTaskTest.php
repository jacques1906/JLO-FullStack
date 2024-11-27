<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateTaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_task(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation {
                createTask(description: "Test task") {
                    id
                    description
                    status
                }
            }
        ');

        $response->assertJson([
            'data' => [
                'createTask' => [
                    'description' => 'Test task',
                    'status' => 'in_progress'
                ]
            ]
        ]);
    }
} 