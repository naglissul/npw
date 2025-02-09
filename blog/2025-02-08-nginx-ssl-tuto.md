---
tags: [en, learn]
---

# Deployment: linux server, nginx, SSL

This post explains how to deploy basic static website using:

- AWS EC2 ubuntu server
- nginx
- cloudflare

Later gonna have some YouTube videos.

## Intro

Ok. So you learned to mak html files. So called "websites". But, sadly, your grandma can't open `C:/Users/Carl/Descktop/website.html` from her computer. So how do you make your website "public"?

Of course, you can use Wordpress, Wix or some other platform that's gonna make your matters easier, if you just want to have a website. But this post is not about that. We want to have **full** control on our website and understand how things actually work under the hood.

Also, of course, you can just install firebase-tools, run `firebase deploy` and have your html website displayed "publicly", in other words - depoloyed. But that's just a tool of Google, it's not open source. We don't do that here.

## For total beginners

What is the Internet? That's nothing more than just a bunch of computers connected together with some wires. Those wires send electricity impluses in a certain pattern and this way send data. And then there is an international standard consensus on what that data would mean. So some computer can get a message "hey, give me what you got on port 80" and then decide to give back an html file. So if you make your website public - this just means that you make a certain computer with html file accessible to the whole world.

## Setup

### Server options

It can be:

1. University server/user. For example, MIF in Vilnius University gives all students a login to the university network. But it has limitations...
2. Linode. You can get pretty cheap (5 dollars a month, but billed hourly) experimental linux servers there. And it can be set up pretty easily.
3. Google Cloud. Idk for sure, never used. Only for firebase, which is free, but you cannot host backend.
4. AWS. This is the most popular solution. It has **a lot** of deployment solutions, some are free, some are cheap, some are expensive. But it's also very overcomplicated, you need to actually learn to use it. And if you are not careful, you can get a very unexpected bill at the end of the month...
5. You can just use your own computer. For that, of course, you gonna need to have an internet plan from a provider. And have a router. Then you could read the small print on that router and login to the admin account to do the port forwarding. On that later, maybe.

We're gonna use AWS EC2.

### AWS

...

## Nginx

On server run command `sudo apt install nginx` and then `sudo systemctl start nginx`, check the running status with `sudo systemctl status nginx` and stop service with, you guessed it, `sudo systemctl stop nginx`.

That's it. Type your server ip address to the browser and you should see "Welcom to nginx" message. Like this:

![alt text](image-3.png)

That's it. Here you go, you have a website.

But you'd probably would want to:

1. edit the content of this website,
2. have the little lock next to ip without red line (make https instead of http),
3. have a name for website (domain).

## Edit content

`/var/www/html/index.nginx-debian.html` - edit this file content (you can do so with `nano` tool).

`/etc/nginx` - here you can find other content for configuring nginx.

## Setup SSL and domain

This will make requests/responses encrypted and safe. Basic option - using letsencrypt with certbot. But this is only needed for your own website doing everything from zero (later tutorial).

For now we can just use CloudFlare. It automatically provides SSL, when using a domain.
