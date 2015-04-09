module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      core: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.js',
          dest: "target/",
          ext: '.min.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};