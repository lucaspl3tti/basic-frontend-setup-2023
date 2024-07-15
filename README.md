# Basic Frontend IDE 2024
My current personal frontend test and development environment. It is based on Vite.

## Tech Stack
- ViteJS
- TypeScript
- ES6+
- SCSS / SASS
- Bootstrap 5.3
- ESLint & Stylelint
- Configurable Auto Imports

## Installation Instructions
1. Initialize a new repo from the [template repo](https://github.com/lucaspl3tti/basic-frontend-ide-2022)
2. Clone the new created repo with `git clone git@github.com:lucaspl3tti/<Repo Path>.git` to your desktop
   * use `git clone https://github.com/lucaspl3tti/<Repo Path>.git` if you aren't using git with ssh
3. Run an installation of the package dependencies using `npm i`

## Commands
`npm run dev` run this command to initialize a dev server with hot module replacement

`npm run build` run this command to build the final app

`npm run preview` run this command to initialize a preview server of the build

`npm run lint:scss` run this command to lint over all scss files

`npm run lintfix:scss` run this command to fix all scss linting errors

`npm run lint:js` run this command to lint over all js files

`npm run lintfix:js` run this command to fix all js linting errors

`npm run lint` run this command to lint over all scss and js files

`npm run lintfix` run this command to fix all js and scss linting errors

## TypeScript
This basic frontend setup uses TypeScript instead of standard JavaScript. Vite automatically compiles all TS files into JavaScript.

ATTENTION: Vite doesn't do type checking. This is cause it is assuming that this is already done by your IDE Program (like Visual Studio Code e.g.) and your build process. So keep that in mind.
