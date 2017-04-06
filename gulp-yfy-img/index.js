const fs = require('fs'),
    gm = require('gm').subClass({ imageMagick: true });
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const colors = require('colors');

function gulpImg(options) {

    let config={

    };
    if(typeof options=="object"){
        for(let i in options){
            config[i]=options[i];
        }
    }

    let stream = through.obj(function(file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        if (file.isBuffer()) {
            let that = this;
            gm(file.contents)
                .format(function(err, format) {
                    if (format == "JPEG") {
                        this.interlace('Line')
                            .toBuffer('JPEG', (err, buffer) => {
                                if (!err) { console.log((file.path + "-渐变式成功").green) } else {
                                    console.log((err + file.path + "-渐变式失败").red)
                                }
                                file.contents = buffer;
                                that.push(file);
                                cb();
                            });

                    } else {
                        that.push(file.clone());
                        this.size((err, size) => {
                            this.resize(size.width / 2, size.height / 2)
                                .toBuffer('PNG', (err, buffer) => {
                                    if (!err) { console.log((file.path + "-创建一倍图成功").green) } else {
                                        console.log((err + file.path + "-创建一倍图失败").red)
                                    }
                                    file.path = file.path.replace(/\.png/i, '-min.png')
                                    file.contents = buffer;
                                    that.push(file);
                                    cb();
                                });
                        })
                    }
                })

        }


    });

    return stream;
};


module.exports = gulpImg;
