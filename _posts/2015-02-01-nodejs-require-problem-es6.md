---
layout: post
title:  "The Node.js require('../../..') problem and ES6"
date:   2015-02-01 00:00:00
author: gustavohenke
tags:   [ 'JavaScript', 'Node.js' ]
---

While writing an application in Node.js, you'll often have to deal with deep module paths in your
calls to the `require()` function:

{% highlight javascript %}
var a = require( "../../../lib/a" );
var b = require( "../../../lib/b" );
var c = require( "../../../lib/c" );
{% endhighlight %}

Apart from being ugly, this is also a maintenance nightmare.

[That's a problem inherent to the Node.js nature](http://nodejs.org/api/modules.html#modules_all_together).
You are only able to `require()` relative files, core modules (like `fs` or `path`) or locally
installed modules (anything located inside the known `node_modules` directory).

Obviously, I came across this exact problem. I found [this amazing gist](https://gist.github.com/branneman/8048520)
by [@branneman](https://github.com/branneman), but it did not cover my problems.<br>
Now, in this post I want to show what worked and what did not work and why, hoping that it'll be
useful for someone else.

<!-- more -->

## Possible solutions

My application is using the lovely [ECMAScript 6 module spec](http://www.2ality.com/2014/09/es6-modules-final.html).
To accomplish the task of using ES6 today, I'm using [6to5's require hook](http://6to5.org/docs/usage/require/).

### 1. Symlinks
Creating a symlink was my first attempt:

{% highlight bash %}
cd node_modules
ln -nsf lib ../lib
{% endhighlight %}

This poses a few problems for Windows users: __they'll need elevated privileges and Git will only
make it work for unix OSs.__ Actually, I'm a Windows user, so I dropped this solution.

### 2. Place needed directories inside `node_modules`
Easy solution - you just have to move your directories, from

{% highlight text %}
app
├─ lib
├─ node_modules
│  ├─ 6to5
│  ├─ express
│  └─ winston
└─ index.js
{% endhighlight %}

to

{% highlight text %}
app
├─ node_modules
│  ├─ 6to5
│  ├─ express
│  ├─ lib
│  └─ winston
└─ index.js
{% endhighlight %}

The problem? It feels wrong to versionate something inside `node_modules` and you'll find lots of
garbage while trying to find first-party code. Also, such code is likely to include various business
rules.

### 3. Global variable
Just define a global variable with the app entry point directory:

{% highlight js %}
global.__base = __dirname;
{% endhighlight %}

BUT, you'll quickly fail when using ES6...:

![Syntax error while using global variable in imports]({{ site.baseurl }}/images/posts/2015-02-01-nodejs-require-problem-es6-1.png)

### 4. `NODE_PATH` environment variable
The [Node.js docs](http://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)
describe that it'll try to load modules from every path in a `NODE_PATH` environment variable. Great!

Except for... cross platform issues.

If you're like me and want to minimize customizing stuff just because of local/testing/production envs,
polluting your repository with various scripts for Windows/Unix is not an option.

But hey, we can update `process.env.NODE_PATH` in Node...

### Meet the hackish way
As my app uses ES6, I'm not dropping modules in favor of functions, so I ended up using the most
hackish way I found: a combo of `process.env.NODE_PATH` and private Node core method.

{% highlight js %}
process.env.NODE_PATH = __dirname;
require( "module" ).Module._initPaths();
{% endhighlight %}

This code is placed before anything else in the entry point of the app. However, it's a hack -
someday it may just stop working. Be aware of this before you try on your own app.

## Conclusion
It doesn't mean that because something worked for me that it'll work for you. If you want to evaluate
all the options, be sure to check [this gist](https://gist.github.com/branneman/8048520) by
[@branneman](https://github.com/branneman) and the discussion in the comments.