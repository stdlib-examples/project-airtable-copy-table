# Copy Airtable Tables between Bases

Airtable currently provides no built-in functionality to copy the entire contents
of an Base's Table to another Base. This is a script that can easily copy the
contents of `SRC_BASE.SRC_TABLE` to `DEST_BASE.DEST_TABLE`.

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

# Example Usage

Once deployed, you can copy the contents of one Airtable Base to another
by running the `/copy-table/` endpoint via HTTP with parameters:

- `sourceTableName`: The name of the source table on `SRC_BASE`
- `desintationTableName`: The name of the destination table on `DEST_BASE`
- `count`: The total number of records to copy
- `batchSize`: The number of records to transfer simultaneously.

For a free account you can only run endpoints up to 30s (30,000ms) at a time.
If you need longer, paid accounts allow for up to five (5) minutes of execution.

# Table of Contents

1. [How It Works](#how-it-works)
1. [Installation](#installation)
1. [Making Changes](#making-changes)
   1. [via Web Browser](#via-web-browser)
   1. [via Command Line](#via-command-line)
1. [Support](#support)
1. [Acknowledgements](#acknowledgements)

# How It Works

The code here works by;

1. Querying `SRC_BASE.SRC_TABLE` using Airtable credentials associated with the
**Project Identity Token** (you'll be asked to link an Airtable Base when you deploy.)

2. Adding these rows to `DEST_BASE.DEST_TABLE` using Airtable credentials associated
with something referred to as a **General Use Identity Token**: you'll have to set this
up separately.

3. Updating records in `SRC_BASE.SRC_TABLE` to indicate they've been copied (prevents
  duplication of records).

# Installation

You can install this using [Standard Library](https://stdlib.com/). Before we
install the app, we'll need to set up our Airtable Bases / Tables to get ready for
copying, and set up a **General Use Identity Token**.

## 1. Configure `SRC_BASE.SRC_TABLE`

You'll want to configure the Base you're copying from, first.

<img src="/readme/images/1-from-table.png" width="400">

Add a field to the right of the primary field named **`copied`** (the name is
  important). Make sure it's a checkbox field.

<img src="/readme/images/2-add-copied.png" width="400">

Once finished, make sure all entried in the `copied` field are blank.

<img src="/readme/images/3-initial-base.png" width="400">

## 2. Configure `DEST_BASE.DEST_TABLE`

Now you'll want to set up your destination / receiver table in another base.

To start with, you'll need to make sure this base has identical fields / columns
to your `SRC_BASE.SRC_TABLE`, although the `copied` field **is not necessary**.

<img src="/readme/images/4-airtable-receiver-table.png" width="400">

## 3. Create a **General Use Identity Token**

Next, we need to create a **General Use Identity Token** on Standard Library.
This Token will link your `BASE2` credentials. Your `BASE1` credentials will be
automatically configured when you deploy this project.

First, visit [build.stdlib.com/tokens](https://build.stdlib.com/tokens/) or
get there by clicking on the left menu of [build.stdlib.com](https://build.stdlib.com/).

<img src="/readme/images/5-build-create-general-token.png" width="400">

Scroll down to the bottom of the page to see your **General Use Identity Tokens**,
then click **Create General Use Identity (Development)**.

<img src="/readme/images/6-general-use-token-create.png" width="400">

Name this token something like, `Receiver Token (Airtable)`.

<img src="/readme/images/7-name-token.png" width="400">

You should now see the token in your **General Use Identity Tokens**:

<img src="/readme/images/8-token-in-list.png" width="400">

You'll want to click that token (the name) to get to the token management screen.
From here, we'll link our `BASE2` credentials. Select Airtable from the dropdown
and click the blue plus button to link an account:

<img src="/readme/images/9-add-airtable.png" width="400">

On the next screen, we'll want to select **Link New Resource**:

<img src="/readme/images/10-link-new-resource.png" width="400">

Now find your Receiver Base by searching for it once your Airtable account has
been linked, in this case we called the Base "Copy To", but you can name yours
whatever you'd like.

<img src="/readme/images/11-link-receiver-base.png" width="400">

Once linked, you'll be able to copy the value of your token.
**You will need this value for the `STDLIB_SECONDARY_TOKEN` environment variable.**

<img src="/readme/images/12-copy-token.png" width="400">

## 4. Deploy to Standard Library

Once you've followed these steps, you can click the button below to deploy the code immediately.
**You will be asked to configure Airtable Project Identity Token automatically as part
of the deployment process.**

You'll need the following environment variables handy:

- `STDLIB_SECONDARY_TOKEN`: See above instructions

[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

## 5. That's it!

You're all done. Run your endpoint with `count` = `10` (or whatever you please),
and voila! The end state of your tables should look like this:

<img src="/readme/images/13-initial-table-final.png" width="400">

<img src="/readme/images/14-receiver-table-final.png" width="400">

# Making Changes

There are two ways to modify your application. The first is via our in-browser
editor, [Code on Standard Library](https://code.stdlib.com/). The second is
via the [Standard Library CLI](https://github.com/stdlib/lib).

## via Web Browser

Simply visit [`code.stdlib.com`](https://code.stdlib.com) and pick your project
from the left sidebar. You can easily make updates and changes this way, and
deploy directly from your browser.

## via Command Line

You can either export your project via tarball by right-clicking the project
once open on [Code on Standard Library](https://code.stdlib.com/). You can then
install the CLI tools from [stdlib/lib](https://github.com/stdlib/lib) to test,
makes changes, and deploy.

```shell
# Test event locally
# NOTE: You'll need to set STDLIB_SECRET_TOKEN in env.json
lib .copy-table --count 10

# Deploy to dev environment
lib up dev
```

Alternatively, you can retrieve your package via `lib get`...

```shell
lib get <username>/<project-name>@dev
```

# Support

Via Slack: [`libdev.slack.com`](https://libdev.slack.com/)

You can request an invitation by clicking `Community > Slack` in the top bar
on [`https://stdlib.com`](https://stdlib.com).

Via Twitter: [@StdLibHQ](https://twitter.com/StdLibHQ)

Via E-mail: [support@stdlib.com](mailto:support@stdlib.com)

# Acknowledgements

Thanks to the Standard Library team and community for all the support!

Keep up to date with platform changes on our [Blog](https://stdlib.com/blog).
We're also hiring! E-mail [contact@stdlib.com](mailto:contact@stdlib.com) with
your resume if you're interested in helping build the future of app to app
API tooling.

Happy hacking!

&copy; 2019 Standard Library (Polybit Inc.)
