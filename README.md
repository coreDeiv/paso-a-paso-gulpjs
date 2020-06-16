# Paso a paso para configurar Gulp

## Paso 1:

- Debes de tener instalado [nodejs](https://nodejs.org/es/) de forma global en tu computador.
- Recuerda descargar la version **TLS**, ya que es la mas estable, y asi nos evitamos errores.

## Paso 2

- Debes de tener instalado de la misma manera que tienes **node js** (globalmente) a [NPM](https://www.npmjs.com/).
- Para verficar que cuentas con estos dos ultimos, ejecuta los siguiente comandos.

```cmd
node -v
npm -v
```

## Paso 3

- Una vez tengas todo lo necesario instalado y configurado, iniciamos nuestro proyecto con GULP

1. Deberas de ubicarte con la consola dentro de la carpeta en la que trabajaras

```cmd
cd <folder-name-project>
```

2. Ejecuta el siguiente comando:

```node
npm init
```

- En este paso Node, te pedira unas verificaciones, sigues los pasos y verificas.

3. En este punto el sistema ya te deberia haber creado un archivo llamado `package.json`, en el podras ver las configuraciones que le asisgnaste a tu proyecto. La estructura de este algo asi:

```json
{
  "name": "ejemplo",
  "version": "1.0.0",
  "description": "Este es un ejemplo de package.json",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "@coredeiv",
  "license": "ISC"
}
```

4. Ahora deberas de crear un archivo llamado `gulpfile.js`. En este archivo pondras todas las funciones para llamar gulp y que funcione en tu proyecto. El que yo uso para casi todos mis proyectos se ve asi:

```javascript
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src([
        'src/scss/**/*.scss',
        'node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/bootstraplus/sass/bootstraplus.sass',
        'src/fonts/fontawesome/css/all.min.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
        grid: true,
        Browserslist: ['>1%']
    })]))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src([
        'src/css/*css'
    ])
    .pipe(gulp.dest('build/css'))
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/js/**/*.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/popper.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('html', function () {
    return gulp.src('src/**/**/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('images', function () {
    return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: 'build'
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch('src/**/**/*.html', gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('css', 'sass', 'scripts', 'html'));
```

#### Este archivo me permite tener configurados; 

- "Minificador de HTML"
- "Incluir archivos HTML como si fueran `<iframes>`"
- "Incluir archivos CSS"
- "Compilar Sass o Scss a Css"
- "Comprimir todo el CSS en un uno solo y minificado"
- "Compirmir imagenes PNG, JPG, JPEG a WebP o WebM"
- "Compilar todas las fuentes existentes a un solo archivo"
- "Compilar, corregir y pasar todo el JavaScript, Ecmascript, Typescript a archivos JS comprensibles por el navegador"
- "Correr BrowserSync en un servidor Local, ya sea en un PC, Tablet o Celular"
- "Actualizar el navegador cada vez que hago un cambio, independiente del archivo que edite"

**Púedes buscar mas de estos plugins con su documentacion en [gulp.js](https://gulpjs.com/)**

5. Ahora deberas de correr el comando `npm install`, para que se instales todos los modulos del proyecto.

6. Finalmente, debes de origanizar todos los archivos y carpetas que vas a trabajar. Personalmente, yo los tengo configurado de la siguiente manera

```text
build/
node_modules/
proyecto/
└── src/
  | ├── fonts/
  | ├── js/
  | |   ├──assets
  | |   └──index.js
  | ├── media/
  | |   ├──logo
  | |   ├──img
  | |   ├──video
  | |   ├──gifs
  | |   ├──icons
  | |   └──audio
  | ├── scss/
  | |   ├──components
  | |   ├──mixins
  | |   ├──globals
  | |   ├──core
  | |   └──styles.scss
  | ├── web/
  | │   ├──globals
  | │   ├──snippets
  | │   └──components
  | └──index.html
  ├──.editorconfig
  ├──.gitignore
  ├──gulpfile.js
  ├──package.json
  ├──package-lock.json
  └──README.md
```

7. Cuando tengas todo listo, deberas de ejecutar simplemente el comando `gulp` o `gulp watch`, o por lo menos en este caso.

8. Automaticamente, todo el proyecto se te va a compilar, y el navegador predeterminado se te abrira con tu proyecto, esperando por cambios.
