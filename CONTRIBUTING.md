# Contributing to fullstory-babel-plugin-annotate-react

Thanks for taking the time to contribute!

Here are some important resources to consider:

  * [README](./README.md)
  * [FullStory's Annotate React plugin for Web & Native](https://help.fullstory.com/hc/articles/360049493054-FullStory-s-Annotate-React-plugin-for-Web-Native)
  * [Getting Started with FullStory React Native Capture](https://help.fullstory.com/hc/articles/360052419133)
  * [FullStory Help Center](https://help.fullstory.com/)
  * [FullStory Community](https://community.fullstory.com/)
  * [FullStory Developer Guide](https://developer.fullstory.com/)

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help.

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
    - [Making Code Changes](#making-code-changes)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
- [Pull Request Process](#pull-request-process)

## I Have a Question

> Search for similar questions in our [Community Portal](https://community.fullstory.com/) and browse through our [Help Center](https://help.fullstory.com/) before asking a question.

If you then still feel the need to ask a question and need clarification, we recommend:

- Creating a new [GitHub issue](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/issues/new?template=ask_a_question.md), filling in the templated description.
	- Alternatively, you can submit your questions to our [Community](https://community.fullstory.com/).
- Please provide as much context as you can with your question.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant to your issue.

## I Want To Contribute

### Making Code Changes

#### Preparing your environment

Before getting started, it is important to configure your development environment and all dependencies correctly.
1. The `fullstory-babel-plugin-annotate-react` uses node 12. 
    1. Install [node 12 from the official website](https://nodejs.org/en/blog/release/v12.13.0) or use the [node version manager (nvm)](https://github.com/nvm-sh/nvm) to manage different versions of node on your machine.
2. Clone the repository using HTTPS, SSH, or the Github CLI.
    1. **HTTPS**: `git clone https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react.git`
    2. **SSH**: `git clone git@github.com:fullstorydev/fullstory-babel-plugin-annotate-react.git`
    3. **GitHub CLI**: `gh repo clone fullstorydev/fullstory-babel-plugin-annotate-react`
3. Install dependencies from the root directory of the project using `npm i`

#### Testing your changes

We use Jest as our test runner to verify changes and behaviors in our package. We use both unit tests and snapshot tests to prevent regressions in our code base. In order to run the jest tests you must have prepared your [local environment](#preparing-your-environment).

You can run the tests from the project root directory using `npm run test`.

### Reporting Bugs

#### Before Submitting a Bug Report

Please complete the following steps in advance to help us fix any potential bugs as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions. (If you are looking for support, you might want to check [this section](#i-have-a-question)).
- Check if there is already an [open issue](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/issues?q=is%3Aopen+is%3Aissue+label%3Abug) for the problem you're encountering.
- Also make sure to search the internet (including Stack Overflow) to see if other users have discussed the issue.
- Collect information about the bug and create a minimal reproducible example.
    - Include sample source code or other data files and document the expected behavior.
    - The inputs and the outputs used to test your sample code.
    - Include a stack trace or traceback.
    - Describe the OS, Platform and Version (Windows, Linux, macOS, Android, iOS, x86, ARM).
    - Describe the current version of the `fullstory-babel-plugin-annotate-react` package that you are using.
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead follow the instructions outlined by our [Security Incident & Coordinated Vulnerability Disclosure](https://help.fullstory.com/hc/en-us/articles/360020624254-Security-Overview#h_01G9QN7Y3GYW36M01HG1RRTFXE) process or email [psirt@fullstory.com](mailto:psirt@fullstory.com).

If you run into an issue with the project:
- Create a new [GitHub issue](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/issues/new?&template=bug_report.md) with our bug report template.
	- Alternatively you can submit your request through the [FullStory Help Center](https://help.fullstory.com/hc/en-us/requests/new) with details about the error you're running into.
- Provide the information you collected in the previous section. 
- For faster remediation you should isolate the problem and create a reduced test case or provide a minimal reproducible example.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps.
- If the team is able to reproduce the issue, it will be handled accordingly by our support team. We will do our best to maintain an open line of communication as we work on your request.


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion such as a completely new feature or minor improvements to existing functionality. Following these guidelines will help maintainers to understand your suggestion.

- Make sure that you are using the latest version.
- Find out if the functionality is already covered.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to convince the maintainers of the merits of this feature. We want features that will be useful to the majority of users.

#### Creating a Feature Request

Enhancements are suggested by creating a new [GitHub issue](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/issues/new?&template=feature_request.md) with our feature request template.

- Use a descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement, include screenshots and animated GIFs if necessary.
- Describe the current behavior and explain which behavior you expected to see instead. 
- Describe alternatives to your solution and why the alternatives do not work for you.
- Explain why this enhancement would be useful.

## Pull Request Process

All pull requests should include a clear list of your changes (read more about [pull requests](http://help.github.com/pull-requests/)). Any pull request that makes functional changes to the library should also include unit tests. We can always use more test coverage. 

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

```
$ git commit -m "A brief summary of the commit
> 
> A paragraph describing what changed and its impact."
```

1. Update the [README.md](./README.md) with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
2. Write a short description with your changes in the [CHANGELOG.md](./CHANGELOG.md). 
    - The versioning scheme we use is [SemVer](http://semver.org/).
3. A project maintainer will merge your code if all tests pass and you've received an approval on the pull request of at least one project maintainer.