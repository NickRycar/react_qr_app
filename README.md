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

### A Note About Flags

This demo primarily uses the `release-astronaut-name` flag, but the same steps can be taken for any of the remaining flags. Some good ones to play with are:

* `config-customer-logo`: toggle between the plucky `Planet Express` scamps and the hostile takeover from `Mom Corp`
* `release-new-ui`: go from grey and plain to colorful and rad!

### Part One: Release and Remediate

*Instead of the generic, dull "AstroBot", we want to give our customers the ability to NAME their Astronaut. To kick this off, we're adding a unique(ish) identifier to each bot loaded. Which... is still generic and dull, but a first step!*

To implement this feature, we've created a new utility function to create each bot's identifier, and we plan to call it from index.js, but this is just a prototype! I want to be able to test it before it goes live, and I don't want my customers to see this hacky version. But I **also** don't want it to sit in a feature branch forever, going stale before it's ready for realease.

Enter **FEATURE FLAGS**!

Feature flags let us release updates to our application as soon as we create them, but hide them behind conditional levers that *we* control.

#### Checkout the feature branch

