---
title: Heroku如何工作
date: 2022/01/20
tags:
 - 部署
 - 译文
 - heroku
categories:
 - backend
---

## 

最后更新于2022年1月27日

目录
-----------------
* [定义一个应用程序](#defining-an-application)
* [知道要执行什么](#知道要执行什么)
* [部署应用程序](#deploying-applications)
* [构建应用程序](#构建-应用程序)
* [在dynos上运行应用程序](#running-applications-on-dynos)
* [配置变量](#config-vars)
* [发布](#releases)
* [Dyno管理器](#dyno-manager)
* [附加组件](#add-ons)
* [日志和监控](#logging-and-monitoring)
* [HTTP路由](#http-routing)
* [把一切联系起来](#tying-it-all-together)
* [下一步](#next-steps)

这篇文章是对Heroku如何工作的高层次、技术性描述。此文会把你在Heroku平台上编写、配置、部署和运行应用程序时遇到的许多概念联系起来。

>执行一个[入门](https://devcenter.heroku.com/start)教程会使本文档中的概念更加具体。

请按顺序阅读本文档：为了呈现的连贯性，文章会逐步揭开并完善用来描述平台的概念。

最后一节会将所有的定义联系在一起，提供Heroku的[部署时间](#deploy)和[运行时间-视图](#runtime)。

定义一个应用程序
-----------------------

Heroku允许你部署、运行和管理用Ruby、Node.js、Java、Python、Clojure、Scala、Go和PHP编写的应用程序。

一个应用程序是用以上任意一种语言编写的_源代码_的集合，为了指示构建系统需要哪些额外的依赖性来构建和运行该应用程序，也许还需要一个框架，以及一些*依赖性描述*。

 >**术语**（初步）：应用程序由你的源代码和对任何依赖的描述组成。

不同语言的依赖机制各不相同：在Ruby中使用`Gemfile`，在Python中使用`requirements.txt`，在Node.js中使用`package.json`，在Java中使用`pom.xml`等等。

你应用程序的源代码，连同依赖文件，应该为Heroku平台提供足够的信息来构建你的应用程序，以产生可以执行的东西。

知道要执行什么
-----------------------

为了在Heroku上运行一个应用程序，你不需要对它做很多改动。一个要求是告知平台，你应用程序的哪些部分是可以运行的。

Heroku可以搞明白一些成熟的框架。例如在Ruby on Rails中，通常是`rails server`，在Django中是`python <app>/manage.py runserver`，在Node.js中是`package.json`的`main`字段。

>**术语**：[Procfiles](https://devcenter.heroku.com/articles/procfile)列出进程类型--你可能希望执行的命名命令。

对于其他应用程序，你可能需要明确声明可执行内容。在一个[Procfile](https://devcenter.heroku.com/articles/procfile)，一个伴随着你的源代码的文本文件中这样做：每一行都声明了一个[进程类型](https://devcenter.heroku.com/articles/process-model)，一个可以针对你建立的应用程序执行的命名命令。例如，你的Procfile可能看起来像这样。

```    
web: java -jar lib/foobar.jar $PORT
queue: java -jar lib/queue-processor.jar
```


这个文件声明了一个 `web`进程类型，并提供了为了运行它而需要执行的命令（在这个例子中，`java -jar lib/foobar.jar $PORT`）。它还声明了一个 "queue "进程类型，以及相应的命令。

在先前对应用程序的定义的基础上，现在可以包括这个单一附加Procfile了。

> **术语**。应用程序由你的源代码、对任何依赖关系的描述和Procfile组成。

Heroku是一个多语言平台，它让你以类似的方式在所有语言中构建、运行和扩展应用程序——利用依赖关系和Procfile。Procfile暴露了你应用程序的架构方面（在上面的例子中，有两个进入应用程序的入口），这种架构可以让你独立扩展每个部分。关于在Heroku上运行的应用程序的架构原则，可以在[Architecting Applications for Heroku]（https://devcenter.heroku.com/articles/architecting-apps）中找到一个很好的指南。

部署应用程序
----------------------

[Git](https://git-scm.com/)是一个强大的、分布式的版本控制系统，许多开发人员使用它来管理源代码并进行版本控制。Heroku平台使用Git作为部署应用程序的主要手段（也有其他方法将你的源代码传送到Heroku，包括通过API）。

当你在Heroku上创建一个应用程序时，它会将一个新的Git远程（通常名为 `heroku`）与你应用程序的本地Git仓库联系起来。

因此，部署代码只是熟悉的 `git push`，但是部署到远程的 `heroku`

```
$ git push heroku master
```

> **术语**：部署应用程序包括使用Git、GitHub或通过API将应用程序发送到Heroku。

也有许多其他部署应用程序的方法。例如，你可以启用[GitHub集成](https://devcenter.heroku.com/articles/github-integration)，这样每个新的拉动请求都与它自己的新应用相关联，这样就可以实现各种持续集成的场景；又或者你可以使用[Heroku API](https://devcenter.heroku.com/articles/build-and-release-using-the-api)来构建和发布应用程序。

综上所述，部署就是将你的应用程序从你的本地系统转移到Heroku ，Heroku也提供了几种可以部署应用程序的方法。

构建应用程序
---------------------

当Heroku平台收到应用程序的源代码时，它会启动源应用程序的构建。构建机制通常与语言有关，但遵循相同的模式：检索指定的依赖关系，并创建任何必要的资产（无论是简单的处理样式表还是复杂的编译代码）。

>**进阶**：[Buildpacks](https://devcenter.heroku.com/articles/buildpacks)位于slug编译后。Buildpacks将你的应用程序、依赖和语言运行环境结合起来，并产生slugs。它们是开源的，你可以将Heroku扩展到其他语言和框架。

例如，当构建系统收到一个Rails应用程序时，它会获取Gemfile中指定的所有依赖项，并根据资产管道生成文件。一个Java应用可以使用Maven获取二进制库的依赖，将源代码和这些库一起编译，并生成一个JAR文件来执行。

应用程序的源代码，连同获取的依赖关系和构建阶段的输出（如生成的资产或编译后的代码，语言和框架）都被组装成一个[slug](https://devcenter.heroku.com/articles/slug-compiler)。

> **术语**：一个[slug](https://devcenter.heroku.com/articles/slug-compiler)由源代码、获取的依赖关系、语言运行环境和构建应用程序中编译/生成的文件组成，可以被执行。

这些slugs是应用程序在执行过程中的基本层面发生的--它们包含编译、组装后的应用程序，以及你可能想要执行的指令（Procfile），可以随时运行。

在dynos上运行应用程序
-----------------------------

Heroku通过在[dyno](https://devcenter.heroku.com/articles/dynos)上运行你在Procfile中指定的命令来执行应用程序，此[dyno](https://devcenter.heroku.com/articles/dynos)已经预装了你准备好的slug（实际上，伴随着你的release，它会扩展你的slug和一些尚未定义的项目：配置变量和附加组件）。

把运行中的dyno想象成一个轻量级的、安全的、虚拟化的Unix容器，在它的文件系统中包含你的应用程序的slug。

> **术语**：[Dynos](https://devcenter.heroku.com/articles/dynos)是孤立的、虚拟化的Unix容器，它提供了运行一个应用程序所需的环境。

一般来说，如果你第一次部署一个应用程序，Heroku会自动运行1个Web dyno。换句话说，它将启动一个dyno，用你的slug加载它，并执行你在Procfile中与web进程类型相关的命令。

你可以控制在给定时间内有多少个dynos在运行。以前面的Procfile为例，你可以启动5个dynos，3个用于web，2个用于队列进程类型，如下所示。
```
$ heroku ps:scale web=3 queue=2
```    
当你部署一个新版本的应用程序时，所有当前执行的dynos都会被终止，而新的dynos（带有新的release）被启动后会在保留现有dyno数量的情况下取代已存在的dyno。

>**术语**：你的应用程序的[dyno formation](https://devcenter.heroku.com/articles/scaling#dyno-formation)是当前执行的dynos的总数，在你所扩展的各种进程类型中划分。

为了了解正在执行的内容，你只需要知道哪些dynos正在运行哪些进程类型。
```
$ heroku ps
== web: 'java lib/foobar.jar $PORT'
web.1: up 2013/02/07 18:59:17 (~ 13m ago)
web.2：up 2013/02/07 18:52:08 (~ 20m ago)
web.3：up 2013/02/07 18:31:14 (~41m ago)

==queue: `java lib/queue-processor.jar`
queue.1: up 2013/02/07 18:40:48 (~ 32m ago)
queue.2: up 2013/02/07 18:40:48 (~ 32m ago)
```    
Dynos是扩展应用程序的一个重要手段。在这个例子中，应用程序架构出色，允许网络和队列dynos进行的独立扩展。

配置变量
-----------
一个应用程序的配置是会在不同环境之间变化（如不同的暂存、生产、开发环境等）。它为你的应用程序提供一些特定的信息，如备份服务，如数据库、凭证或环境变量等。

Heroku让你用可定制的配置来运行你的应用程序——配置位于你的应用程序代码之外，可以独立于它进行更改。

应用程序的配置被存储在[config vars](https://devcenter.heroku.com/articles/config-vars)中。下面是如何为一个应用程序配置加密密钥的例子

```
$ heroku config:set ENCRYPTION_KEY=my_secret_launch_codes
添加配置变量并重新启动Demoapp......完成，V14
ENCRYPTION_KEY: my_secret_launch_codes
```    

> **术语**：[Config vars](https://devcenter.heroku.com/articles/config-vars)包含可定制的配置数据，可以独立于你的源代码进行更改。配置是通过环境变量暴露给运行中的应用程序的。

在运行时，所有的配置变量都以环境变量的形式暴露出来--所以它们可以很容易地被编程提取。一个部署了上述配置变量的Ruby应用程序可以通过调用`ENV["ENCRYPTION_KEY"]`访问它。

一个应用程序中的所有动态变量在运行环境中都=可以访问完全相同的配置变量集。

发布
--------

在前文提过，在一个dyno上运行你的应用程序时，Heroku平台会用你最近的slug加载dyno。这一点需要重新被定义：事实上，它加载的是slug和你指定给应用的任何配置变量。slug和配置的组合被称为[release]（https://devcenter.heroku.com/articles/releases）。
>**术语**（初步）：[Release](https://devcenter.heroku.com/articles/releases)是追加专用的slugs和配置变量的账本。

所有的版本都会被自动保存在一个追加专用的账本中，使管理应用程序和不同的版本变得容易。使用`heroku releases`命令来审计追踪。
```
$ heroku releases
== demoapp Releases
v103 Deploy 582fc95 [email protected] 2013/01/31 12:15:35
v102 Deploy 990d916 [email protected] 2013/01/31 12:01:12
```    
>部署信息旁边的数字，例如`582fc95`，对应的是你部署到Heroku的版本库的提交哈希值。

每次你部署一个新版本的应用程序，都会创建一个新的slug并生成release。

由于Heroku储存了应用程序的前版本，回滚和部署以前的版本也非常容易。
```
$ heroku releases:rollback v102
回滚demoapp...完成，v102
$ heroku releases
== demoapp发布
v104 回滚到v102 [email protected] 2013/01/31 14:11:33 (~15s ago)
v103 Deploy 582fc95 [email protected] 2013/01/31 12:15:35
v102 部署 990d916 [email protected] 2013/01/31 12:01:12
```    
对你的应用程序做一个实质性的改变，无论是改变源码还是配置，都会导致一个新的版本被创建。

综上所述，发行（release）就是Heroku让你独立于应用源（存储在slug中）来修改应用配置（config vars）的机制——发行将它们绑定在一起。每当你改变与你的应用程序相关的一组配置变量时，一个新的版本就会产生。

Dyno管理器
------------

Heroku平台的一部分，[dyno manager]（https://devcenter.heroku.com/articles/dynos），负责保持dynos的运行。例如，dynos每天至少循环一次，或者每当dyno管理器检测到运行中的应用程序出现故障（如内存不足的异常），又或者底层硬件出现问题，需要将dyno移动到一个新的物理位置时，dynos就会进行循环。

>**术语**：Heroku平台的[dyno manager](https://devcenter.heroku.com/articles/dynos)负责管理在Heroku上运行的所有应用程序的dynos。

动态器的循环是透明，定期自动进行的并被记录下来的。

> **术语**：使用免费dyno类型的应用程序将[休眠](https://devcenter.heroku.com/articles/free-dyno-hours)。当一个沉睡的应用程序收到HTTP流量时，它将被唤醒，这会导致几秒钟的延迟；使用其他的[dyno类型](https://devcenter.heroku.com/articles/dyno-types)可以避免程序休眠。

因为Heroku管理和运行应用程序，所以不需要管理操作系统或其他内部系统配置。[One-off dynos](https://devcenter.heroku.com/articles/one-off-dynos)可以连接到本地终端运行用户的输入/输出，也可以用来执行修改共享资源状态的管理任务，例如通过[调度器](https://devcenter.heroku.com/articles/scheduler)定期进行数据库配置。

> **术语**：[一次性动态发生器](https://devcenter.heroku.com/articles/one-off-dynos)是临时性的动态发生器，可以在你的本地终端上运行其输入/输出。它们与你的最新版本一起加载。

下面是创建和附加到一次性动态器的最简单方法。
```
$ heroku run bash
运行连接到终端的`bash'......，运行.8963
~ $ ls
```
这将启动一个新的dyno，加载你的版本，然后运行`bash`命令--这将为你提供一个Unix shell（记住，dynos是有效隔离的虚拟化Unix容器）。一旦你终止了你的会话，或者一段时间不活动后，dyno将被删除。

对一个dyno上的文件系统的改变不会传播到其他dyno上，也不会在不同的部署和dyno重启中持续存在。一个更好、更可扩展的方法是使用一个共享资源，如数据库或队列。

> **术语**：每个 dyno 都有自己的 [ephemeral filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem) - 带有最新发布版本的副本。它可以被用作临时的缓冲区，但对文件系统的改变不会反映到其他的动态系统中。

dyno中的文件系统的短暂性可以用上述命令来证明。如果你通过运行`heroku run bash`创建一个一次性的dyno，在dyno上使用Unix shell，然后在该dyno上创建一个文件，然后终止你的会话--这个变化就会丢失。所有的dynos，甚至是在同一个应用程序中的dynos，都是相互独立的。在会话终止后，dyno将被终止。新的测功机总是从slugs中创建，而不是从其他dyno的状态中被创建。

附加组件
-------

应用程序通常使用[add-ons](https://devcenter.heroku.com/articles/add-ons)来提供支持服务，如数据库、队列和缓存系统、存储、电子邮件服务等。附加组件是由Heroku和第三方提供的服务，我们有一个大型的[市场](https://elements.heroku.com/addons)附加组件供你选择。

Heroku将这些附加组件视为附加资源：提供一个附加组件只是从附加组件市场中选择一个，并将其附加到你的应用程序。

例如，以下是如何将[Heroku Redis](https://devcenter.heroku.com/articles/heroku-redis)备份存储插件添加到应用程序中。
```
$ heroku addons:create heroku-redis:hobby-dev
```
Dynos不共享文件状态，因此提供某种存储的附加组件通常被用作应用程序中各dynos之间的通信手段。例如，Redis或Postgres可以作为队列中的支持机制；那么网络进程类型的动态器可以将作业请求推送到队列中，队列进程类型的动态器可以从队列中提取作业请求。

附加服务提供者负责服务--而你的应用程序的接口通常是通过配置var提供的。 在这个例子中，当你提供附加服务时，一个`REDIS_URL`将自动添加到你的应用程序中。你可以编写代码，通过该URL连接到服务，例如。
```
uri = URI.parse(ENV["REDIS_URL"])
REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
```    

> **术语**：[附加组件](https://elements.heroku.com/addons/)是第三方的、专门的、增值的云服务，可以很容易地被添加到一个应用程序，扩展其功能。

附加组件与应用程序相关联，就像配置变量一样，因此你需要对先前的版本定义进行改进。你的应用程序的*发布*不仅仅是你的slug和config vars；它是你的slug、config vars以及配置的附加组件集。

>**术语**：[Release](https://devcenter.heroku.com/articles/releases)是slug、配置变量和附加组件的仅有附录的账本。Heroku对你所做的发布保持一个仅有附录的分类帐。

和配置变量一样，每当你添加、删除或改变一个附加组件，就会创建一个新的版本。

日志和监控
----------------------

Heroku将日志视为有时间戳的事件流，并将所有动态系统中运行的所有进程和Heroku平台组件产生的日志流整理到[Logplex](https://devcenter.heroku.com/articles/logplex)——一个高性能、实时的日志传输系统。

检查所有平台组件和动态系统中的日志很容易：
```
$ heroku logs
2013-02-11T15:19:10+00:00 heroku[router]: at=info method=GET path=/articles/custom-domains host=mydemoapp.heroku.com fwd=74.58.173.188 dyno=web.1 queue=0 wait=0ms connect=0ms service=1452ms status=200 bytes=5783
2013-02-11T15:19:10+00:00 app[web.2]: 开始为1.169.38.175的GET"/"在2013-02-11 15:19:10 +0000
2013-02-11T15:19:10+00:00 app[web.1]: 在 2013-02-11 15:20:10 +0000 开始为 2.161.132.15 获取"/"。
```   

在这里你可以看到3个有时间戳的日志条目，第一个来自Heroku的路由器，后两个来自运行web进程类型的两个动态器。

> **术语**：[Logplex](https://devcenter.heroku.com/articles/logplex)自动整理来自你的应用程序的所有运行的动态器以及其他组件（如路由器）的日志条目，提供单一的活动来源。

你也可以只从一个动态器中挖掘日志，并保持通道开放，倾听更多的事件。
```
$ heroku logs --ps web.1 --tail
2013-02-11T15:19:10+00:00 app[web.1]: 开始为1.169.38.175的GET"/"在2013-02-11 15:19:10 +0000
```   

Logplex仅出于性能的考虑，保留了有限的日志条目缓冲区。要持久保存它们，以及在异常情况下的电子邮件通知等行动事件，请使用[Logging Add-on](https://elements.heroku.com/addons/#logging)，它与Log drains联系起来--这是一个用于接收Logplex输出的API。

HTTP路由
------------

根据你的 dyno 形成，你的一些 dynos 将运行与 `web` 进程类型相关的命令，而一些将运行与其他进程类型相关的其他命令。

运行名为`web`的进程类型的动态器在一个方面与其他所有动态器不同--它们将接收HTTP流量。Heroku的[HTTP路由器](https://devcenter.heroku.com/articles/http-routing)将你的应用程序的传入请求分配给正在运行的web动态模块。

因此，扩展一个应用程序处理网络流量的能力涉及到扩展网络动态器的数量。
```
$ heroku ps:scale web+5
```    
一个随机选择算法被用于HTTP请求的负载平衡，这个路由同时处理HTTP和HTTPS流量。它还支持多个同时连接，以及超时处理。

总结归纳
---------------------

这里可以有两个解释：一是涉及应用程序的开发和部署，二是涉及Heroku平台和应用程序部署后的运行时操作。

下面两节重述了平台的主要组件。

### 部署

* 应用程序由你的源代码、对任何依赖关系的描述和Procfile组成。
* [Procfiles](https://devcenter.heroku.com/articles/procfile)列出进程类型--你可能希望执行的命名命令。
* 部署应用程序包括使用Git、GitHub或通过API将应用程序发送到Heroku。
* [Buildpacks](https://devcenter.heroku.com/articles/buildpacks)位于slug编译过程的背后。Buildpacks将你的应用程序、它的依赖关系和语言运行时间，并产生slugs。
* [slug](https://devcenter.heroku.com/articles/slug-compiler)是一个由你的源代码、获取的依赖关系、语言运行时间和编译/生成的构建系统输出组成的包，随时准备好执行。
* [Config vars](https://devcenter.heroku.com/articles/config-vars)包含可定制的配置数据，可以独立于你的源代码进行更改。配置是通过环境变量暴露给运行中的应用程序的。
* [Add-ons](https://elements.heroku.com/addons/)是第三方的、专门的、增值的云服务，可以很容易地附加到一个应用程序，扩展其功能。
* [release](https://devcenter.heroku.com/articles/releases)是由slug（你的应用程序）、配置变量和add-ons组合而成。Heroku对你所做的发布保持着一个仅适用于附录的账本。

### 运行环境

* [Dynos](https://devcenter.heroku.com/articles/dynos)是孤立的、虚拟化的Unix容器，它提供了运行应用程序所需的环境。
* 你的应用程序的[dyno formation](https://devcenter.heroku.com/articles/scaling#dyno-formation)是当前执行的dynos的总数，分为你已经扩展的各种进程类型。
* [dyno manager](https://devcenter.heroku.com/articles/dynos)负责管理在Heroku上运行的所有应用程序的dynos。
* 使用免费动态器类型的应用程序将在30分钟不活动后[休眠](https://devcenter.heroku.com/articles/free-dyno-hours)。扩展到多个网络动态器，或不同的动态器类型，将避免这种情况。


接下来的步骤
----------

* 执行一个[Getting Started](https://devcenter.heroku.com/start)教程，使本文档中的概念更加具体。
* 阅读[Architecting Applications for Heroku](https://devcenter.heroku.com/articles/architecting-apps)，了解如何利用Heroku的架构来构建可扩展的应用程序。