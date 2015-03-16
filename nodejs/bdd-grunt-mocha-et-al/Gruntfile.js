/*global module:false*/

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          coverageFolder: '.coverage',
          recursive: true,
          root: './lib',
          reporter: 'spec',
          mocha: require('mocha'),
          reportFormats: []
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('default', ['jshint', 'mocha_istanbul']);
};
