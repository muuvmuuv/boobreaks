const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const minify = require('gulp-minify')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')

const SRC = path.resolve(__dirname, 'src')
const FILE = path.resolve(SRC, 'breakpoint.js')
const DEST = path.resolve(__dirname, 'dist')

gulp.task('script', () => {
  return gulp
    .src(FILE)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST))
    .pipe(
      minify({
        ext: {
          min: '.min.js',
        },
      })
    )
    .pipe(gulp.dest(DEST))
})

gulp.task('clean', () => {
  return gulp.src(DEST, { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task(
  'watch',
  gulp.series('clean', 'script', () => {
    const watchThis = `${SRC}/*.js`
    console.log('Watching:', watchThis)
    return gulp.watch(watchThis, gulp.series('script'))
  })
)

gulp.task('default', gulp.series('clean', 'script'))
