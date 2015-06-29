'use strict';
/**
 * Gruntfile
 */

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: {
			tmp: '.tmp',
			dist: 'dst'
		},

		copy: {
			js: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: ['**/*.js'],
					dest: '.tmp/js'
				}]
			},
			html: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.html', '!templates/**/*'],
					dest: '.tmp/'
				}]
			},
			bower: {
				files: [{
					expand: true,
					cwd: 'bower_components',
					src: ['**/*'],
					dest: '.tmp/bower_components'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/js',
					src: 'templates.js',
					dest: 'dst/js/templates.js'
				}]
			}
		},

		connect: {
			options: {
				port: 9999,
				host: '*',
				base: '.tmp',
				livereload: 35730
			},
			livereload: {
				options: {
					open: true
				}
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			options: {
			},
			app: {
				src: 'src/index.html'
			},
			sass: {
				src: ['src/styles/{,*/}*.{scss,sass}'],
				ignorePath: 'bower_components/'
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: 'src/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: 'dist/images/generated',
				imagesDir: '.tmp/images',
				javascriptsDir: '.tmp/scripts',
				fontsDir: '.tmp/styles/fonts',
				importPath: './bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		ngtemplates: {
	    'ruiComponents': {
	    	cwd: 'src',
	      src: 'templates/**/*.html',
	      dest: '.tmp/js/templates.js'
	    }
	  },

	  watch: {
	  	templates: {
	  		files: ['src/templates/**/*.html'],
	  		tasks: ['ngtemplates', 'copy:js']
	  	},
	  	js: {
	  		files: 'src/js/**/*.js',
	  		tasks: ['copy:js'],
	  	},
	  	compass: {
	  		files: ['src/styles/**/*.{scss,sass}'],
	  		tasks: ['compass:server'],
	  	},
	  	html: {
	  		files: ['src/index.html'],
	  		tasks: ['copy:html']
	  	},
	  	livereload: {
	  		options: {
	  			livereload: '<%= connect.options.livereload %>'
	  		},
	  		files: [
	  			'.tmp/**/*'
	  		]
	  	}
	  },

	  concurrent: {
	  	server: [
	  	  'compass:server'
	  	]
	  },


	  concat: {
	  	dist: {
	  		src: ['src/js/**/*.js', '.tmp/js/templates.js'],
	  		dest: 'dst/redox-ui-components.js'
	  	}
	  },

	  cssmin: {
	    dist: {
	      files: [{
	        expand: true,
	        cwd: '.tmp/styles',
	        src: ['*.css', '!*.min.css'],
	        dest: 'dst/styles',
	        ext: '.min.css'
	      }]
	    }
	  },


    uglify: {
      dist: {
        files: {
          'dst/redox-ui-components.min.js': ['dst/redox-ui-components.js']
        }
      }
    },

	  imagemin: {
	  	dist: {
	  		files: [{
	  			expand: true,
	  			cwd: 'src/images',
	  			src: '{,*/}*.{png,jpg,jpeg,gif}',
	  			dest: 'dst/images'
	  		}]
	  	}
	  },

	  svgmin: {
	  	dist: {
	  		files: [{
	  			expand: true,
	  			cwd: 'src/images',
	  			src: '{,*/}*.svg',
	  			dest: 'dst/images'
	  		}]
	  	}
	  },

	  // ngAnnotate tries to make the code safe for minification automatically by
	  // using the Angular long form for dependency injection.
	  ngAnnotate: {
	  	dist: {
	  		files: [{
	  			expand: true,
	  			cwd: 'dst/',
	  			src: '*.js',
	  			dest: 'dst'
	  		}]
	  	}
	  },

	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function () {

		grunt.task.run([
			'clean:tmp',
			'copy',
			'wiredep',
			'ngtemplates',
			'concurrent:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('build', 'Builds everything for bower', function () {
		grunt.task.run([
			'clean:tmp',
			'clean:dist',
			'ngtemplates',
			'concat',
			'ngAnnotate',
			'compass:server',
			'cssmin:dist',
			'imagemin:dist',
			'svgmin:dist',
			'uglify',
		]);
	});

};
