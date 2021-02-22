<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Roles assigned to this user
     * @return BelongstoMany
     */
    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Check if the user has one of a given list of roles
     * @param  string|array  $role one or more role types to check for
     * @return bool       Returns true is the user's role matches any the provided roles
     */
    public function hasRole($roles)
    {
        return count(array_intersect($this->roles->pluck('type')->toArray(), (array)$roles))>0;
    }

    /**
     * Checks if the user has the role 'admin'
     * @return bool
     */
    public function isAdmin()
    {
        return $this->hasRole(Role::ADMIN);
    }

    /**
     * Checks if the user has any kind of role
     * @return bool
     */
    public function hasAnyRole()
    {
        return count($this->roles->pluck('type')->toArray()) > 0;
    }


}
