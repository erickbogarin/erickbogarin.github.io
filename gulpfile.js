const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const cp = require('child_process');

const $ = gulpLoadPlugins({
  pattern: '*',
  rename: { 'autoprefixer-stylus': 'prefixer' },
});

/**
 * Where our files are located
 */
const jsFiles = 'src/js/**/*.js';
const stylusFiles = 'src/styl/**/*.styl';

const messages = {
  pattern: '*',
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
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      use: [$.koutoSwiss(), $.prefixer(), $.jeet(), $.rupture(), $.typographic()],
      compress: true,
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe($.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

/**
 * Javascript Task
 */
gulp.task('js', () => {
  gulp.src('./src/js/app.js')
    .pipe($.plumber({
      handleError: (err) => {
        console.log(err); // eslint-disable-line no-console
        this.emit('end');
      },
    }))
    .pipe($.concat('main.js'))
    .pipe($.browserify({
      debug: true,
      transform: ['babelify'],
    }))
    .pipe(gulp.dest('_site/assets/js/'))
    .pipe($.uglify())
    .pipe($.browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', () => {
  gulp.watch(stylusFiles, ['stylus']);
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['js', 'stylus', 'browser-sync', 'watch']);
