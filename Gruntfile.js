module.exports = function(grunt) {


  // Load grunt tasks
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });


  // Configure the tasks
  grunt.initConfig({

    // Setup variables for modular/quicker access
    app: {
      css:      'assets/css',
      sass:     'assets/sass',
      scripts:  'assets/scripts',
      images:   'assets/images'
    },

    // individual tasking start here:

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml'
      },
      prod: {},
      dev: {
        options: {
          raw: 'useCss: style.css'
        }
      }
    },

    connect: {
      app: {
        options: {
          port: 9001,
          base: '_site'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jekyll: {
        files: ['{,*/}*.html'],
        tasks: ['jekyll', 'copy:css']
      },
      sass: {
        files: ['assets/_sass/**/*.scss'],
        tasks: ['compass:dev', 'cssmin', 'copy:css']
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'assets/_sass/',
          cssDir: 'assets/css',
          outputStyle: 'nested'
        }
      }
    },

    scsslint: {
      allFiles: 'assets/_scss/**/*.scss',
      options: {
        config: 'scss-lint.yml'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/css/',
        ext: '.min.css'
      }
    },

    copy: {
      css: {
        expand: true,
        cwd: 'assets/css',
        src: '**',
        dest: '_site/assets/css/'
      }
    }

  });


  // Task for devin'
  grunt.registerTask('default', [
    'jekyll:dev',
    'connect',
    'watch'
  ]);

  // Task for testing prodifyication. Yeah.
  grunt.registerTask('prodify', [
    'jekyll:prod'
  ]);

};

