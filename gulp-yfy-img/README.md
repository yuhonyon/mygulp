## gulp-yfy-img

优化图片加载
* jpg修改为渐变式加载
* png生产一倍图

## 安装

```bash
    yarn add gulp-yfy-img --dev
```

## 安装依赖

* mac
```bash
    brew install imagemagick --with-webp
```

* windows

    下载安装[ImageMagick](http://www.imagemagick.org/script/index.php)

## 用法

```javascript
    const gulp = require('gulp');
    const yfyImg=require('gulp-yfy-img');
    gulp.task('default',function(){
        gulp.src('./src/**/*.+(jpg|png)')
        .pipe(yfyImg())
        .pipe(gulp.dest('./dist'))
    })
```

## options

待定