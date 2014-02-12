// GRUNT GLORRY
module.exports = function (grunt) {
    // task modules
    grunt.loadNpmTasks('grunt-jekyll'); //task:jekyll - clean folders
    grunt.loadNpmTasks('grunt-contrib-clean'); //task:clean - clean folders
    grunt.loadNpmTasks('grunt-contrib-jshint'); //task:jshint - js linting
    grunt.loadNpmTasks('grunt-contrib-watch'); //task:watch - watch folder and act
    grunt.loadNpmTasks('grunt-contrib-concat'); //task:concat - join files
    grunt.loadNpmTasks('grunt-contrib-compass'); //task:compass - compass compiling
    grunt.loadNpmTasks('grunt-contrib-uglify'); //task:uglify - js processing
    grunt.loadNpmTasks('grunt-git'); //git controls! Awesome
    grunt.loadNpmTasks('grunt-bump'); //version bump

    // handy tool modules
    grunt.loadNpmTasks('grunt-devtools');

    // Project configuration.
    grunt.initConfig({
        // ***************************************
        // Load files
        // ***************************************
        // p is for package
        pkg: grunt.file.readJSON('package.json'),

        // banner
        meta: {
            banner:
                '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        // ***************************************
        // Clean a folder - grunt-contrib-clean
        // ***************************************
        clean: {
            js: {
                src: ['<%= pkg.f.jsMin %>']
            }
        },

        // ***************************************
        // Jekyll generator - grunt-jekyll
        // ***************************************
        jekyll: {
            dist: {
                options: {
                    config: '_config.yml'
                }
            }
        },

        // ***************************************
        // JAVASCRIPT hints - grunt-contrib-jshint
        // ***************************************
        jshint: {
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                jshintrc: true
            },
            // define the files to lint
            files: [
                'gruntfile.js',
                'package.json',
                'bower.json',
                '.bowerrc',
                '<%= pkg.f.jsDir %>/<%= pkg.js %>'
            ]
        },

        // ***************************************
        // Concaticate files - grunt-contrib-concat
        // ***************************************
        // join files together
        concat: {
            options: { separator: ';' },
            core: {
                src: [
                    '<%= pkg.f.jsLib %>/*.js',
                    '<%= pkg.f.jsDir %>/*.js'
                ],
                dest: '<%= pkg.f.jsMin %>/<%= pkg.js %>',
                nonull: true
            }
        }, // [end] concat

        // ***************************************
        // JS minify - grunt-contrib-uglify
        // ***************************************
        uglify: {
            //default options
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min',
                compress: true,
                sourceMap: true
            },
            files: {
                //clean up core.js
                // js/min/script.js
                src: '<%= concat.core.dest %>',
                dest: '<%= pkg.f.jsMin %>/scripts.min.js'
            }
        }, // [end] uglify

        // ***************************************
        // Compass/SASS - grunt-contrib-compass
        // ***************************************
        compass: { //task
            clean: { // task: clean compass cache
                options: {
                    clean: true
                }
            },
            options: { // read configuration from config.rb
                config: './config.rb'
            },
            files: ['<%= pkg.f.sassDir %>']
        }, // [end] compass

        // ***************************************
        // Git - grunt-git
        // ***************************************
        gitpush: { //task
            github: { // git push to remote
                options: {
                    remote: 'github',
                    branch: '<%= pkg.branch %>'
                }
            },
            bitbucket: { // git push to remote
                options: {
                    remote: 'bitbucket',
                    branch: '<%= pkg.branch %>'
                }
            }
        }, // [end] git

        // ***************************************
        // Bump version - grunt-bump
        // ***************************************
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: '<%= pkg.branch %>',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        // *******************************************
        // WATCH it all happen = grunt-contrib-watch
        // *******************************************
        watch: {
            compass: {
                files: ['<%= pkg.f.sassDir %>/**/*'],
                tasks: ['compass:clean', 'compass']
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            jekyll: {
                files: ['<%= pkg.f.root %>/**/*.html','<%= pkg.f.root %>/**/*.md'],
                tasks: ['jekyll']
            }
        } // [end] watch

    }); // [end] block definitions

    // ###########################################
    // Default task(s)
    // ###########################################
    grunt.registerTask('default', [
        'compass:clean', // cleanup .sass-cache
        'compass',       // compile compass
        'clean:js',      // clean out js min folder
        'concat',        // join js files
        'uglify',        // compress js files
        'jekyll'         // jekyll site generation
    ]);

    // ###########################################
    // watch task(s)
    // ###########################################
    grunt.registerTask('watch', [
        'watch'
    ]);

    // ###########################################
    // deploy to Github Pages
    // ###########################################
    //noinspection JSHint
    grunt.registerTask('deploy', [
        'bump', // bump version
        'gitpush:github', // push to github
        'gitpush:bitbucket' // backup to bitbucket
    ]);
};