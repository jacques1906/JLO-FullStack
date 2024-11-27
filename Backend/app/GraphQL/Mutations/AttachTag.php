<?php

namespace App\GraphQL\Mutations;

use App\Models\Task;
use App\Models\Tag;

class AttachTag
{
    public function __invoke($_, array $args)
    {
        $task = Task::findOrFail($args['task_id']);
        $tag = Tag::findOrFail($args['tag_id']);
        
        $task->tags()->attach($tag);
        
        return $task->fresh(['tags']);
    }
} 