module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true, // 去注析
          collapseWhitespace: true //去换行
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: 'html/*.html',
          dest: 'dist/'
        }]
      }
    },

    cssmin: {
      with_banner: {
        options: {
          banner: '/* 注释，想写啥就写啥 */'
        },
        files: {
          'dist/css/common.css': ['src/css/base.css'],
          'dist/css/service.css': ['src/css/index.css', 'src/css/contact.css']
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify', 'htmlmin', 'cssmin', 'imagemin']);
};
