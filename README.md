<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Cycl.io
A web-based ERP system for managing the production and sale of imaginary bikes, to imaginary people.

This Project is built on a React front end and communicates with a REST API running on Laravel.

## Purpose
This Project was created in part to satisfy the requirements of SOEN 390: Software Engineering Team Design Project @ 
Concordia University

## Installation

Firstly, you'll need an `.env` file, the project includes an `.env.example` file for reference. 
**Copy** the example file and rename it to `.env`, the default values of the example files are the ones expected by Sail (see below)
If you are opting to use some other local environment, you'll need to set the appropriate values.

### Sail 
This project runs on a set of docker containers orchestrated by [Laravel Sail](https://laravel.com/docs/8.x/sail).
Before getting started though, you'll need to at least [install Docker](https://www.docker.com/get-started) 
for the system you are currently running on. Once this is complete, simply run:

```shell
./vendor/bin/sail up -d
```

At which point, docker will begin to download all the required images and initialize them. The first time this will take a few moments; 
though subsequent runs should be much quicker. 

**Note:** if you are on Windows, this assumes you are using [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
with docker passed through to the VM (This is recommended).

### Serve
You may instead opt to use _Serve_. This requires you have PHP installed on your system, as well as your own MySQL server.

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
