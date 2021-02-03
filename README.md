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

Simply run: 
```shell
npm i -g yarn
```

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
composer install
php artisan key:generate
php artisan migrate
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
