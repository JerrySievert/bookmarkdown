<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/markdown.css">
    <title>{{title}}</title>
  </head>
  <body>
    <div class="title">
      <h1 class="book-title">{{title}}</h1>
      <h2 class="book-author">{{author}}</h2>
    </div>
    <!-- toc -->
    {{{table}}}
    <!-- preface -->
    {{{preface}}}
    <!-- chapters -->
    {{#each chapters}}
    {{{text}}}
    {{/each}}
  </body>
</html>