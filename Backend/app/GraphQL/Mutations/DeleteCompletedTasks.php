<?php

namespace App\GraphQL\Mutations;

use App\Models\Task;

class DeleteCompletedTasks
{
    public function __invoke($_, array $args)
    {
        $count = Task::where('status', 'completed')->delete();
        return ['count' => $count];
    }
}   