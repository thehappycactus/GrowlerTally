module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      copy : {
        main : {
          files: [
            // Lumx
            { expand: true, cwd: 'bower_components/lumx/dist', src: ['lumx.js'], dest: 'js/lib' },
            { expand: true, cwd: 'bower_components/lumx/dist', src: ['lumx.css'], dest: 'css' },

            // MDI
            { expand: true, cwd: 'bower_components/mdi/css', src: ['materialdesignicons.css'], dest: 'css' },
            { expand: true, cwd: 'bower_components/mdi/fonts', src: ['**'], dest: 'fonts' },

            // Velocity
            { expand: true, cwd: 'bower_components/velocity', src: ['velocity.js'], dest: 'js/lib' },

            // MomentJS
            { expand: true, cwd: 'bower_components/moment', src: ['moment.js'], dest: 'js/lib' },

            // Angular
            { expand: true, cwd: 'bower_components/angular', src: ['angular.js'], dest: 'js/lib' },
            { expand: true, cwd: 'bower_components/angular-resource', src: ['angular-resource.js'], dest: 'js/lib' },

            // jQuery
            { expand: true, cwd: 'bower_components/jquery/dist', src: ['jquery.js'], dest: 'js/lib' },    

            // Animate.css
            { expand: true, cwd: 'bower_components/animate.css', src: ['animate.css'], dest: 'css' }

          ]
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};