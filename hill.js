export class Hill {
    constructor (color, speed, total) {
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let pre = cur;

        let dots = [];
        cur.x += this.speed;

        if (cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap*2),
                y: this.getY()
            });
        } else if (cur.x > this.stageWidth + this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);

        let preX = cur.x;
        let preY = cur.y;

        for (let i = 0; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (pre.x + cur.x) / 2;
            const cy = (pre.y + cur.y) / 2;
            ctx.quadraticCurveTo(pre.x, pre.y, cx, cy);

            dots.push({
                x1: preX,
                y1: preY,
                x2: pre.x,
                y2: pre.y,
                x3: cx,
                y3: cy,
            });

            pre = cur;
            preX = cx;
            preY = cy;
        }

        ctx.lineTo(preX, preY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots;
    }

    getY() {
        const min = this.stageHeight / 20;
        const max = this.stageHeight - min;
        return min + Math.random() * max; 
    }


}