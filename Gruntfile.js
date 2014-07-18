module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: "\n/* ------------------- */\n"
			},
			js: {
				src: ["bower_components/jquery/dist/jquery.min.js",
					  "js/*.js"],
				dest: "compiled/javascript.js"
			}
		},
		stylus: {
			compile : {
				options: {
					import: ["nib"],
					compress: false
				},
				files: {
					"compiled/styles.css" : ["bower_components/normalize.css/normalize.css", "fonts/fonts.css", "stylus/site.styl"]
				}
			}
		},
		watch: {
			stylesheets: {
				files: "stylus/*.styl",
				tasks: ["stylus"]
			},
			scripts: {
				files: "js/*.js",
				tasks: ["concat"]
			}
		},
		responsive_images: {
			options: {
				engine: "im", /* ImageMagick */
				sizes: [{
					name : "thumb",
					width : 243,
					quality : 90
				}]
			},
			files: {
				expand: true,
				src: ["g*.jpg"],
				cwd: "images/work/",
				dest: "images/work/thumbs/"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-responsive-images');

	grunt.registerTask("default", ["stylus", "concat", "responsive_images"]);
}
