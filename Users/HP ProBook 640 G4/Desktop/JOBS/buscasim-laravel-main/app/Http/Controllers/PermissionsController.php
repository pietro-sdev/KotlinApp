<?php

namespace App\Http\Controllers;

use App\Models\Permissions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PermissionsController extends Controller
{
    public function getPermissionsByLoggedUser()
    {
        $userId = Auth::id();
        if ($userId) {
            $permissions = Permissions::select(
              'orders',
              'coupons',
              'contacts',
              'users',
              'pages',
              'settings',
              'visible_fields'
            )->where('user_id', $userId)->first();

            return response()->json( $permissions, 200);
        } else {

            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }
    }

    public function show($id)
    {
        $permissions = Permissions::where('user_id', $id)->first();

        return response()->json($permissions, 200);
    }

    public function store(Request $request)
    {
        $request = $request->all();
        $permissions = Permissions::create($request);

        return response()->json($permissions, 200);
    }

    public function update($id, Request $request)
    {
        $request = $request->all();
        $permissions = Permissions::find($id)->fill($request);
        $permissions->save();

        return response()->json($permissions, 200);
    }
}

