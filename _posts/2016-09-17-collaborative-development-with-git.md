---
layout: post
title: "Collaborative development with Git"
date: 2016-12-12 21:31:05
description: "consider the way that you contribute with teams, how important it is for large projects which requires organization and maintenance."
main-class: 'dev'
color: '#637a91'
tags:
- "git"
- "workflow"
- "productivity"
image: "/assets/img/icons/git.svg"
twitter_text: "A thought on the effective contribution using git..."
introduction: "A thought about practices in the contribution of projects within teams."
---

Is remarkable the growing demand of using version control systems, allowing and encouraging us to have multiple branches that can be entirely independent of each other. In this article will be discussed about the basics of common Git workflows used by enterprise teams.

To follow this article make sure to be comfortable with basic knowledge of git, so if you are not so familiar with version control systems I encourage you to follow this great [guide](http://rogerdudler.github.io/git-guide/index.html) for beginners.

## Git Workflows

There are several workflows for git and it's use case vary of a set of circumstances that you and your team should reflect over very carefully. For this reason, in this article I'll be showing more carefully the available workflows and give you a better understanding of how they work.

Well then, to get us started I'd like to show you the most popular workflows that will be discussed in this article, these are:

1. [Centralized Workflow](#centralized-workflow)
2. [Feature Branch Workflow](#feature-branch-workflow)
3. [Gitflow Workflow](#gitflow-workflow)
4. [Forking Workflow](#forking-workflow)

### Centralized Workflow
When you finish a feature, you may want to share your local working copy to a `remote repository`. In order to achieve this goal we could use a Centralized Workflow to provide a single point-of-entry for all changes to the project, allowing collaboration and streamline communication between developers.

Basically developers work on a feature in a `private local` one and sync with a `remote repository`, providing two main **branchs**.

![Git Repositories]({{site.baseurl}}/assets/img/method-draw-image.svg)

So when your current work is finished and you want to synchronize with a remote repository you would follow this flow below:

{% highlight css %}
(master *)$ git commit -am "my changes"
(master *)$ git pull origin master
(master *)$ git push origin master
{% endhighlight %}

However are certain drawbacks that you should be aware, as `recursive merges` that may happen when you synchronize with a repository and that ends up by affecting the `commit history`, as seen below:

![asdas]({{site.baseurl}}/assets/img/logs.png)

To prevent this from happening and staying with a clear and linear commit history there are bunch of approaches and one of them  that I'll be showing here is called `rebase`, as you can see in the code snipped below:

{% highlight css %}
(master *)$ git pull --rebase origin master
{% endhighlight %}

To wind up this topic, you may be wondering in which cases a centralized workflow can be useful. Well, in my option it may be convenient mostly for very basic projects by the simplicity  and learning curve provided by this workflow.

### Feature Branch Workflow
Imagine that you have to implement a `shopping cart` feature and while you are developing that you don't want to affect the production environment, to archive this goal you could use a **feature branch**:


{% highlight css %}
(master *)$ git checkout -b shopping_cart
  Switched to a new branch 'shopping_cart'

(shopping_cart *)$ git push origin shopping_cart
  * [new branch] shopping_cart -> shopping_cart
{% endhighlight %}

Once this new branch has been created, you will have a separated branch tracked with the remote repository and you can comfortably implement your features in a dedicated branch without affect the production environment of the application.

When the implementation of this feature is completed you now will need to share the code you have made simply by merging to (master) production:

{% highlight css %}
(shopping_cart *)$ git rebase master
(shopping_cart *)$ git checkout master
  * Switched to branch 'master'

(master *)$ git merge shopping_cart
(master *)$ git push origin master
{% endhighlight %}

After the merge, at this point the `shopping_cart` branch may not be as useful anymore and you may want to remove it from the branchs:

{% highlight css %}
(master *)$ git push origin :shopping_cart
  - [deleted] shopping_cart

(master *)$ git branch -D shopping_cart
  Deleted branch shopping_cart
{% endhighlight %}

So we can  bring to a conclusion that this workflow is commonly useful for adding new features and a special attention should be paid. From there, you encapsulate a particular feature without disturbing the main codebase into `master` branch, avoiding failures such as in a production environment.

### Gitflow Workflow
The ideia behind **Gitflow** is very similar to the [Feature Branch](#feature-branch-workflow) that in fact both can work together. However, there are certain concepts  which should be taken into account, such as `branches`, `releases` and `tags`.

Before anything else we should not use the `master` as the parent of our branches. Instead, we usually create other branches to put our commits, like hotfixes, acceptance tests or a good one example as a development branch created below:

{% highlight css %}
(master *)$ git checkout -b development
  Switched to a new branch 'development'

(development *)$ git push origin development
  * [new branch] development -> development
{% endhighlight %}

From now on, when new features come ready to production, we create a `release branch` as a delivery of what we done in the development branch:

{% highlight css %}
(development *)$ git checkout -b release-1.0 development
  Switched to a new branch 'release-1.0'

(release-1 *)$ git tag v1.1.1 -m "shopping cart feature"
{% endhighlight %}

Another idea that we must take in practice from the above code snippet is the use of `tags`, every time you push to production, use them to keep track of all production releases. Generally you only need tags for releases, but pay attention to them, tags are regarded as documentation! If you want more information on naming your tags, a great place to go is the [Semantic Version 2.0.0](http://semver.org/).

In order to put a new release to production, we can do as follows:

{% highlight css %}
(release-1 *)$ git checkout master
  Switched to branch 'master'

(master *)$ git merge release-1.0
(master *)$ git push origin master
(master *)$ git tag v1.0.0
(master *)$ git push origin --tags
{% endhighlight %}

To finish this section, **Gitflow** may be desirable for large project, bringing with it improvements such as a stable master branch, ease of code review and helps to avoid late integration of features. However, you should consider knowledge in Git amoung the members of your team, keep in mind that **Gitflow** is complex. Notice that are topics which should be further explored such as the *use cases* for release branches, *types of tags*, etc.

### Forking Workflow
All that has been said so far was thought from the point of view of private corporate environments. But most projects hosted on services such as *GitHub*  are certainly open source, whence provides push permissions flexibly to non-collaborators from a repository easily as shown below:

{% highlight css %}
# 1. You need fork and clone a repository
# 2. Create your feature branch:
  $ git checkout -b my-new-feature
# 3. Commit your changes:
  $ git commit -m 'Add some feature'
# 4. Push to the branch:
  $ git push origin my-new-feature
# 5. Submit a pull request
{% endhighlight %}

When you send a pull request, the owner of the original repository is then notified, check your pull request and decide to accept or not, accepting it is then created a *merge commit*. Other users can also review your branch, commit and add their changes to your pull request, besides that anyone can comment on PR.

Thinking on huge projects such as Linux kernel, having thousands of collaborators there also **Dictator and Lieutenants** workflow, where various integration managers are in charge of certain parts of the repository.

## Conclusion
I hope I have made clear the ideia to follow a workflow for a better experience along with teams, make sure to pick a good one which fits in your project and use it always in favor of the collaborators, also putting into practice the basic knowledge on good practices as small and expressive commits among individual developers.

Just to finish, do not stop your knowledge here, you can start reading the excellent [Git Pro](https://git-scm.com/book/en/v2) book and learn more about git basics, tools, environments, servers and more through a complete content for free.
