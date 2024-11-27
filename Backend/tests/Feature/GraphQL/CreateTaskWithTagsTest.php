<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateTaskWithTagsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_can_create_task_with_tags(): void
    {
        // Arrange
        $tag = Tag::create([
            'name' => 'urgent'
        ]);

        // Act
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation($description: String!, $tag_ids: [ID!]) {
                createTask(
                    description: $description,
                    tag_ids: $tag_ids
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
        ', [
            'description' => 'Test task',
            'tag_ids' => [$tag->id]
        ]);

        // Assert
        $response->assertJson([
            'data' => [
                'createTask' => [
                    'description' => 'Test task',
                    'status' => 'in_progress',
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