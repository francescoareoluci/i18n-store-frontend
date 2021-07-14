# I18N Store Frontend

This repository contains a frontend application for the i18n-store project (https://github.com/francescoareoluci/i18n-store).
This application is built with React Redux. <br />
It allows to:
* Log in the user, both with an administrator and customer accounts;
* Show available products, users, manufacturers, locales and currencies;
* Purchase products through the use of the shopping cart;
* Search for products

Moreover, the application is internationalized through the use of **i18next** library. The UI labels will be translated in the logged user locale.

## Application init

Once cloned this repository, the application dependencies can be installed through:

> npm install

## Application build

Once the dependencies have been installed, the application can be build in development mode with:

> npm run build-dev

and in production mode with:

> npm run build-prod

## Application launch

Once builded, the application can be run with:

> npm run start

this will serve the application on localhost:3000.
In order to use the application, the backend must be running on localhost:8080