<?php

namespace Tests\Feature\GraphQL;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateTagTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_tag(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation {
                createTag(name: "urgent") {
                    id
                    name
                }
            }
        ');

        $response->assertJson([
            'data' => [
                'createTag' => [
                    'name' => 'urgent'
                ]
            ]
        ]);
    }
}