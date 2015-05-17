module.exports = function(grunt) {

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),
		jshint : {
			files : ['Gruntfile.js', '<%= concat.js.src %>'],
			options : {
				globals : {
					jQuery : true
				}
			}
		},
		concat : {
			js : {
				src : ['public/js/app.js', 'public/js/config.js', 'public/js/controllers.js', 'public/js/directives.js', 'public/js/playground-api.js'],
				dest : 'public/js/scripts.js'
			}
		},
		uglify : {
			options: {
				mangle:false
			},
			scripts : {
				files : {
					'public/js/scripts.min.js' : ['public/js/scripts.js']
				}
			},
			lerts : {
				files : {
					'public/lib/lerts/lerts.min.js' : ['public/lib/lerts/lerts.js']
				}
			}
		},
		cssmin : {
			options : {
				shorthandCompacting : false,
				roundingPrecision : -1
			},
			styles : {
				files : {
					'public/css/styles.min.css' : ['public/css/styles.css']
				}
			},
			lerts : {
				files : {
					'public/lib/lerts/lerts.min.css' : ['public/lib/lerts/lerts.css']
				}
			}
		},
		watch : {
			files : ['<%= jshint.files %>'],
			tasks : ['jshint', 'concat', 'cssmin']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'watch']);
  grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'watch']);

};
