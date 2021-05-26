import { Hill } from './hill.js';
import { Sun } from './sun.js';



class App {
    constructor () {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#00172D', 2, 6),
            new Hill('#03386D', 1, 8),
            new Hill('#0153A2', 0.5, 12),

    ];

        this.sun = new Sun();

        window.addEventListener("resize", this.resize.bind(this), false); // get screen size
        this.resize();

        requestAnimationFrame(this.animate.bind(this)) //clear canvas

    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sun.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sun.draw(this.ctx, t);
        
    }
}

window.onload = () => {
    new App();
};