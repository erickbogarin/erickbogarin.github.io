const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const cp = require('child_process');

const $ = gulpLoadPlugins({
  pattern: '*',
  rename: { 'autoprefixer-stylus': 'prefixer', 'vinyl-source-stream': 'source' },
});

/**
 * Where our files are located
 */
const jsFiles = 'src/js/**/*.js';
const stylusFiles = 'src/styl/**/*.styl';

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', (done) => {
  $.browserSync.notify(messages.jekyllBuild);

  return cp.spawn('bundle', ['exec', 'jekyll build'], { stdio: 'inherit' })
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  $.browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], () => {
  $.browserSync({
    server: {
      baseDir: '_site',
    },
  });
});

/**
 * Stylus task
 */
gulp.task('stylus', () => {
  gulp.src('src/styl/main.styl')
    .pipe($.plumber())
    .pipe($.stylus({
      use: [$.koutoSwiss(), $.prefixer(), $.jeet(), $.rupture(), $.typographic()],
      compress: true,
    }))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe($.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

/**
 * Javascript Task
 */
gulp.task('js', () =>
  $.browserify('./src/js/app.js')
    .transform($.babelify, { presets: ['es2015'] })
    .bundle()
    //  Pass desired output filename to vinyl-source-stream
    .pipe($.source('main.js'))
    // Start piping stream to tasks!
    .pipe($.streamify($.uglify()))
    .pipe(gulp.dest('_site/assets/js/'))
    .pipe($.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/js')));

gulp.task('watch', () => {
  gulp.watch(stylusFiles, ['stylus']);
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['js', 'stylus', 'browser-sync', 'watch']);
