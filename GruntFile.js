module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    //清除目录
    clean: {
      all: ['dist/html/**', 'dist/**/*.*'],
      image: 'dist/html/images',
      css: 'dist/html/css',
      html: 'dist/html/**/*'
    },

    copy: {
      src: {
        files: [
          { expand: true, cwd: 'src', src: ['font/*.{eot,svg,ttf,woff}'], dest: 'dist' }
        ]
      }
    },

    // 文件合并
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      js: {
        src: [
          "src/js/*.js"
        ],
        dest: "dist/js/main.js"
      },
      css: {
        src: [
          "src/css/*.css"
        ],
        dest: "dist/css/main.css"
      }
    },

    //压缩JS
    uglify: {
      prod: {
        options: {
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code: true,
            pure_funcs: [
              "console.log",
              "console.info"
            ]
          }
        },

        files: [{
          expand: true,
          cwd: 'src',
          src: ['js/*.js', '!js/*.min.js'],
          dest: 'dist'
        }]
      }
    },

    //压缩CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['css/*.css'],
          dest: 'dist'
        }]
      }
    },

    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          { expand: true, cwd: 'src', src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist' }
        ]
      }
    },


    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            'images/*.{jpg,jpeg,gif,png}',
            'css/*.css',
            'js/*.js'
          ],
          dest : 'dist'
        }]
      }
    },


    useminPrepare: {
      html: ['app/tpl/**/*.html'],
      options: {
        // 测试发现这里指定的dest，是usemin引入资源的相对路径的开始
        // 在usemin中设置assetsDirs，不是指定的相对路径
        // List of directories where we should start to look for revved version of the assets referenced in the currently looked at file
        dest: 'build/tpl' // string type                 
      }
    },



    // 处理html中css、js 引入合并问题
    usemin: {
      html: 'dist/html/*.html'
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          { expand: true, cwd: 'src', src: ['html/*.html'], dest: 'dist' }
        ]
      }
    }

  });


  grunt.registerTask('prod', [
    'copy', //复制文件
    // 'concat', //合并文件
    'cssmin', //CSS压缩
    'uglify', //JS压缩
    'imagemin', //图片压缩
    'htmlmin', //HTML压缩
    // 'usemin' //HTML处理
  ]);

  grunt.registerTask('publish', ['clean', 'prod']);
};
