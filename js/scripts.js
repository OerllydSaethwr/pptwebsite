var canvas, context, tool;

window.onload = function () {
    canvas = document.getElementById("imageView");
    context = canvas.getContext("2d");
    var img = document.getElementById("firstFrame");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

function play(button) {
    var ct = document.getElementById("cont");
    button.style.color = "white";
    button.style.backgroundColor = "white";

    window.setTimeout(play2, 300);

}

function play2(button, ct) {
    document.getElementById("playButton").style.display = "none";
    document.getElementById("cont").style.paddingTop = "4.85rem";


    document.getElementById("imageView").style.display = "none";
    document.getElementById("video").style.display = "block";
    document.getElementById("video").play();

}


if(window.addEventListener) {
    window.addEventListener('load', function () {
        function init() {

            tool = new tool_pencil();
            canvas = document.getElementById("imageView");
            context = canvas.getContext("2d");
            context.strokeStyle = "blue";

            canvas.addEventListener('mousedown', ev_canvas, false);
            canvas.addEventListener('mousemove', ev_canvas, false);
            canvas.addEventListener('mouseup',	 ev_canvas, false);

        }

        var started = false;

        function tool_pencil () {
            var tool = this;
            this.started = false;

            this.mousedown = function (ev) {
                context.beginPath();
                context.moveTo(ev._x, ev._y);
                tool.started = true;
            }

            this.mousemove = function (ev) {
                if (tool.started) {
                    context.lineTo(ev._x, ev._y);
                    context.stroke();
                }
            }

            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                }
            }
        }

        function ev_canvas (ev) {
            var x, y;
            var rect = canvas.getBoundingClientRect();

            if (ev.layerX || ev.layerX == 0) { // Firefox
                var scaleX = canvas.width / rect.width;
                var scaleY = canvas.height / rect.height;
                ev._x = (ev.clientX - rect.left) * scaleX;  //45
                ev._y = (ev.clientY - rect.top) * scaleY;  //20

            }
            var func = tool[ev.type];
            if (func) {
             func(ev);
            }
        }

        init();
    }, false);}