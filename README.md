# Project Name

> Pithy project description

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 5.8.x
- Postgresql 9.1.x
- etc
- etc

## Development

## Initial one-time setup

### Installing dependencies

1. Install brew if necessary (http://brew.sh/)
1. Install Xcode if necessary (https://developer.apple.com/xcode/download/)
1. brew install watchman (https://facebook.github.io/watchman/docs/install.html)
1. brew install flow (http://www.flowtype.org/)
1. npm install -g react-native-cli

### Setup Facebook Login by linking binaries in xcode
Run open node_modules/react-native-facebook-login
Drag RCTFBLogin.xcodeproj into your Libraries group
Select your main project in the xcode navigator to bring up settings
Under Build Phases expand the Link Binary With Libraries header
Scroll down and click the + to add a library
Find and add libRCTFBLogin.a under the Workspace group
⌘+B to build project in xcode
Additional details setup instructions at https://github.com/magus/react-native-facebook-login

### Setting up the Database
psql -f server/config/schema.sql




## Usage

From within the root directory:

1. In terminal, "open client/ios/client.xcodeproj" to open project in Xcode
1. Click the run icon to launch the app
 

### Installing Dependencies



### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

