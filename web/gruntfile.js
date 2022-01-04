module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        // Task configuration.
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            minify: {
                files: {
                    'min-js/accountcontroller.js': ['./js/controllers/accountcontroller.js' ],
                }
            }
        }
    });
}