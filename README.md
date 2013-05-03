silexcross-obelix
=================

School project for Silex

# What you will need to develop :

There is a bunch of script inside the `server/` directory.
If you are using windows, you can simply double click on any of the bat files to launch a server.
Alternatively, you can open the `cmd` prompt and run the batfile from there.
On linux, simply use `server/ruby.sh` or any of the other shell executables.
**You will NEED either python, ruby, or node-js.**

- Last ressort : https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally

# Architecture :

`index.html` is the main file. It loads all other files according to the URL :
`http://yoururl.com/index.html/

# How partial template inclusion works :

- There are two types of partials templates : `headers` and `footers`, headers are prepended to the body tag, whilst footers are appended to the body tag.

- Basicaly, every partial template you will use **MUST** be placed in the `html/partials` directory and **MUST** begin with an underscore.

- If you want to use the defaults partials, you must create both `_header.html` and `_footer.html` files if they don't already exists.

```
 /
 index.html
 html/
     map.html
     partials/
             _header.html
             _footer.html
```

- To load the default templates, simply use `partial.load();` or `partial.load('all');`
- To load specific templates, you can use `partial.load('MyTemplateName');`

```
 /
 index.html
 html/
     partials/
             _myHeaderTemplate.html
             _myFooterTemplate.html
```

```javascript
  partial.load('myHeaderTemplate'); // Loads only the header
  partial.load('myHeaderTemplate', 'myFooterTemplate'); // Loads both footer, and header

  // BEWARE, for ORDER MATTERS :
  partial.load('myFooterTemplate', 'myHeaderTemplate'); // This would load the footer BEFORE the header.
```

- You can add new Headers and Footers using `addHeader()` or `addFooter()`;
- You can clear the partial list using `clearAll()`

```javascript
  partial.addHeader('myHeaderOne');
  partial.addFooter('myFooterOne');
  partial.addHeader('myHeaderTwo');

  partial.load('all'); // Will load : partials/_header.html, partials/_footer.html, partials/_myHeaderOne.html, partials/_myHeaderTwo.html, partials/_myFooterOne.html

  partial.clearAll();
  partial.load('all'); // Will load nothing.

  partial.clearAll();
  partial.addHeader('myHeaderOne');
  partial.addFooter('myFooterOne');
  partial.load('all'); // Will load : partials/_myHeaderOne.html, partials/_myFooterOne.html

  partial.clearAll();
  partial.addHeader('myHeaderOne');
  partial.addFooter('myFooterOne');
  partial.load('myHeaderOne'); // Will load : partials/_myHeaderOne.html
```

__See `html/map.html` for a simple example use case.__