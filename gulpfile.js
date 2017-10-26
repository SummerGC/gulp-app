const gulp = require("gulp"); //const定义为一个常量 
const gulpCopy = require("gulp-copy");
const minImage = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const webserver = require("gulp-webserver");
//常用方法
//gulp.task 定义任务
//gulp.src	输入文件路径
//gulp.dest	输出文件路径	
//gulp.watch	监听文件变化

///node方法
//pipe()  管道

//定义默认任务
gulp.task("default",()=>{
	console.log("default是必须这么写, 才是默认任务");
});
//定义具体任务
gulp.task("message",()=>{   //在终端输入gulp message 即可运行
	console.log("执行具体任务,需要在终端运行 gulp message(任务名)");
});


//定义拷贝任务
gulp.task("copyHtml",()=>{
	//找到需要拷贝文件的路径
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));	
});
// //定义压缩图片任务
// gulp.task('imageMin',()=>{
// 	gulp.src("src/images/*")
// 		.pipe(minImage())
// 		.pipe(gulp.dest("dist/images"));
// })
//压缩js代码任务
//1.下载gulp-uglify
//2.引入模块
//3.定义任务
//4.在src下创建一个js文件夹 并且创建一个js文件,随便写一个函数
//5.实现任务
gulp.task('ysdm',()=>{
	gulp.src("src/js/*")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});
//定义sass转化为css任务
gulp.task('sass',()=>{
	gulp.src("src/sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("dist/css"))
});

//默认任务 不用单独去执行 写成这样可以一次执行多个任务
gulp.task("default",["message","copyHtml","imageMin","sass","ysdm"]);



//监听任务
gulp.task("watch",function(){
	gulp.watch("src/js/*.js",["ysdm"]);
	gulp.watch("src/images/*",["imageMin"]);
	gulp.watch("src/sass/*.css",["sass"]);
	gulp.watch("src/*.html",["copyHtml"]);
});


//webserver
gulp.task("webserver",()=>{
	return gulp.src("app")
			.pipe(webserver({
				port:4000,
				livereload:true, //热缓冲(更新)
				open:true
			}))
})
// gulp.task("watch",()=>{
// 	gulp.watch("app",["webserver"])
// })


