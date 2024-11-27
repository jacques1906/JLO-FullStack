<?php

namespace App\GraphQL\Mutations;

use App\Models\Task;

class CreateTaskWithTags
{
    public function __invoke($_, array $args)
    {
        $task = Task::create([
            'description' => $args['description'],
            'status' => 'in_progress'
        ]);

        if (isset($args['tag_ids'])) {
            $task->tags()->attach($args['tag_ids']);
        }

        return $task->load('tags');
    }
} 