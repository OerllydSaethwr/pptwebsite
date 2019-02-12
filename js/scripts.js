var canvas, context;

window.onload = function () {
    canvas = document.getElementById("imageView");
    context = canvas.getContext("2d");
    var img = document.getElementById("firstFrame");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}


if(window.addEventListener) {
    window.addEventListener('load', function () {
        function init() {
            canvas = document.getElementById("imageView");
            context = canvas.getContext("2d");

            canvas.addEventListener('mousemove', ev_mousemove, false);

        }

        var started = false;

        function ev_mousemove(ev) {
            var x, y;
            var rect = canvas.getBoundingClientRect();



            if (ev.layerX || ev.layerX == 0) { // Firefox
                var scaleX = canvas.width / rect.width;
                var scaleY = canvas.height / rect.height;
                x = (ev.clientX - rect.left) * scaleX;  //45
                y = (ev.clientY - rect.top) * scaleY;  //20

            }
            if (!started) {
                context.beginPath();
                context.moveTo(x, y);
                started = true;
            } else {
                context.lineTo(x, y);
                context.strokeStyle = "blue";
                context.stroke();
            }
        }

        init();
    }, false);}
