<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_can_query_all_tasks(): void
    {
        // Arrange
        Task::create([
            'description' => 'Test task 1',
            'status' => 'in_progress'
        ]);

        // Act
        $response = $this->graphQL(/** @lang GraphQL */ '
            query {
                tasks {
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

        // Assert
        $response->assertJsonStructure([
            'data' => [
                'tasks' => [
                    '*' => [
                        'id',
                        'description',
                        'status',
                        'tags'
                    ]
                ]
            ]
        ]);
    }
} 