<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <!-- Google Tag Manager -->
  <script>
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', "{{ $meta['google_tag'] }}");
  </script>
  <!-- End Google Tag Manager -->

  <!-- Google Tag Manager -->
  {{-- <script>
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-TKK72VR8');
  </script> --}}
  <!-- End Google Tag Manager -->

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/favicon.png" />

  <title>{{ env('APP_NAME') }}</title>

  <meta name="description" content="{{ $meta['description'] }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ $meta['url'] }}">
  <meta property="og:title" content="{{ $meta['title'] }}">
  <meta property="og:description" content="{{ $meta['description'] }}">
  <meta property="og:image" content="{{ $meta['image'] }}">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={{ $meta['google_tag'] }}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', "{{ $meta['google_tag'] }}");
  </script>

  <!-- recaptcha -->
  <script async src="https://www.google.com/recaptcha/api.js"></script>

  <!-- Jivo Chat -->
  <script src="//code.jivosite.com/widget/hrSDSKxHVN" async></script>
</head>

<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $meta['google_tag'] }}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div id="root"></div>
  @viteReactRefresh
  @vite('resources/src/index.tsx')
</body>

</html>
