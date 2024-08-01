<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\ResetEmail;
use App\Models\Permissions;
use App\Models\ResetTokens;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
  /**
   * List all the users.
   */
  public function index(Request $request)
{
    $query = User::with('permissions'); // Remova o filtro que exclui o usuário autenticado

    if ($request->has('name')) {
        $query->where('name', 'like', "%{$request->name}%");
    }

    if ($request->has('email')) {
        $query->where('email', 'like', "%{$request->email}%");
    }

    if ($request->has('role')) {
        $query->where('role', '=', $request->role);
    }

    return response()->json($query->paginate(30), 200);
}



  /**
   * Create a new user.
   */
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name'      => 'required|string',
      'email'     => 'required|string|email|unique:users,email',
      'is_active' => 'boolean'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    $user = User::create($request->only('name', 'email', 'is_active'));

    $permissions = [
      'orders' => $request['orders'] === true ? 1 : 0,
      'pages' => $request['pages'] === true ? 1 : 0,
      'coupons' => $request['coupons'] === true ? 1 : 0,
      'settings' => $request['settings'] === true ? 1 : 0,
      'visible_fields' => $request['visible_fields'] === true ? 1 : 0,
      'contacts' => $request['contacts'] === true ? 1 : 0,
      'users' => $request['users'] === true ? 1 : 0,
      'user_id' => $user->id
    ];

    Permissions::create($permissions);

    if (!$user) {
      return response()->json([
        'message' => 'Ocorreu um erro ao criar o usuário'
      ], 400);
    }

    $token = Str::random(32);

    ResetTokens::where('email', '=', $request->email)->delete();
    ResetTokens::insert([
      'email'       => $request->email,
      'token'       => $token,
      'created_at'  => Carbon::now()->addDays(3)->toDateString()
    ]);

    Mail::to($request->email)->send(new ResetEmail($token));

    return response()->json([
      'message' => 'Usuário cadastrado com sucesso!'
    ], 201);
  }

  /**
   * Update a user.
   */
  public function update(Request $request, string $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'message' => 'Usuário não encontrado'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'name' => 'string',
        'email' => 'string|email|unique:users,email,' . $id,
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    if ($request->has('name')) {
        $user->name = $request->name;
    }

    if ($request->has('email')) {
        $user->email = $request->email;
    }

    $user->save();

    $permissions = $user->permissions ?: new Permissions(['user_id' => $user->id]);

    $permissions->fill([
        'orders' => $request['orders'] ? 1 : 0,
        'pages' => $request['pages'] ? 1 : 0,
        'coupons' => $request['coupons'] ? 1 : 0,
        'settings' => $request['settings'] ? 1 : 0,
        'visible_fields' => $request['visible_fields'] ? 1 : 0,
        'contacts' => $request['contacts'] ? 1 : 0,
        'users' => $request['users'] ? 1 : 0,
    ])->save();

    return response()->json(['message' => 'Usuário atualizado com sucesso'], 200);
}


  /**
   * Remove a user.
   */
  public function destroy(string $id)
  {
    $user = User::where('id', '=', $id)->first();

    if (!$user) {
      return response()->json([
        'message' => 'Usuário não encontrado'
      ], 404);
    }

    $user->delete();

    return response()->json(['message' => 'Usuário removido com sucesso'], 200);
  }
}
