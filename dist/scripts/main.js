// function sketchProc(a){function b(b,c,d){var e=d,f=Math.cos(e),g=Math.sin(e),h=f*b-g*c+j.x,i=g*b+f*c+j.y;return new a.PVector(h,i)}function c(){for(var b=0;b<l.length;b++){var c=l[b];c.Update(),c.getLastY()>screen.height&&l.splice(b,1),a.fill(255,255,255,150),a.stroke(255,255,255,25),a.line(c.getX(),c.getY(),c.getLastX(),c.getLastY()),a.ellipse(c.getX(),c.getY(),2,2)}}function d(){for(var c=0;c<k.length;c++){var d=k[c],e=b(d.getX(),d.getY(),m);e.y-j.y<=0&&(d.size>1?(a.noStroke(),a.fill(255,255,255,d.alpha),a.ellipse(d.getX(),d.getY(),d.size,d.size)):(a.noFill(),a.stroke(255,255,255,d.alpha),a.point(d.getX(),d.getY())))}}function e(){for(var b=a.color(55,99,130),c=a.color(8,8,16),d=0;d<=a.height;d++){var e=a.map(d,0,a.height,0,1),f=a.lerpColor(c,b,e);a.stroke(f),a.line(0,d,a.width,d)}}function f(b,c,d){this.position=new a.PVector(b,c),this.size=3*Math.random(),this.alpha=d,this.speed=this.size/10+.1,this.getX=function(){return Math.round(this.position.get().x)},this.getY=function(){return Math.round(this.position.get().y)},this.flip=function(){this.position=new a.PVector(this.position.x,-1*this.position.y)}}function g(){this.position=new a.PVector(Math.round(Math.random()*screen.width),-100),this.positionTail=new a.PVector(this.position.get().x,this.position.get().y),this.speed=5*Math.random()+10,this.tail=20*Math.random()+50,this.getX=function(){return Math.round(this.position.get().x)},this.getY=function(){return Math.round(this.position.get().y)},this.getLastX=function(){return Math.round(this.positionTail.get().x)},this.getLastY=function(){return Math.round(this.positionTail.get().y)},this.Update=function(){var b=new a.PVector(this.tail,-this.tail),c=new a.PVector(-this.speed,this.speed);this.position=a.PVector.add(this.position,c),this.positionTail=a.PVector.add(this.position,b)}}var h,i,j,k=[],l=[],m=0,n=100,o=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;a.setup=function(){jProcessingJS(this,{fullscreen:!0,mouseoverlay:!1}),a.frameRate(25),j=new a.PVector(this.width/2,this.height+n),i=this.height;var b;b=this.width>this.height?2.5*this.width:2.5*this.height,h=o?3*b:4*b;for(var c=0;h>c;c++){var d=255*Math.random();d>50&&k.push(new f(-1*b+Math.round(Math.random()*(2*b)),-1*b+Math.round(Math.random()*(2*b)),100))}},a.draw=function(){a.background(0),e(),a.noStroke(),a.pushMatrix(),a.translate(j.x,j.y),a.rotate(m),d(),m-=.002,m<=-2*a.PI&&(m=0),a.popMatrix(),l.length<1&&Math.random()>.98&&l.push(new g),c()}}var canvas=document.getElementById("bgcanvas"),p=new Processing(canvas,sketchProc);
// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
    var maxStars;
    var stars = [];
    var shootingStars = [];
    var canvasHeight;
    var curRot = 0;
    var centerOffset =100;
    var rotationCenter;
    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    processing.setup = function() {
        jProcessingJS(this, {fullscreen:true, mouseoverlay:false});
        processing.frameRate(25);
        rotationCenter = new processing.PVector(this.width/2, this.height + centerOffset);

        canvasHeight = this.height;
        var maxSize;
        if(this.width>this.height)
            maxSize = this.width*2.5;
        else
            maxSize = this.height*2.5;

        if(is_firefox)
            maxStars=maxSize*3;
        else
            maxStars=maxSize*4;
        for(var i=0;i<maxStars;i++) {
            var alpha = Math.random() * 255;
            if(alpha>50)
                stars.push(new Star((-1*maxSize)+Math.round(Math.random() * (2*maxSize)), (-1*maxSize)+Math.round(Math.random() * (2*maxSize)), 100));
        }
    }

    processing.draw = function() {
        processing.background(0);
        drawGradient();
        processing.noStroke();

        /* start rotation */
        processing.pushMatrix();
        processing.translate(rotationCenter.x, rotationCenter.y);
        processing.rotate(curRot);
        drawStars();
        curRot=curRot-0.002;
        if(curRot<=(processing.PI*-2)) curRot = 0;

        /* debug */
        // processing.stroke(255,0,0);
        // processing.line(0,0,300,0);
        // processing.stroke(0,255,0);
        // processing.line(0,0,-200,0)
        // processing.line(0,-200,0,200)
        // processing.stroke(255,255,255,20);
        // processing.noStroke();
        // processing.fill(255,0,0);
        // processing.ellipse(0,0,10,10);

        processing.popMatrix();
        /* end rotation */

        if(shootingStars.length<1 && (Math.random()>0.98)) {
            shootingStars.push(new ShootingStar());
        }
        drawShootingStars();

        /* debug */
        // processing.fill(255,255,255,100);
        // processing.text("Degrees: " + curRot, 10, 15);
        // processing.text("Quadrant: " + Math.abs(Math.ceil(curRot%4)), 10,30);
        // processing.text("Stars: " + stars.length, 10,45);
    }

    function getRotation(x, y, angle) {
        var radians = angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * x) - (sin * y) + rotationCenter.x,
            ny = (sin * x) + (cos * y) + rotationCenter.y;
        return new processing.PVector(nx, ny);
    }

    function drawShootingStars() {
        for(var i=0;i<shootingStars.length;i++) {
            var cur = shootingStars[i];
            cur.Update();
            if(cur.getLastY()>screen.height)
                shootingStars.splice(i, 1);

            processing.fill(255,255,255,150);
            processing.stroke(255,255,255,25);
            processing.line(cur.getX(), cur.getY(), cur.getLastX(), cur.getLastY());
            processing.ellipse(cur.getX(), cur.getY(), 2, 2);
        }
    }

    function drawStars() {
        for(var i=0;i<stars.length;i++) {
            var cur = stars[i];
            var pos = getRotation(cur.getX(), cur.getY(), curRot);
            if(pos.y-rotationCenter.y<=0) {
                if(cur.size>1) {
                    processing.noStroke();
                    processing.fill(255,255,255,cur.alpha);
                    processing.ellipse(cur.getX(), cur.getY(), cur.size, cur.size);
                }
                else {
                    processing.noFill();
                    processing.stroke(255,255,255,cur.alpha);
                    processing.point(cur.getX(), cur.getY());
                }
            }
        }
    }

    function drawGradient() {
        var toColor = processing.color(55,99,130);
        var fromColor = processing.color(8,8,16);
        for (var i = 0; i <= processing.height; i++) {
            var inter = processing.map(i, 0, processing.height, 0, 1);
            var c = processing.lerpColor(fromColor, toColor, inter);
            processing.stroke(c);
            processing.line(0, i, processing.width, i);
        }
    }

    function Star(x, y, a) {
        this.position = new processing.PVector(x, y);
        this.size = Math.random() * 3;
        this.alpha = a;
        this.speed = (this.size/10)+0.1;

        this.getX = function() {
            return Math.round(this.position.get().x);
        }

        this.getY = function() {
            return Math.round(this.position.get().y);
        }

        this.flip = function() {
            this.position = new processing.PVector(this.position.x, this.position.y*-1);
        }
    }

    function ShootingStar() {
        this.position = new processing.PVector(Math.round(Math.random() * screen.width),-100);
        this.positionTail = new processing.PVector(this.position.get().x, this.position.get().y);
        this.speed=(Math.random() * 5)+10;
        this.tail = (Math.random() * 20)+50;

        this.getX = function() {
            return Math.round(this.position.get().x);
        }

        this.getY = function() {
            return Math.round(this.position.get().y);
        }
        this.getLastX = function() {
            return Math.round(this.positionTail.get().x);
        }

        this.getLastY = function() {
            return Math.round(this.positionTail.get().y);
        }
        this.Update = function() {
            var v1 = new processing.PVector(this.tail, -this.tail);
            var v2 = new processing.PVector(-this.speed, this.speed);
            this.position = processing.PVector.add(this.position, v2);
            this.positionTail = processing.PVector.add(this.position, v1);
        }
    }
};

var canvas = document.getElementById("bgcanvas");
var p = new Processing(canvas, sketchProc);
