<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/m-triassi/soen390-team13/main/public/img/readme_logo.png" width="400"></a></p>

<p align="center">
<a href="https://github.com/m-triassi/cycl.io/actions"><img src="https://github.com/m-triassi/cycl.io/workflows/Laravel/badge.svg" alt="Build Status"></a>
<a href="https://github.com/m-triassi/cycl.io/blob/main/LICENSE"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Cycl.io
A web-based ERP system for managing the production and sale of imaginary bikes, to imaginary people.

This Project is built on a React front end and communicates with a REST API running on Laravel.

For Project management purposes Cycl.io, the project name, has been abbreviated to "CYC". You will find the format CYC-XX 
prepended to many issues in the repository.

## Purpose
This Project was created in part to satisfy the requirements of SOEN 390: Software Engineering Team Design Project @ 
Concordia University

## Installation

### Windows Subsystem for Linux (WSL)
This project runs best in WSL, so if you're on windows, you'll want to enable this feature. You can find more comprehensive 
instructions for doing that [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10). But for completeness, here is a summary:

**Note:** Make sure windows is up to date before starting this. You may also need to enable Virtualization in your BIOS

1. Open a power shell window and run `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
2. in the same power shell  window run `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`, Then restart your machine.
3. Download the latest [WSL2 updates here](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi), and install them.
4. Back in the power shell run `wsl --set-default-version 2`
5. Open the Microsoft store, then [navigate to the Ubuntu 20.04 page](https://www.microsoft.com/store/apps/9n6svws3rx71), and click "get".
6. Once installed, launch the Ubuntu 20.04 App from the start menu and follow the account set-up instructions. Make sure to pick a memorable sudo password. 

After completing the above steps, you should now have an Ubuntu terminal that you can run the rest of the installation in.

### Brew (MacOS only)
MacOS lacks a native package manager. If you haven't already you'll want to install [brew](https://brew.sh/).

To install brew, in a terminal, simply run:
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once it completes, you can continue with the installation instructions.

### PHP
First you'll need PHP running on your command line. To do this install it, as well as some of its dependencies.

For MacOS run: 
```shell
brew install php@7.4
brew unlink php && brew link php

# Test you're on PHP 7.4
php -v
# Check that PHP has the correct modules loaded
# The list should contain at the minimum mbstring, mysql, xml, and zip, more is fine
php -m
```

For WSL / Ubuntu run: 
```shell
sudo apt update
sudo apt install -y php7.4-cli php7.4-mbstring php7.4-xml unzip php7.4-zip php7.4-mysql 
```

### Composer
Next you'll need [Composer](https://getcomposer.org/); it manages all the PHP dependencies for the project, and installs the framework and vendor files.

On either WSL, Ubuntu, MacOS, run the following commands:
```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

### Node
You'll also need node to build the front end, as  well as mange the dependencies there as well. It is highly recommended 
that you use [NVM](https://github.com/nvm-sh/nvm) that way you can manage different versions of node going forward.  

On either WSL, Ubuntu, MacOS, run the following commands:
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
## You'll probably need to restart your terminal before running the following 2 commands.
nvm install 14
nvm alias default 14
```

#### Yarn 
You'll also likely need Yarn, it's generally consided a superior package bundler than NPM.

Yarn is a Javascript package manager for your code. It allows you to use and share code with other developers from around the world. Yarn does this quickly, securely, and reliably so you don’t ever have to worry.

Yarn allows you to use other developers’ solutions to different problems, making it easier for you to develop your software. If you have problems, you can report issues or contribute back, and when the problem is fixed, you can use Yarn to keep it all up to date.

Code is shared through something called a package (sometimes referred to as a module). A package contains all the code being shared as well as a package.json file which describes the package.

Simply run: 
```shell
npm i -g yarn
```
After installing yarn, simply clone the repository and type `yarn install` at the project directory terminal and let it run
When dependency installation is completed, `yarn dev` will build the app in `public/js/app.js`

Congratulation, you have completed front-end installation.

### Docker
This project runs on a set of docker containers orchestrated by [Laravel Sail](https://laravel.com/docs/8.x/sail).
Before getting started though, you'll need to at least [install Docker](https://www.docker.com/get-started)
for the system you are currently running on.

**Note:** if you're on WSL / Windows you'll need to make sure that Docker is set up to pass through commands from WSL.
Open the docker desktop application, goto the Settings, and make sure the WSL checkbox is ticked under "resources"

### Project set-up
Finally, you'll need an `.env` file, the project includes an `.env.example` file for reference. 
**Copy** the example file and rename it to `.env`, the default values of the example files are the ones expected by Sail (see below)
If you are opting to use some other local environment, you'll need to set the appropriate values.

You'll also need to install the PHP dependencies, and set an application ID, this can be achieved by Laravel's command line utility, Artisan.

Lastly you'll need to install and build the front end as well.
From the root of the project directory on you command line you can simply run: 
```shell
cp .env.example .env
php artisan key:generate
# You only need to do the above once
# The below should be done every time to you pull 
php artisan migrate
composer install
yarn install
yarn dev
```

## Usage

### Sail 
Once all the dependencies have been installed and set-up is complete, from the project root simply run:

```shell
./vendor/bin/sail up -d
```

At which point, docker will begin to download all the required images and initialize them. The first time this will take a few moments; 
though subsequent runs should be much quicker. 

Once complete, the site should be available at http://localhost! 

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## GitFlow

[General GitHub Workflow](https://guides.github.com/introduction/flow/)

### [CommitLint](https://github.com/conventional-changelog/commitlint)

In order to keep commit messages clean and meaningful, we use commitlint to set up restriction for commit messages

In general the pattern mostly looks like this:

`type(scope?): subject  #scope is optional`

Real world examples can look like this:

- `chore: run tests on travis ci`

- `fix(server): send cors headers`

- `feat(blog): add comment section`

Common types according to commitlint-config-conventional (based on the the Angular convention) can be:

```
build
ci
chore
docs
feat
fix
perf
refactor
revert
style
test
```

## Git Branch Naming Convention

Branch name should be in kebab case. branches should always start with the issue number they are related to, followed by a succinct description of the issue being solved. For example if an issue with ID 10 is open that has the title "Unable to upload multiple images", then the branch name might be: 
`10-image-upload` or `10-multi-image-bug` 


## Contributing

Contributing to this project is outlined in detail below. Briefly, all additions to this project must follow
[PSR-1](https://www.php-fig.org/psr/psr-1/) and [PSR-12](https://www.php-fig.org/psr/psr-12/) Coding standards for PHP.
This amounts to all variables and functions being camelCase, all class names being PascalCase, and all request 
parameters being snake_case. 

For Javascript and Typescript, you can find standards in the `.eslintrc.json` file in the root of the project.
Generally speaking though these styles amount to the [ESLint coding standards](https://eslint.org/docs/developer-guide/code-conventions).
This amounts to all variables and functions being camelCase, and dictionary items being snake_case.

Other contributing details can be found below.

### Etiquette

This project is open source, and as such, the maintainers give their free time to build and maintain the source code
held within. They make the code freely available in the hope that it will be of use to other developers. It would be
extremely unfair for them to suffer abuse or anger for their hard work.

Please be considerate towards maintainers when raising issues or presenting pull requests. Let's show the
world that developers are civilized and selfless people.

It's the duty of the maintainer to ensure that all submissions to the project are of sufficient
quality to benefit the project. Many developers have different skillsets, strengths, and weaknesses. Respect the maintainer's decision, and do not be upset or abusive if your submission is not used.

### Viability

When requesting or submitting new features, first consider whether it might be useful to others. Open
source projects are used by many developers, who may have entirely different needs to your own. Think about
whether or not your feature is likely to be used by other users of the project.

### Procedure

Before filing an issue:

- Attempt to replicate the problem, to ensure that it wasn't a coincidental incident.
- Check to make sure your feature suggestion isn't already present within the project.
- Check the pull requests tab to ensure that the bug doesn't have a fix in progress.
- Check the pull requests tab to ensure that the feature isn't already in progress.

Before submitting a pull request:

- Check the codebase to ensure that your feature doesn't already exist.
- Check the pull requests to ensure that another person hasn't already submitted the feature or fix.

### Requirements

- **[PSR-12 Coding Standard](https://www.php-fig.org/psr/psr-12/)** - The easiest way to apply the conventions is to install [PHP Code Sniffer](https://pear.php.net/package/PHP_CodeSniffer).

- **[ESLint Coding Standards](https://eslint.org/docs/developer-guide/code-conventions)** - The easiest way to apply the conventions is to install [ESLint](https://eslint.org/docs/user-guide/getting-started).

- **Add tests!** - Your patch won't be accepted if it doesn't have tests.

- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.

- **Consider our release cycle** - We try to follow [SemVer v2.0.0](https://semver.org/). Randomly breaking public APIs is not an option.

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.


## Credit

This project was designed and created by "Team 13" consisting of:
- Annie Tran
- Beatrice Cobo
- Ian Phillips
- Kayla Charky
- Luigi Besani Urena
- Massimo Triassi
- Pascal Dermerdjian
- Robert Nittolo
- Wei Chen (Wilson) Huang

## License

Cycl.io is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
