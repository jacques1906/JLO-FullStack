<?php

namespace App\GraphQL\Types;

use App\Models\Task;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class TaskType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Task',
        'description' => 'A task item',
        'model' => Task::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::id()),
                'description' => 'The id of the task'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The title of the task'
            ],
            'task_description' => [
                'type' => Type::string(),
                'description' => 'The detailed description of the task'
            ],
            'status' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The status of the task'
            ]
        ];
    }
}
