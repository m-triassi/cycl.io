<?php

namespace App\Http\Controllers;

use App\Models\Role;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RoleController extends Controller
{
    /**
     * Store a newly created role in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // validate that the incoming data is correct and present when needed
            $request->validate([
                'type' => 'required|string',
                'title' => 'required|string',
                'description' => "required|string"
            ]);
        } catch (ValidationException $e) {
            return response([
                'success' => false,
                'errors' => $e->errors()
            ]);
        }

        // grab the data to be stored
        $params = $request->only([
            'type',
            'title',
            'description'
        ]);

        // create the role
        $role = Role::create($params);
        $role->save();

        return response([
            'success' => true,
            'data' => $role->refresh()
        ]);

    }
}
