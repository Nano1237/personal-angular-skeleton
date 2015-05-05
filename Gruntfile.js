module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-sass');

    /*
     ACHTUNG!! WENN HIER DATEIEN GEÄNDERT WERDEN AUCH UNTEN BEI KARMA!!
     */
    var jsfiles = [
        'dev/app.js',
        'dev/**/*.js'
    ];

    var sassFiles = {
        'www/css/main.css': 'scss/main.scss'
    };


    grunt.initConfig({
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    files: [
                        'www/app/libs/angular/angular.js',
                        'www/app/libs/angular-route/angular-route.js',
                        'www/app/libs/ngTagsInput/ng-tags-input.min.js',
                        'www/app/libs/angular-mocks/angular-mocks.js',
                        //
                        'dev/app/modules/**/index.js',
                        'dev/app/app.js',
                        //
                        'tests/unit/*.js'
                    ]
                },
                singleRun: true,
                browsers: ['Chrome']
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: sassFiles
            }
        },
        ngdocs: {
            options: {
                scripts: [
                    'angular.js',
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-route.js',
                    '//cdnjs.cloudflare.com/ajax/libs/ng-tags-input/2.2.0/ng-tags-input.min.js',
                    '../www/app/bluezebra.min.js'
                ],
                startPage: '/api/main',
                html5Mode: false
            },
            all: jsfiles
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'C:\\Users\\MCB01\\PhpstormPlugins\\closure',
                js: 'bluezebra.js',
                jsOutputFile: 'www/app/app.min.js',
                maxBuffer: 500,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        connect: {
            options: {
                keepalive: true
            },
            server: {}
        },
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: jsfiles,
                dest: 'bluezebra.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev/html/',
                        src: '*',
                        dest: 'www/html/'
                    }
                ]
            }
        },
        clean: ['docs', 'www/html/*', 'bluezebra.js']
    });
    grunt.registerTask('unit', [
        'karma'
    ]);
    grunt.registerTask('justbuild', [
        'sass',
        'concat',
        'closure-compiler',
        'clean',
        'copy',
        'ngdocs'
    ]);
    grunt.registerTask('default', [
        'unit',
        'justbuild',
        'connect'
    ]);
};