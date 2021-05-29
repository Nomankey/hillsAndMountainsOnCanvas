export class Sun {
    constructor() {
        this.radius = 150;

        this.total = 50; //num of coordinate
        this.gap = 1 / this.total; // ratio of coordinate
        this.originalPosition = [];
        this.position = [];
        for(let i = 0; i < this.total; i++) {
            const position = this.getOriginalPoint(this.radius, this.gap * i);
            this.originalPosition[i] = position;
            this.position[i] = position;
        }

        this.fps = 30;
        this.fpsTime = 1000 / this.fps; 

    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.stageWidth/2;
        this.y = this.radius + 40;
    }

    draw(ctx, t) {
        if(!this.time) {
            this.time = t;
        }

        const now = t - this.time;
        if(now > this.fpsTime) {
            this.time = t;
            this.updatePoints();
        }


        ctx.fillStyle = '#FFF192';
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        let position = this.position[0];
        ctx.moveTo(position.x + this.x, position.y + this.y);
        for (let i = 0; i < this.total; i++) {
            const position = this.position[i];
            ctx.lineTo(position.x + this.x, position.y + this.y)
        }
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-over'; // i did not want to use this one :(
    } 

    updatePoints() { //randomly update coordinates on the circle
        for (let i = 0; i < this.total; i++) {
            const position = this.originalPosition[i];
            this.position[i] = {
                x: position.x + this.ranInt(5),
                y: position.y + this.ranInt(5)
            }
        }
    }

    ranInt(max) {
        return Math.random() * max;
    }


    getOriginalPoint(radius, t) { //a function that gets coordinates on the circle
        const theta = 2 * Math.PI * t

        return {
            x: (Math.cos(theta) * radius),
            y: (Math.sin(theta) * radius)
        };
    }
}