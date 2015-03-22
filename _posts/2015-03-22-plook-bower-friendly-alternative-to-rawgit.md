---
layout: post
title: "Plook - Bower friendly alternative to Rawgit.com"
date:   2015-03-22 19:30:00
author: gustavohenke
tags: [ 'Bower' ]
---
So you know [Rawgit.com](http://rawgit.com/)? It's a great tool for sharing snippets all around, because it allows us to share GitHub files with the proper `Content-Type` header and with a nicer URL then the looong https://raw.githubusercontent.com/user/repo/branch/file.

And you like using Bower. Great! Almost all front-end developers I know like using it instead of NPM because of:

1. it's simpler;
2. contains more packages for front-end specific use.

So you want to share a snippet that references a file you got from Bower, using Rawgit... for example:

{% highlight html %}
<!-- Original code -->
<script src="/bower_components/angular/angular.js"></script>

<!-- Using Rawgit -->
<script src="//rawgit.com/angular/bower-angular/1.3.14/angular.js"></script>
{% endhighlight %}

Well, that works, but as you noted, requires you to know what are the user and repository for an package. That's why I present you an option for the combination of Rawgit + Bower: Plook.

<!-- more -->

[Plook](https://github.com/injoin/plook) is a simple server built here at InJoin. It works very similarly to Rawgit, but with the difference that it's friendly to Bower users:

{% highlight html %}
<!-- Original code -->
<script src="/bower_components/angular/angular.js"></script>

<!-- Using Plook -->
<script src="//plook.injoin.io/angular/1.3.14/angular.js"></script>
{% endhighlight %}

The format is very basic:

```
https://plook.injoin.io/PACKAGE_NAME/PACKAGE_VERSION/FILE
```

Where:

* `PACKAGE_NAME` is the name of the package in the [main Bower registry](http://bower.io/search/);
* `PACKAGE_VERSION` is any version available for that package, including `latest` for the latest version of a package;
* `FILE` is the path to the file you want to include.

We currently lack support for keeping Plook online, so it runs in a Heroku free account. That means every 30 minutes (or so) of inactivity, it goes offline.<br>
Unfortunately, this way we can't do good caching. So if you want to support Plook and help us scale, why don't you get in touch?