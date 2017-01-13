---
layout: post
title: "Effective Image Handling in Responsive Web Sites"
date: 2016-09-25 19:13:30
description: "Improving UX Through Front-End Performance Optimization"
main-class: 'misc'
color: '#637a91'
tags:
- "frontend"
- "performance"
image: "/assets/img/icons/html.svg"
twitter_text: "Effective Image Handling in Responsive Web Sites"
introduction: "Improving UX through front-end performance optimization"
---

Improve website performance is a strong point in user experience term, simply because no one likes to waste time waiting for pages to load. Nowadays it is totally necessary to provide more speed to the users independently platforms.

Based on this premise, I will be showing in this post front-end techniques to reduce the **weight of images** on the web.

### # Tip 1: Fluid Images

When handling with responsive images, we certainly want to support visual quality combined with performance. To archive this goal, it would be interesting to consider the use of different images for each device to improve the user experience.

The simplest way to succeed in this kind of optimization is using the  CSS3 `media queries`:

```css
/*---------------
 common devices
-----------------*/
.picture {
    background-image: url(foo-small.png);
}

@media only screen and (min-width: 768px) {
    .picture {
        background-image: url(foo.png);
    }
}

/*------------------
  device pixel ratio
--------------------*/
.logo {
    background-image: url(logo.png);
}

@media (resolution: 2dppx) {
    .logo {
        background-image: url(logo@2x.png);
    }
}
```

In this code snippet, we have an image for small devices and another for the desktop version. Also, you can easily deal with retina displays as shown above. The biggest advantage of this approach is that it does not rely on third-party libraries.

#### Modern Browsers and Polyfills
There are alternatives to frameworks  like [Picturefill](https://github.com/scottjehl/picturefill), which allows us to define elements and attributes with the file name you want to load, let's look at some examples:

* `srcset attribute`: it allows us to pass a set of srcs

```css
<img src="logo.png"
  srcset="logo-hd.png 2x, logo.png 1x">
```

* `picture element`: specify different image sizes to be served by different devices

```css
<picture alt="Title">
  <source src="content-image.jpeg">
  <source media="(min-width: 768px)" src="content-image-lg.jpg">
</picture>
```

### # Tip 2: Reduce HTTP 1.1 Requests

If you are giving support for HTTP 1 protocol you certainly will have to consider reducing requests due to bottlenecks on the latency (RTT), especially on mobile devices due to RCC approach. I will not delve into these concepts here to avoid tiring and widespread reading, but I recommend that you research these issues better. So let's focus here on techniques in practice to minimize HTTP requests to speed up page load times.

#### 1. Inline Resources
This is a technique to reduce the number of requests on the script files, but we can also use it in small images such as logos, icons and SVG, these are files with the size of about 1, 2 or 3 KB. Keep on mind that in these cases, the cost of making a new request for a resource is much higher due to latency.

* `Base64 encoded images`

There are several tools that perform this task, as the online tool [Base64-image](https://www.base64-image.de) that performs the conversion and then we can easily embed the encoding string using *css* properties or *img* elements, as shown below.

```css
<img src="data:image/png;base64,iVBORw0KGgoAA">
```

To avoid needlessly complex files, you can also easily get that same result with Sass/Compass, as shown below:

```css
@mixin encoded-image($url) {
  background-image: inline-image($url);
}
```

In conclusion, you might be wondering is that when we put something directly in the HTML file it means that every page will have to download this resource again, right? So what would be the ideal size for a HTML file?

This question is related to tcp segment size (~1.4 K) and the new proposed tcp initial size (10), so if we multiply these two values we will understand that the ideal size for a HTML file is less than 14 KB, it is a html with gzip and all built.

#### 2. Sprites
When we deal with static resources files such as css and js is common perform the concatenation of these to decrease the number of requests. Thinking in this way, we can concatenate images in the same way we do with css/js files. However, concatenate images is not so simple, but it is possible. The concatenation of images is also called `sprite`.

Before getting started we could use Photoshop to concatenate the images, however we can automate this task with the popular [ImageMagick](http://www.imagemagick.org/) CLI with the following command:

```sh
  $ convert src/assets/img/*.png -append dist/assets/img/sprite.png
```

Now we need to use the new file and apply a unique background and then set with the help of DevTools the background-position for each corresponding image.

```css
.icon {
  background: url('img/sprite.png') no-repeat;
  width: 18px;
  height: 18px;
}

.icon-twitter {
  background-position: -5px -5px;
}
.icon-git {
  background-position: -33px -5px;
}
```
This seems hard work to be done but some developers prefer this approach instead of looking for some automation tool because the css inside can be somewhat complicated when generated. This is a personal method, so if you prefer a tool to handle with this job its a valid choice too. Therefore, there is [Sprity](https://www.npmjs.com/package/sprity) plugin that can be used with some task manager or via CLI as shown below:

```sh
  # automatically finds the coordinates for us:
  $ sprity out/ images/*.png -s style.css
```

There is another alternative for deal with sprites if you are using Sass with Compass through the [CSS Sprite](http://compass-style.org/reference/compass/helpers/sprites/) helpers used in the following code snippet below:

```sass
@import "compass"
$icons: sprite-map("icons/*.png")

i
  background: $icons
  display: inline-block

@each $i in sprite_names($icons)
    .icon-#{$i}
      background-position: $sprite-position($icons, $i)
      +sprite-dimensions($icons, $i)
```

### # Tip 3: Deferring Images
Defer images is certainly a great choice to be applied for faster pages, the idea behind this technique is to prioritize the loading of essential resources (css, js), avoiding concurrence with images or other heavier resources that blocks the rendering such as scripts, iframes, etc. Basically then, a deferred image is downloaded after the initial page load.


### # Tip 4: Compressive Images

This technique comes from reducing the image size by considering things like unnecessary metadata, optimization mode (lossy, lossless) balancing quality and small file size. There are several tools that perform this kind of task, one of them is the popular [TinyPNG](https://tinypng.com/).

![TinyJPG]({{site.baseurl}}/assets/img/tyny-jpg.png)

 As we can see, the file size from their showcase is reduced by more than 70% from the original file with a perfect balance in quality. But do not stop here, there are other great tools that you can enjoy, as shown below:

**Online Tools:**

* [kraken](https://kraken.io/web-interface) , [jpegmini](http://www.jpegmini.com/) - JPG, PNG
* [svgom](https://jakearchibald.github.io/svgomg/) - SVG

**Desktop:**

* [ImageOptim](https://imageoptim.com/) - Mac
* [RIOT](http://luci.criosweb.ro/riot/) - Windows

**CLI:**

* [mozjpeg](https://github.com/mozilla/mozjpeg)
* [pngnq ](https://sourceforge.net/projects/pngnqs9/)
