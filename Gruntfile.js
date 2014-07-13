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
					"compiled/styles.css" : ["stylus/*.styl"]
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["stylus", "concat"]);
}
