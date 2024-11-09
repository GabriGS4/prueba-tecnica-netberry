<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    protected $fillable = ['name'];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'task_categories');
    }
}
