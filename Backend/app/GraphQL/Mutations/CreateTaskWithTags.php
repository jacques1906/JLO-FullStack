<?php

namespace App\GraphQL\Mutations;

use App\Models\Task;
use Illuminate\Support\Facades\Log;

class CreateTaskWithTags
{
    public function __invoke($_, array $args)
    {
        Log::info('CreateTaskWithTags - Input args:', $args);

        try {
            $task = Task::create([
                'description' => $args['description'],
                'task_description' => $args['task_description'] ?? null,
                'status' => 'in_progress'
            ]);

            Log::info('Task created:', $task->toArray());

            if (!empty($args['tag_ids'])) {
                $task->tags()->attach($args['tag_ids']);
                Log::info('Tags attached:', ['tag_ids' => $args['tag_ids']]);
            }

            $result = $task->load('tags');
            Log::info('Final task with tags:', $result->toArray());

            return $result;
        } catch (\Exception $e) {
            Log::error('Error in CreateTaskWithTags:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
} 