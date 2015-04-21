module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		jshint : {
			files : ['Gruntfile.js', 'app/js/*.js', 'test/**/*.js'],
			options : {
				globals : {
					jQuery : true
				}
			}
		},
		concat : {
			options : {
				// define a string to put between each file in the concatenated output
				separator : ';'
			},
			dist : {
				// the files to concatenate
				src : ['app/js/*.js'],
				// the location of the resulting JS file
				dest : 'dist/<%= pkg.name %>.js'
			}
		}
		// watch : {
			// files : ['<%= jshint.files %>'],
			// tasks : ['jshint']
		// }

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['jshint', 'concat']);

};