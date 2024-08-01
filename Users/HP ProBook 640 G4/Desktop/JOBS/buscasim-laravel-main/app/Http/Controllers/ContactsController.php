<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCreateRequest;
use App\Models\Contact;
use App\Models\Coupon;
use App\Traits\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class ContactsController extends Controller
{
  use Helpers;

  /**
   * List all contacts.
   */
  public function index(Request $request)
  {
    $query = Contact::query();

    if ($request->has('name')) {
      $query->where('name', 'like', "%{$request->name}%");
    }

    if ($request->has('email')) {
      $query->where('email', 'like', "%{$request->email}%");
    }

    if ($request->has('subject')) {
      $query->where('subject', 'like', "%{$request->subject}%");
    }

    $query->orderBy('created_at', 'desc');

    return response()->json($query->paginate(10), 200);
  }

  /**
   * Create a new contact.
   */
  public function store(ContactCreateRequest $request)
  {
    Contact::create([
      'name'        => $request->name,
      'email'       => $request->email,
      'phone'       => $request->phone,
      'subject'     => $request->subject,
      'message'     => $request->message,
    ]);

    return response()->json(['message' => 'Muito obrigado pela mensagem.'], 201);
  }

  /**
   * Remove a contact.
   */
  public function destroy(string $id)
  {
    $contact = Contact::where('id', '=', $id)->first();

    if (!$contact) {
      return response()->json(['message' => 'Contato não encontrado'], 404);
    }

    $contact->delete();

    return response()->json(['message' => 'Contato removido com sucesso'], 200);
  }
}
