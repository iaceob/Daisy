/**
 * Created by canknow on 2015/6/29.
 */

function ColorPicker(domElement,options) {
    Plugin.call(this,domElement,options);

    var $this = this;

    this.options = options || {};
    this.color = [255, 255, 255, 255];

    //parameters
    var displayMode = this.options.displayMode;
    var callback = this.options.callback || function (value) { console.log("your color value is" + value) };
    var initializedColor = this.options.initializedColor || [255, 255, 128, 255];

    this.color = initializedColor;

    var box = document.createElement("div");
    box.className = "colorPicker";

    var paletteBox = document.createElement("div");
    paletteBox.className = "paletteBox";
    box.appendChild(paletteBox);

    var canvasRGB = document.createElement("canvas");
    canvasRGB.className = "canvasRGB";
    canvasRGB.width = 256 + 32;
    canvasRGB.height = 256;
    paletteBox.appendChild(canvasRGB);
    contextCanvasRGB = canvasRGB.getContext('2d');

    var commonColorBox = document.createElement("div");
    commonColorBox.className = "commonColorBox";
    paletteBox.appendChild(commonColorBox);

    createCommonColor("BaseColor");
    createCommonColor("MetroColor");

    //createArticalCommonColor();
    function createCommonColor(name) {
        var h3 = document.createElement("h3");
        h3.innerText = name;
        commonColorBox.appendChild(h3);
        var ul = document.createElement("ul");
        commonColorBox.appendChild(ul);
        var li = document.createElement("li");
        li.className = "clearfix";
        ul.appendChild(li);

        commonColorBox.appendChild(ul);
        for (var i = 0; i < window[name].length; i++) {
            var a = document.createElement("a");

            a.style.backgroundColor = window[name][i].value;
            a.data = window[name][i].value;
            a.title = window[name][i].key;
            li.appendChild(a);

            a.addEventListener("click", function () {
                console.log(this.data.toRGBArray())
                $this.color[0] = this.data.toRGBArray()[0];
                $this.color[1] = this.data.toRGBArray()[1];
                $this.color[2] = this.data.toRGBArray()[2];
                draw();
                $this.setColorFromCanvas();
            });

        }
    }

    function createArticalCommonColor() {
        var h3 = document.createElement("h3");
        h3.innerText = "ArticalCommonColor";
        commonColorBox.appendChild(h3);
        var ul = document.createElement("ul");
        ul.className = "articalCommonColorList";
        commonColorBox.appendChild(ul);
        for (i = 0; i < ArticalCommonColor.length; i++) {
            var li = document.createElement("li");
            li.className = "clearfix";
            ul.appendChild(li);

            for (var j = 0; j < ArticalCommonColor[i].length; j++) {
                var colorObject = ArticalCommonColor[i][j];
                var a = document.createElement("a");

                a.style.backgroundColor = colorObject.value;
                a.data = colorObject.value;
                a.title = colorObject.key;
                li.appendChild(a);

                a.addEventListener("click", function () {
                    console.log(this.data.toRGBArray())
                    $this.color[0] = this.data.toRGBArray()[0];
                    $this.color[1] = this.data.toRGBArray()[1];
                    $this.color[2] = this.data.toRGBArray()[2];
                    draw();
                    $this.setColorFromCanvas();
                });

            }
        }


    }

    var colorPreviewer = document.createElement("div");
    colorPreviewer.className = "colorPreviewer";
    box.appendChild(colorPreviewer);
    colorPreviewer.style.backgroundColor = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.color[3] + ")";

    switch (displayMode) {
        default:
            domElement.appendChild(box);
            break;
    }

    var RGSelectFlag = false;
    var BSelectFlag = false;
    canvasRGB.addEventListener("mousedown", function (event) {
        canvasRGB.style.cursor = "none";
        var x = event.clientX - canvasRGB.pageX();
        var y = event.clientY - canvasRGB.pageY();
        if (x <= 256) {
            RGSelectFlag = true;
            $this.color[0] = x;
            $this.color[1] = y;
        }
        else if (x > 256) {
            BSelectFlag = true;
            $this.color[2] = y;
        }
        draw();
        $this.setColorFromCanvas();
    });
    canvasRGB.addEventListener("mousemove", function (event) {
        if (RGSelectFlag || BSelectFlag) {
            var x = event.clientX - canvasRGB.pageX();
            var y = event.clientY - canvasRGB.pageY();
            if (x <= 256) {
                $this.color[0] = x;
                $this.color[1] = y;
            }
            else if (x > 256) {
                $this.color[2] = y;
            }
            draw();
            $this.setColorFromCanvas();
        }

    });
    document.addEventListener("mouseup", function (event) {
        RGSelectFlag = false;
        BSelectFlag = false;
        canvasRGB.style.cursor = "pointer";
    });

    var buttonSwitchMode = document.createElement("button");
    buttonSwitchMode.className = 'icon-button buttonSwitchMode';
    buttonSwitchMode.innerHTML = '<span class="icon-switch"></span>';
    box.appendChild(buttonSwitchMode);
    buttonSwitchMode.addEventListener("click", function () {
        paletteBox.classList.toggle("flipped");
    });

    var buttonOK = document.createElement("button");
    buttonOK.className = "buttonOK";
    buttonOK.innerText = "OK";
    box.appendChild(buttonOK);
    buttonOK.addEventListener("click", function () {
        callback("rgba(" + $this.color[0] + "," + $this.color[1] + "," + $this.color[2] + "," + $this.color[3] / 255 + ")");
        $this.dispose();
    });

    var buttonCancel = document.createElement("button");
    buttonCancel.className = "buttonCancel";
    buttonCancel.innerText = "Cancel";
    box.appendChild(buttonCancel);
    buttonCancel.addEventListener("click", function () {
        $this.dispose();
    });

    function putRGImageData() {
        var imagedata = contextCanvasRGB.createImageData(256, 256);
        for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 256; j++) {
                var index = (j * imagedata.width + i) * 4;  //calculate index
                imagedata.data[index] = i;   // red
                imagedata.data[index + 1] = j; // green
                imagedata.data[index + 2] = $this.color[2]; // blue
                imagedata.data[index + 3] = 255; // force alpha to 100%
            }
        }
        contextCanvasRGB.putImageData(imagedata, 0, 0);

    }

    function putBImageData() {
        var imagedata = contextCanvasRGB.createImageData(32, 256);

        for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 32; j++) {
                var index = (i * imagedata.width + j) * 4;  //calculate index
                imagedata.data[index] = 0;   // red
                imagedata.data[index + 1] = 0; // green
                imagedata.data[index + 2] = i; // blue
                imagedata.data[index + 3] = 255; // force alpha to 100%
            }
        }
        contextCanvasRGB.putImageData(imagedata, 256, 0, 0, 0, 32, 256);
    }

    function draw() {
        putRGImageData();
        putBImageData();

        contextCanvasRGB.strokeStyle = "#000";
        contextCanvasRGB.beginPath();
        contextCanvasRGB.arc($this.color[0], $this.color[1], 8, 0, Math.PI * 2);
        contextCanvasRGB.stroke();

        contextCanvasRGB.strokeStyle = $this.color[2] > 128 ? '#000' : '#fff';
        contextCanvasRGB.lineWidth = 1;
        contextCanvasRGB.lineCap = 'square';
        contextCanvasRGB.beginPath();
        contextCanvasRGB.moveTo(256, $this.color[2]);
        contextCanvasRGB.lineTo(288, $this.color[2]);
        contextCanvasRGB.stroke();
        contextCanvasRGB.closePath();
    }

    draw();

    //API
    this.setColorFromCanvas = function () {
        colorPreviewer.style.backgroundColor = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.color[3] / 255 + ")";
    };
    this.setCallback = function (callback) {
        this.options.callback = callback;
    };
}
ColorPicker.prototype=Plugin.prototype;
ColorPicker.prototype.constructor = ColorPicker;

//ColorPickerColor
var ColorPickerColor = [
    { key: "aliceblue", value: "#F0F8FF" },
    { key: "aquamarine", value: "#7FFFD4" },
    { key: "beige", value: "#F5F5DC" },
    { key: "black", value: "#000000" },
    { key: "blue", value: "#0000FF" },
    { key: "brown", value: "#A52A2A" },
    { key: "cadetblue", value: "#5F9EA0" },
    { key: "chocolate", value: "#D2691E" },
    { key: "darkgray", value: "#A9A9A9" },
    { key: "darkcyan", value: "#008B8B" },
    { key: "red", value: "#FF6C6C" },
    { key: "azure", value: "#F0FFFF" },
    { key: "bisque", value: "#FFE4C4" },
    { key: "blanchedalmond", value: "#FFEBCD" },
    { key: "blueviolet", value: "#8A2BE2" },
    { key: "burlywood", value: "#DEB887" },
    { key: "chartreuse", value: "#7FFF00" },
    { key: "coral", value: "#FF7F50" },
    { key: "cornsilk", value: "#FFF8DC" },
    { key: "darkblue", value: "#00008B" },
    { key: "darkgoldenrod", value: "#B8860B" },
    { key: "deeppink", value: "#FF1493" },
    { key: "darkolivegreen", value: "#556B2F" },
    { key: "darkorchid", value: "#9932CC" },
    { key: "darksalmon", value: "#E9967A" },
    { key: "darkslateblue", value: "#483D8B" },
    { key: "darkturquoise", value: "#00CED1" },
    { key: "forestgreen", value: "#228B22" },
    { key: "dimgray", value: "#696969" },
    { key: "firebrick", value: "#B22222" },
    { key: "darkgreen", value: "#006400" },
    { key: "darkmagenta", value: "#8B008B" },
    { key: "dodgerblue", value: "#1E90FF" },
    { key: "darkred", value: "#8B0000" },
    { key: "darkseagreen", value: "#8FBC8F" },
    { key: "darkslategray", value: "#2F4F4F" },
    { key: "darkviolet", value: "#9400D3" },
    { key: "floralwhite", value: "#FFFAF0" },
    { key: "gainsboro", value: "#DCDCDC" },
    { key: "deepskyblue", value: "#00BFFF" },
    { key: "green", value: "#008000" },
    { key: "honeydew", value: "#F0FFF0" },
    { key: "indianred", value: "#CD5C5C" },
    { key: "khaki", value: "#F0E68C" },
    { key: "lightcyan", value: "#E0FFFF" },
    { key: "lightgreen", value: "#90EE90" },
    { key: "lavenderblush", value: "#FFF0F5" },
    { key: "lemonchiffon", value: "#FFFACD" },
    { key: "lightcoral", value: "#F08080" },
    { key: "lightpink", value: "#FFB6C1" },
    { key: "gold", value: "#FFD700" },
    { key: "gray", value: "#808080" },
    { key: "greenyellow", value: "#ADFF2F" },
    { key: "hotpink", value: "#FF69B4" },
    { key: "ivory", value: "#FFFFF0" },
    { key: "lavender", value: "#E6E6FA" },
    { key: "lawngreen", value: "#7CFC00" },
    { key: "lightblue", value: "#ADD8E6" },
    { key: "lightgrey", value: "#D3D3D3" },
    { key: "lightskyblue", value: "#87CEFA" },
    { key: "lightseagreen", value: "#20B2AA" },
    { key: "lightsteelblue", value: "#B0C4DE" },
    { key: "limegreen", value: "#32CD32" },
    { key: "mintcream", value: "#F5FFFA" },
    { key: "moccasin", value: "#FFE4B5" },
    { key: "magenta", value: "#FF00FF" },
    { key: "mediumaquamarine", value: "#66CDAA" },
    { key: "mediumorchid", value: "#BA55D3" },
    { key: "mediumseagreen", value: "#3CB371" },
    { key: "mediumspringgreen", value: "#00FA9A" },
    { key: "lightsalmon", value: "#FFA07A" },
    { key: "lightslategray", value: "#778899" },
    { key: "lightyellow", value: "#FFFFE0" },
    { key: "linen", value: "#FAF0E6" },
    { key: "mediumturquoise", value: "#48D1CC" },
    { key: "maroon", value: "#800000" },
    { key: "mediumblue", value: "#0000CD" },
    { key: "mediumvioletred", value: "#C71585" },
    { key: "mediumslateblue", value: "#7B68EE" },
    { key: "mistyrose", value: "#FFE4E1" },
    { key: "navajowhite", value: "#FFDEAD" },
    { key: "navy", value: "#000080" },
    { key: "oldlace", value: "#FDF5E6" },
    { key: "orange", value: "#FFA500" },
    { key: "palegreen", value: "#98FB98" },
    { key: "palevioletred", value: "#DB7093" },
    { key: "peachpuff", value: "#FFDAB9" },
    { key: "pink", value: "#FFC0CB" },
    { key: "powderblue", value: "#B0E0E6" },
    { key: "red", value: "#FF0000" },
    { key: "midnightblue", value: "#191970" },
    { key: "olive", value: "#808000" },
    { key: "olivedrab", value: "#6B8E23" },
    { key: "orchid", value: "#DA70D6" },
    { key: "paleturquoise", value: "#AFEEEE" },
    { key: "papayawhip", value: "#FFEFD5" },
    { key: "peru", value: "#CD853F" },
    { key: "plum", value: "#DDA0DD" },
    { key: "purple", value: "#800080" },
    { key: "rosybrown", value: "#BC8F8F" },
    { key: "royalblue", value: "#4169E1" },
    { key: "salmon", value: "#FA8072" },
    { key: "seagreen", value: "#2E8B57" },
    { key: "sienna", value: "#A0522D" },
    { key: "slateblue", value: "#6A5ACD" },
    { key: "snow", value: "#FFFAFA" },
    { key: "steelblue", value: "#4682B4" },
    { key: "silver", value: "#C0C0C0" },
    { key: "thistle", value: "#D8BFD8" },
    { key: "turquoise", value: "#40E0D0" },
    { key: "saddlebrown", value: "#8B4513" },
    { key: "sandybrown", value: "#F4A460" },
    { key: "seashell", value: "#FFF5EE" },
    { key: "skyblue", value: "#87CEEB" },
    { key: "slategray", value: "#708090" },
    { key: "springgreen", value: "#00FF7F" },
    { key: "tan", value: "#D2B48C" },
    { key: "teal", value: "#008080" },
    { key: "tomato", value: "#FF6347" },
    { key: "violet", value: "#EE82EE" },
    { key: "whitesmoke", value: "#F5F5F5" },
    { key: "yellow", value: "#FFFF00" },
    { key: "wheat", value: "#F5DEB3" },
    { key: "yellowgreen", value: "#9ACD32" },
];