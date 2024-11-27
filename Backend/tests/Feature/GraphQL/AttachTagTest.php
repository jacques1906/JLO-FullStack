<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use App\Models\Task;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AttachTagTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_can_attach_tag_to_task(): void
    {
        // Arrange
        $task = Task::create([
            'description' => 'Test task',
            'status' => 'in_progress'
        ]);

        $tag = Tag::create([
            'name' => 'urgent'
        ]);

        // Act
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation($taskId: ID!, $tagId: ID!) {
                attachTag(task_id: $taskId, tag_id: $tagId) {
                    id
                    description
                    tags {
                        id
                        name
                    }
                }
            }
        ', [
            'taskId' => $task->id,
            'tagId' => $tag->id
        ]);

        // Assert
        $response->assertJson([
            'data' => [
                'attachTag' => [
                    'id' => (string) $task->id,
                    'description' => 'Test task',
                    'tags' => [
                        [
                            'id' => (string) $tag->id,
                            'name' => 'urgent'
                        ]
                    ]
                ]
            ]
        ]);
    }
} 