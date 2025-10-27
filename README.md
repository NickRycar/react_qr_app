# Getting Started with the ~~LaunchDarkly~~ Nick Rycar Totally Unique React QR Demo


## Setup

### Assumptions & Prerequisites

*This project was tested on MacOS with default packages provided by Homebrew. Nothing herein should be Mac-specific, but YMMV.*

Requirements are fairly minimal -- In addition to git, you will need `npm` and `terraform` in order to run this demo. Install via your package manager of choice.

Example:

`brew install node && brew install terraform`


You will also need at least **two** web browsers. I used `Firefox` and `Safari` in my demos.

### Installing Dependencies

1. Clone the new repository to your local machine, cloud editor, or whatever
1. Run `npm install` in your local root directory of the project
    * NOTE: You'll recieve a number of vulnerability warnings, but nothing that will prevent the site from loading. Leave it be.

### Modifying variables

1. In `src/index.js`, modify `CLIENTKEY` to be your own LaunchDarkly client-side SDK key
    * NOTE: This is environment-specific.
1. Move or copy `terraform.tfvars.example` to `terraform.tfvars`
1. Then, edit the `terraform.tfvars` file
    * Replace the `access_token`, `project_key`, and `environment_key` values.

### Creating LaunchDarkly flags

1. Ensure that you have:
   1. An empty LaunchDarkly project, ready for some funky fresh flags
   2. An API access token with `Writer` permissions. Go to the [Authorizations](https://app.launchdarkly.com/settings/authorization) page to create it.
   3. Terraform installed
1. Run: `terraform init` to initialize the configuration
1. Run: `terraform plan`
1. If that ran with no errors, then run: `terraform apply`
1. Go enjoy your lovely new flags!

### Testing

1. To test that it's working locally, run `npm start` in the root directory of your project.
1. A window will automatically open in your default browser.
    * Open the same URL (https://localhost:3000/react_qr_app) in a second browser of your choosing.


The table's set. Time to demo!

## Running the Demo

Below are all the technical steps required, and light narrative to frame the demonstration.

Start by showing off the application, making note of the friendly astronaut, who the page tells us is named "AstroBot"

### A Note About Flags

This demo primarily uses the `release-astronaut-name` flag, but the same steps can be taken for any of the remaining flags. Some good ones to play with are:

* `config-customer-logo`: toggle between the plucky `Planet Express` scamps and the hostile takeover from `Mom Corp`
* `release-new-ui`: go from grey and plain to colorful and rad!

## Part One: Release and Remediate

*Instead of the generic, dull "AstroBot", we want to give our customers the ability to NAME their Astronaut. To kick this off, we're adding a unique(ish) identifier to each bot loaded. Which... is still generic and dull, but a first step!*

To implement this feature, we've created a new utility function to create each bot's identifier, and we plan to call it from index.js, but this is just a prototype! I want to be able to test it before it goes live, and I don't want my customers to see this hacky version. But I **also** don't want it to sit in a feature branch forever, going stale before it's ready for realease.

Enter **Feature Flags**!

Feature flags let us release updates to our application as soon as we create them, but hide them behind conditional levers that *we* control.

### Checkout the feature branch

From your terminal, run:
`git checkout name-generator`

If your application is running, it should auto-refresh in the background. Note, that it should still say "My name is AstroBot" with no visible change.

However, you can show the updated code in your IDE, or via [Github](https://github.com/NickRycar/react_qr_app/compare/main...NickRycar:react_qr_app:name-generator).

The logic has been moved into `components/astronautName.js`, and will only display the `AstronautId` string we've created if the `release-astronaut-name` flag is set.

Let's set it!

### Turn on the Feature Flag

1. In the LaunchDarkly UI, navigate to `Flags` and select the `Release: Astronaut Name` flag.

1. Toggle the flag to `on` and click `Review and Save`
    * add a comment, confirm your environment, then save.

1. Your browser should auto-update

*OH CRAP! I didn't mean for that to go to everyone! ABORT ABORT ABORT!*

### Turn off the Feature flag

Reverting the change is just the same thing in reverse!

1. Select the `Release: Astronaut Name` flag.

1. Toggle the flag to `off`, save, comment, etc etc etc

1. Breathe a sigh of relief.

## Part Two: Targeting

*Okay, maybe we got a liiiittle ahdead of ourselves, but that's the magic of flags! A rollback is as easy as a release, and both are kept distinct from code deployment. No frantic merges or pipeline runs required.*

*That said, let's try that again, but with some guardrails. Thankfully, we're capturing some context from each visit to our website (see index.js, lines 20-30), including a uuid. What if we target just our user.

### Fetch your UUID

1. In your LaunchDarkly dashboard, navigate to the `Sessions` section (under `Monitor`)
2. There should be two "live" sessions for the two broswer windows you have open. Select one, and click `Show More`
    * Note the value of `Browser`, as this is the window you'll want to watch.
    * Click on the `Identifier` to copy it to your clipboard.

### Create a rule for the flag

1. Go back to the `Release: Astronaut Name` flag in the LD dashboard.
1. Click `Edit` on the default rule, and select `old` from the dropdown.
1. Save the flag as before.

You can now turn the flag on and off, and nothing should change in your browser. Now, let's go back into the flag settings.

1. Underneath the flag toggle, click the `+` button
2. Select `target individuals` from the list
3. paste your `Identifier` from the previous step in the context key field.
4. Save the flag.

You should now see your identifier displayed in the browser session you selected previously, but **NOT** in the other.

### Switch to rule-based targeting

Let's say we're ready to roll things out to a larger constituency. It would become cumbersome to maintain an ever growing list of targets, so let's create a rule. Instead of targeting a specific user, let's target all users using a particular browser.

1. Go back to the flag, and click the `+` button once again.
1. This time, select `build a custom rule`
1. Select the following:
    * context: `user`
    * attribute: `browserName`
    * operator: `is one of`
    * values: (select the *other* browser you're using)
    * serve: `New`

Now you should see the identifier in *both* browsers! If you remove your user target, you should now only see it in your secondary browser, no matter how many sessions you open in each.

That's it for this bit!