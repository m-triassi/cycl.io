<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Converts a comma separated string to an array
     *
     * @param $input
     * @return array
     */
    protected function stringToArray($input) : array
    {
        // convert a string to an array by splitting it on "," or casting it to an array
        return is_string($input) ? explode(',', str_replace(" ", "", $input))
            : (array) $input;
    }
}
