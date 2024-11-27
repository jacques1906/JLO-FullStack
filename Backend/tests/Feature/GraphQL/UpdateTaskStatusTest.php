<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateTaskStatusTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_can_update_task_status(): void
    {
        // Arrange
        $task = Task::create([
            'description' => 'Test task',
            'status' => 'in_progress'
        ]);

        // Act
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation($id: ID!, $status: TaskStatus!) {
                updateTaskStatus(id: $id, status: $status) {
                    id
                    description
                    status
                }
            }
        ', [
            'id' => $task->id,
            'status' => 'completed'
        ]);

        // Assert
        $response->assertJson([
            'data' => [
                'updateTaskStatus' => [
                    'id' => (string) $task->id,
                    'description' => 'Test task',
                    'status' => 'completed'
                ]
            ]
        ]);
    }
} 