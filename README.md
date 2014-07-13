# BookMarkDown

A work in progress book building system.  BookMarkDown is very much alpha quality software.  It works, but can be fickle and there are some rough edges.  That said, it works, and is continually being improved.

There is currently one theme, and it only creates HTML output (PDF, and eBook support in the works).

[Documentation](https://jerrysievert.github.io/bookmarkdown/) is available to help get you started.

## Getting Started

### Installing

Installing BookMarkDown is easy if you already have `node.js` and `npm` installed:

```
$ npm install -g bookmarkdown
```

### Creating Your First Book

Creating a book is easy.  You can initialize a skeleton book with a single command:

```
$ initbmd myBook
```

This will create a new book in the `myBook` directory.  This creates a `book.json` file and a couple of sample chapters.

### Building an HTML Book

```
$ bmd2html --book book.json
```
