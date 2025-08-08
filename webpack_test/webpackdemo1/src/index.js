import Greet,{sum} from "./two"
import "./style.css"    //这种写法仅适配webpack，一般js文件不建议这样引入

console.log(sum);

console.log(Greet);

console.log("这个是第一个入口，名为index");

