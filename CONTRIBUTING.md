# How to Contribute

Thank you for wanting to contribute!

## Coding Style

Try to keep your coding style in line with the existing code. It might
not exactly match your preferred style but it's better to keep things
consistent.

## Making Changes

We use the git branching model known as
[GitHub Flow](https://help.github.com/articles/github-flow/). As such,
all development must be performed on a
["feature branch"](https://martinfowler.com/bliki/FeatureBranch.html)
created from the main development branch, which is called `master`. To
submit a change:

1. [Fork](http://help.github.com/forking/) the
   [repository](https://github.com/craigtmoore/AgfaJenkinsChromeExtension)
   on GitHub
1. Clone your fork locally
1. Configure the upstream repo (`git remote add upstream
   git://github.com/blairconrad/AgfaJiraChromeExtension.git`)
1. Create a local branch (`git checkout -b my-branch master`)
1. Work on your feature
1. Rebase if required (see below)
1. Push the branch up to GitHub (`git push origin my-branch`)
1. Send a
   [pull request](https://help.github.com/articles/using-pull-requests)
   on GitHub

You should never work directly on the `master` branch and you should
never send a pull request from the `master` branch - always from a
feature branch. The reasons for this are detailed below.

## Handling Updates from upstream/master

While you're working away in your branch it's quite possible that your
upstream/master may be updated. If this happens you should:

1. [Stash](http://progit.org/book/ch6-3.html) any un-committed changes
   you need to
1. `git checkout master`
1. `git pull upstream master`
1. `git push origin master` - (optional) this makes sure your remote
   master branch is up to date
1. `git rebase master my-branch`
1. apply any changes you stashed in the first step
1. if you previously pushed your branch to your origin, the next time
   you push, you will need to
   force push the rebased branch - `git push origin my-branch
   --force-with-lease` 

This ensures that your history is "clean", i.e. you have one branch off
from master followed by your changes in a straight line. Failing to do
this ends up with several "messy" merges in your history, which we
don't want. This is the reason why you should always work in a branch
and you should never be working in, or sending pull requests from,
master.

If you're working on a long running feature then you may want to do
this quite often, rather than run the risk of potential merge issues
further down the line.

## Sending a Pull Request

While working on your feature you may well create several branches,
which is fine, but before you send a pull request you should ensure
that you have rebased back to a single feature branch. We care about
your commits and we care about your feature branch but we don't care
about how many or which branches you created while you were working on
it. :smile:

When you're ready to go you should confirm that you are up to date and
rebased with upstream/master (see "Handling Updates from
upstream/master" above) and then:

1. `git push origin my-branch`
1. Send a
   [pull request](https://help.github.com/articles/using-pull-requests)
   in GitHub, selecting the following dropdown values:

| Dropdown      | Value                                             |
|---------------|---------------------------------------------------|
| **base fork** | `blairconrad/AgfaJiraChromeExtension`                           |
| **base**      | `master`                                          |
| **head fork** | `{your fork}` (e.g. `{your username}/AgfaJiraChromeExtension`) |
| **compare**   | `my-branch`                                       |

The pull request should include a description starting with
`Fixes #123.`
(using the real issue number, of course) if it fixes an
issue. If there's no issue, be sure to clearly explain the intent of
the change.
