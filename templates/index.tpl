<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{%= o.htmlWebpackPlugin.options.description %}">
    <meta name="format-detection" content="telephone=no">
    <link rel="apple-touch-icon" href="">
    <link rel="shortcut icon" href="">
    {% for (var css in o.htmlWebpackPlugin.files.css) { %}
      <link rel="stylesheet" href="{%= o.htmlWebpackPlugin.files.css[css] %}">
    {% } %}
    <title>CDP Portal</title>
  </head>
  <body>
    <div id="app"></div>
    {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
      <script src="{%= o.htmlWebpackPlugin.files.chunks[chunk].entry %}"></script>
    {% } %}
  </body>
</html>
