<?php

namespace App\GraphQL\Mutations;

use App\Models\Task;

class CreateTask
{
    public function __invoke($_, array $args)
    {
        return Task::create([
            'description' => $args['description'],
            'status' => 'in_progress'
        ]);
    }
} 