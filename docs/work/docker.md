---
toc: content
---

# Docker 容器化平台

## Docker 的组成

### Dockerfile

Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。

### image 镜像

首先就是开篇提到的类与实例的关系，镜像就是类，镜像类似于系统镜像的概念，对于前端而言，镜像就是包含了代码运行所需要的一切产物、依赖、配置等。这样的话，可以保证每次程序运行的环境一致。构建镜像，一般都是通过一个文本文件来生成。这个文件就是 Dockerfile，文件内容就是一系列的指令集合。
举 🌰 来说，对于一个简单的前端应用来说，首先需要安装 NodeJS 作为运行环境，其次则是需要安装依赖，最后需要通过 npm run build 这样的命令来构建应用产物。这个过程在 Dockerfile 中就是一系列的指令集合，后面会具体分析各个指令用法。

### container 容器

有了镜像以后，可以通过镜像产出容器，这个“容器”就是实例的概念，所以拿到容器以后可以放到任意平台去使用、比如 windows、linux、unix 等，真正做到了一处开发，到处使用的功能。需要注意的是容器并不是虚拟机、它只是一个进程，同普通程序一样，理解这点在启动容器的时候尤为重要。

### 仓库

Docker 中的仓库其实和 github、gitee 这样的代码仓库是类似的概念，只是后者是用来存储源代码、而前者是用来存储镜像的，比如前端肯定会使用到的 NodeJS，则是在 Docker Hub 中可以找到。使用的时候，就可以在仓库中找到对应的镜像即可。同样自己写的镜像也可以上传到仓库中，类似于 git 的 push 操作，而 pull 操作则是从仓库中拉取镜像。

### Volumes

Volumes 翻译过来为卷，就是磁盘中的卷的意思，Docker 中的卷主要是用来持久化数据的。当我们生成镜像的时候，需要保持镜像体积尽可能的小，并且镜像中操作数据，下次再去构建时并不会保存操作的数据，因此是不建议在镜像中去操作数据的，如果有操作数据的需要，则可以使用卷关联宿主机上的某个文件夹来持久化保存数据。对于前端而言，这个功能用到的很少。
了解以上这些基本概念以后，就可以尝试在项目中使用 Docker 了。

## 前端使用 Docker 的作用

### 部署高效，且利于项目迁移

node 项目传统的部署步骤（基于 Jenkins 的那套）：

Jenkins 构建机上拉取项目代码
npm install、npm run build 及上传静态资源到 CDN
将构建物传递给目标服务器的指定目录
去目标服务器的指定目录启动 node 服务完成部署

node 项目使用 docker 容器化后的部署步骤：

在本地先拉取一个 nodejs 的基础镜像，并以此镜像启动一个容器
在该容器里 npm install、npm run build 及上传静态资源到 CDN，并将该容器打包上传到远程镜像仓库
去服务器拉起该镜像，启动 node 服务即可访问到你想要的 node 服务和对应的前端资源

特别是对于项目迁移，已经使用 docker 技术的项目，迁移起来根本不费事。因为已经将代码和运行环境带包成了一个整体，迁到哪个服务器上就去哪个服务器拉这个已经制作好的镜像就好了。

### 标准化了运行环境，部署更加稳定可靠

docker 技术最大的优点就是为各个不同的代码环境（或服务器）磨平了环境差异，为你的代码提供了开发-测试-生产一模一样的运行环境。
这个在 docker 技术出现之前是几乎很难做到的，因为造成造成你代码运行环境不一致的因素太多了，比如操作系统种类、操作系统版本、node 版本、node modules 包的版本（总有些包没有被锁死版本）及一些基础依赖包如 Nginx、pm2、redis 等的版本。

**时间应该浪费在美好的事物上，而不是陷入在给不同环境找差异的苦恼之中。** <br/>
而 docker 的出现恰好就是为了解决这个问题而生的，它标准化了运行环境，使用镜像包的形式将不同的代码和运行环境固定成了一个整体，就像将所有货物打包成了一个集装箱一样。
它致力于所见即所得，即你在本地所见到的就应该是你上线后应该得到的。这种部署方式稳定且可靠，确实不要太酷！<br/>
**如果说 Git 等代码管理工具统一了各个环境分支的代码，那么 docker 相当于统一了各个环境代码的运行环境。**

### 更易于持续交付和部署(CI/CD)

现代化软件开发强调持续集成和交付，这就要求我们构建和部署的过程要非常高效。
Docker 部署配合 GitLab CI 的方式让我们的部署流程更加的自动化、简单化和高效。
这完全是 devOps 的思想。CI/CD 创造了一种实时反馈回路机制，持续地传输小型迭代更改，从而加速更改，提高质量。CI 环境通常是完全自动化的，通过 git 推送命令触发自动构建和打包新镜像，然后推送到 Docker 镜像库，最后使用 Python 脚本自动拉取该新镜像，并启动 node 服务。
这整个过程一条龙服务，从你提交代码合到对应测试分支之后，你就再也不用再考虑任何事了。一切都是高效、自动化的，交付速度提高至少好几倍。

### 运维更加高效，秒级回滚

如果理解了镜像包的概念，秒级回滚这个就不难理解了。你每打一个镜像就相当于一个版本。

如果你上线后突然发现有问题或者发了不该发的代码，这个时候你只需要找到之前稳定的镜像包并在服务器上重新拉取，运行对应的服务就可以了。

## Docker 对比 虚拟机

| 对比项   |            Container（容器）             |     虚拟机     |
| -------- | :--------------------------------------: | :------------: |
| 启动速度 |                   秒级                   |     分钟级     |
| 运行性能 |                 接近原生                 |    有所损失    |
| 磁盘占用 |                    MB                    |       GB       |
| 数量     |                 成百上千                 |   一般几十台   |
| 隔离性   |                 进程级别                 |    系统级别    |
| 操作系统 |               只支持 Linux               |    几乎所有    |
| 封装程度 | 只打包项目代码和依赖关系，共享宿主机内核 | 完整的操作系统 |

## 杂谈

### 1.docker 有用吗？

你觉得 docker 没啥用，自然是因为你没遇到这样的场景，所以就算强行上了 docker，也会觉得非常别扭。想了想前端用 docker 好像确实不是非常必要，npm build 以后出来一堆静态文件，扔到 nginx 里面就完事了。
但是假如是后端的话，就比较麻烦了。一个应用要用 python3.5，另一个应用要用 python3.8，还有个应用依赖 XXX，这个 XXX 还依赖于 python3.3……搞起来就比较麻烦了。当然，大多数工具都有相应的多版本共存，但是弄起来不麻烦吗。而且要是很多台机器同时配置，简直想死了。

这时候如果把它封装成 docker 镜像，无需配置，运行仅需要一条命令，应用之间有隔离，大家内部访问的都是 mysql:3306，而且还不会干扰，简直就是神器！如果你对这些没啥感觉，可以尝试一下自己从头配置搭建一个 gitlab，然后再用 docker 启动一个 gitlab，体验简直就是天差地别。

### 2.docker 是虚拟机，跑一个 linux 至少得运行一个 linux 镜像，而我本身的 centos 已经是一个 linux 环境了，跑两个是不是有点浪费资源？

还是那句话，docker 是半虚拟化的容器，有一个特点就是性能比较高。其实现在虚拟机的性能也不错，但是容器性能更高，完全相当于原生应用。你用 docker 跑 mysql，和本地部署 mysql 没有什么差别，性能完全不受影响，浪费资源的情况更是不存在。

而且现在 docker 也并不是新鲜技术，早就广泛应用了，大家用的好好的，所以如果你有想法的话完全可以放心大胆的用，一点问题没有。

### 3.首先 docker 的优势就是它不是虚拟机，节省资源。但是可以隔离不同应用的依赖环境。

应用 A 依赖 node 版本 8.x.x
应用 B 依赖 node 版本 10.x.x
前端还好，特别是一些后端应用，数据库版本这些。
还有就是环境安装可是一个老大难的问题，docker 可以完美解决。
