<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskCategory extends Model
{
    protected $fillable = ['name'];

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
