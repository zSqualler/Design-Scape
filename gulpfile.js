const {src, dest, watch, parallel, series} = require('gulp');
const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify-es').default;
const imagemin     = require('gulp-imagemin');
const avif         = require('gulp-avif');
const webp         = require('gulp-webp');
const svgSprite    = require('gulp-svg-sprite');
const newer        = require('gulp-newer');
const fonter       = require('gulp-fonter');
const ttf2woff2    = require('gulp-ttf2woff2');
const clean        = require('gulp-clean');
const sourcemaps   = require('gulp-sourcemaps');
const browserSync  = require('browser-sync').create();

function styles() {
  return src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 version']
   }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}


function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/sweetalert2/dist/sweetalert2.js',
    'app/js/main.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function images(){
  return src(['app/images/src/**/*.*', '!app/images/src/**/*.svg', '!app/images/**/*.ico'])
  .pipe(newer('app/images/**'))
  // .pipe(avif({quality : 50}))

  .pipe(src('app/images/src/**/*.*'))
  .pipe(newer('app/images/**'))
  // .pipe(webp())

  
  .pipe(src('app/images/src/**/*.*'))
  .pipe(newer('app/images/**'))
  .pipe(imagemin())
  
  .pipe(dest('app/images'))
}

// function sprite () {
//   return src('app/images/*.svg')
//   .pipe(svgSprite({
//     mode: {
//       stack: {
//         sprite: '../sprite.svg',
//         example: true
//       }
//     }
//   }))
//   .pipe(dest('app/images'))
// }

function fonts () {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function building() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/images/**/*.*',
    '!app/images/src/**',
    // '!app/images/*.svg',
    '!app/images/stack/sprite.stack.html',
    // 'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/fonts',
    '!app/fonts/src'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist () {
  return src('dist')
    .pipe(clean())
}

function watching() {
    browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
  
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/images/src'], images);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}




exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
// exports.sprite      = sprite;
exports.fonts       = fonts;
exports.building    = building;

exports.watching    = watching;

exports.build       = series(cleanDist, images, building); 
exports.default     = parallel(styles, images, scripts, watching);