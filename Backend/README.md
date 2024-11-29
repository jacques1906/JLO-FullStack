# Task Manager Backend

## 📋 Description
A modern task management API built with Laravel and GraphQL, providing a robust backend for task and tag management.

## 🚀 Features
- Complete task management (CRUD operations)
- Tag system with many-to-many relationships
- Task status tracking (in_progress/completed)
- GraphQL API with Lighthouse
- Comprehensive test suite
- SQLite database for development

## 🛠 Technologies
- Laravel 10
- GraphQL (Lighthouse PHP)
- SQLite
- PHPUnit for testing

## 📦 Prerequisites
- PHP 8.1 or higher
- Composer
- SQLite

## ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/jacques1906/JLO-Projet-Backend
```
2. Install dependencies
```bash
composer install
```
3. Configure environment variables
```bash
cp .env.example .env
```
4. Generate application key
```bash
php artisan key:generate
```
5. Run migrations
```bash
php artisan migrate
```
6. Start server
```bash
php artisan serve
```


## 📝 API Documentation

### Available Queries
graphql
tasks: [Task!]!
task(id: ID!): Task
tags: [Tag!]!
tag(id: ID!): Tag

### Available Mutations
graphql
createTask(description: String!, task_description: String, tag_ids: [ID])
updateTaskStatus(id: ID!, status: TaskStatus!)
createTag(name: String!, description: String)
attachTag(task_id: ID!, tag_id: ID!)
deleteTask(id: ID!)
deleteCompletedTasks
deleteTag(id: ID!)

## Author
Jacques Z