/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        // banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      // Concating yml and js sources for demo dist.
      demo: {
        // files: [
        //   {expand: true, cwd: './src/demo/', src: ['**.yml'], dest: './dist/dev/demo/demo.yml', flatten: true},
        //   {expand: true, cwd: './src/assets/js/', src: ['burndown.js'], dest: './dist/dev/demo/demo.js'}
        // ]
        files: {
          './dist/dev/demo/demo.details': ['./src/demo/*.yml'],
          './dist/dev/demo/demo.js': ['./src/assets/js/burndown.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      // Adding assemble watch task.
      all: {
        files: ['./src/**/*'],
        // Need to sort out if newer is misconfigured or necessary, cause right now , does nothing.
        tasks: ['newer:assemble']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    clean: {
      dev: {
        options: {
          'no-write': false
        },
        src: ['./dist/dev']
      },
      stable: {
        options: {
          'no-write': false
        },
        src: ['./dist/stable']
      }
    },
    copy: {
      stable: {
        files: [{expand: true, cwd: './dist/dev/', src: '**', dest: './dist/stable/'}]
      }
    },
    assemble: {
      // Config defaults for all builds.
      options: {
        assets: "./src/assets",
        data:   "./src/data.json",
        layout: "default.hbs",
        layoutdir: "./src/layouts/",
        partials: "./src/partials/**/*.hbs"
      },
      // Config for the main pages build.
      pages: {
        files: [
          {expand: true, src: ['*.hbs', '*.md'], dest: './dist/dev/gh-pages', cwd: './src/content'},
        ]
      },
      // Config for the jsFiddle demo build.
      demo: {
        options: {
          layout: 'demo.hbs',
          data: "./src/demo/data.yml"
        },
        files: [
          {expand: true, src: ['*.hbs', '*.md'], dest: './dist/dev/demo', cwd: './src/demo'},
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('assemble-dev', ['clean:dev', 'newer:assemble', 'concat:demo', /*'watch:all'*/]);
  grunt.registerTask('assemble-prod', ['clean', 'assemble', 'copy:stable' /*other tasks like uglify etc*/]);
};
