const path = require('path')
const gulp = require('gulp')
const chalk = require('chalk')
const babel = require('gulp-babel')
const minify = require('gulp-minify')
const eslint = require('gulp-eslint')
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

gulp.task('lint', () => {
  return gulp
    .src(FILE)
    .pipe(eslint())
    .pipe(
      eslint.result(result => {
        console.log() // EMPTY
        console.log(chalk.gray(result.filePath))
        console.log('─'.repeat(30))
        console.log(chalk.yellow('Warnings:'), result.warningCount)
        console.log(chalk.red('Errors:'), result.errorCount)
        console.log(chalk.blue('Messages:'), result.messages.length)
        console.log('─'.repeat(30))
        if (result.messages.length > 0) {
          // console.log(result.messages)
          result.messages.forEach(m => {
            console.log(
              `[${m.severity}:${m.line}:${m.column}]`.padEnd(8),
              `(${m.ruleId})`.padEnd(8),
              `=> ${m.message}`
            )
          })
        }
        console.log() // EMPTY
      })
    )
    .pipe(eslint.failAfterError())
})

gulp.task('clean', () => {
  return gulp.src(DEST, { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task(
  'watch',
  gulp.series('lint', 'clean', 'script', () => {
    const watchThis = `${SRC}/*.js`
    console.log('Watching:', watchThis)
    return gulp.watch(watchThis, gulp.series('script'))
  })
)

gulp.task('default', gulp.series('lint', 'clean', 'script'))
