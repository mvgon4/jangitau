'use strict'

const gulp = require('gulp')

const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonJs = require('rollup-plugin-commonjs')
const rollupEslint = require('rollup-plugin-eslint')
const rollupUglify = require('rollup-plugin-uglify-es')

const less = require('gulp-less')
const cleanCss = require('gulp-clean-css')
const pug = require('gulp-pug')

gulp.task('build:server', async function buildServer () {
  const bundle = await rollup.rollup({
    input: './src/server/server.js',
    plugins: [
      rollupResolve(),
      rollupCommonJs(),
      rollupEslint(),
      rollupUglify()
    ]
  })

  await bundle.write({
    file: './dist/server.js',
    format: 'cjs'
  })
})

gulp.task('client:js', async function buildServer () {
  const bundle = await rollup.rollup({
    input: './src/client/components/script.js',
    plugins: [
      rollupEslint(),
      rollupUglify()
    ]
  })

  await bundle.write({
    file: './src/client/script.js',
    format: 'iife'
  })
})

gulp.task('client:html', function buildHtml () {
  return gulp.src('src/client/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
})

gulp.task('client:css', function buildCss () {
  return gulp.src('src/client/components/styles.less')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(gulp.dest('src/client'))
})

gulp.task('build:client', gulp.series(
  gulp.parallel('client:css', 'client:js'),
  'client:html'
))

gulp.task('build', gulp.parallel('build:server', 'build:client'))
