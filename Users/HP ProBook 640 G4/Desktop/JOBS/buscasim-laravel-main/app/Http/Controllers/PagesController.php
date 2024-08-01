<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pages\CreatePageRequest;
use App\Http\Requests\Pages\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PagesController extends Controller
{
  /**
   * List all pages.
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function index(Request $request)
  {
    $query = Page::query();

    if ($request->has('title')) {
      $query->where('title', 'like', "%{$request->title}%");
    }

    if ($request->has('is_published')) {
      $query->where('is_published', '=', $request->is_published);
    }

    return response()->json($query->paginate(30), 200);
  }

  /**
   * Get a page by id.
   *
   * @param string $id
   * @return JsonResponse
   */
  public function detail(string $id)
  {
    $page = Page::where('id', $id)->first();

    if (!$page) {
      return response()->json([
        'message' => 'Página não encontrada'
      ], 404);
    }

    return response()->json($page);
  }

  /**
   * Create a new page.
   *
   * @param CreatePageRequest $request
   * @return JsonResponse
   */
  public function create(CreatePageRequest $request)
  {
    $page = Page::create([
      'title' => $request->title,
      'description' => $request->description,
      'slug' => '/' . Str::slug($request->slug),
      'content' => $request->content,
      'is_published' => $request->is_published,
    ]);

    return response()->json(['message' => 'Página criada com sucesso', 'data'=> $page], 201);
  }

  /**
   * Update a page.
   *
   * @param UpdatePageRequest $request
   * @param string $id
   * @return JsonResponse
   */
  public function update(UpdatePageRequest $request, string $id)
  {
    $page = Page::where('id', $id)->first();

    if (!$page) {
      return response()->json([
        'message' => 'Página não encontrada'
      ], 404);
    }

    $page->title = $request->title;
    $page->description = $request->description;
    $page->slug = '/' . Str::slug($request->slug);
    $page->content = $request->content;
    $page->is_published = $request->is_published;
    $page->save();

    return response()->json(['message' => 'Página atualizada com sucesso'], 200);
  }

  /**
   * Delete a page.
   *
   * @param string $id
   * @return JsonResponse
   */
  public function delete(string $id)
  {
    $page = Page::where('id', $id)->first();

    if (!$page) {
      return response()->json([
        'message' => 'Página não encontrada'
      ], 404);
    }

    $page->delete();

    return response()->json(['message' => 'Página excluída com sucesso'], 200);
  }

  /**
   * Get a published page by slug.
   *
   * @param string $slug
   * @return JsonResponse
   */
  public function getPageBySlug(string $slug)
  {

    if ($slug === 'home'){
      $sanitized_slug = '/';
    }else{
      $sanitized_slug = '/'. Str::slug(trim($slug));
    }

    $page = Page::where('slug', $sanitized_slug)->where('is_published', true)->first();

    if (!$page) {
      return response()->json([
        'message' => "Página não encontrada $sanitized_slug"
      ], 404);
    }

    return response()->json($page);
  }
}
