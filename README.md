# Electron starter

## Techs
* [Electron](https://electron.atom.io/)
* [TypeScript](http://www.typescriptlang.org/)
* [Gulp](http://gulpjs.com/)
* [Sass](http://sass-lang.com/)
* [Twig](https://twig.symfony.com/)
* [VueJS](https://vuejs.org/)

## Installation
```
> npm install
```

## Commands

### Electron with live reload + watcher (TS + HTML + SCSS)
```
> npm start
```

### build
```
> npm run build
```
### electron live reload
```
> npm run live
```

### web live reload
```
> npm run live:web
```

### watch (TS + HTML + SCSS)
```
> npm run wacth
```

### Libraries
#### Get the library
```
> npm install jquery
```

#### Install TypeScript definition file
##### Option 1
```
> npm install --save-dev @types/jquery
```
##### Option 2
```
> npm run typings install dt~jquery --global --save
# You can also install typings globaly
```

#### Import file
```
> import $ from "jquery";
// or
> import $ = require("jquery");
