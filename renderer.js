// Generated by CoffeeScript 1.10.0
(function() {
  var canvas, ctx, selDims;

  canvas = '';

  ctx = '';

  selDims = [10, 10];

  this.boxSize = [105, 79];

  this.cmdEntries = [[boxSize[0] / 2, 0], [-boxSize[0] / 2, 0], [0, boxSize[1] / 2], [0, -boxSize[1] / 2]];

  this.evalSize = [101, 79];

  this.evalEntries = [[evalSize[0] / 2, 0], [-evalSize[0] / 2, 0], [0, evalSize[1] / 2], [0, -evalSize[1] / 2]];

  this.interSize = [109, 81];

  this.interEntries = [[interSize[0] / 2, 0], [-interSize[0] / 2, 0], [0, interSize[1] / 2], [0, -interSize[1] / 2]];

  this.gridDist = 25;

  this.InitCanvas = function() {
    canvas = document.getElementById('diagr');
    return ctx = canvas.getContext("2d");
  };

  this.RestoreCtx = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return DrawAllBoxes();
  };

  this.DrawAllBoxes = function() {
    var box, i, j, k, len, len1, len2;
    ctx.beginPath();
    for (i = 0, len = boxes.length; i < len; i++) {
      box = boxes[i];
      DrawBox(box, false);
      DrawText(box.position.x, box.position.y, box.text, false);
    }
    ctx.stroke();
    ctx.beginPath();
    for (j = 0, len1 = boxes.length; j < len1; j++) {
      box = boxes[j];
      if (box.yesBox) {
        DrawConnection(box, box.yesBox, "green", false);
      }
    }
    ctx.stroke();
    ctx.beginPath();
    for (k = 0, len2 = boxes.length; k < len2; k++) {
      box = boxes[k];
      if (box.noBox) {
        DrawConnection(box, box.noBox, "blue", false);
      }
    }
    return ctx.stroke();
  };

  this.DrawConnection = function(startBox, endBox, color, single) {
    var closest_dist, dest, distance, endPoint, entry, ex, ey, i, j, len, len1, ref, ref1, startPoint, sx, sy;
    if (single == null) {
      single = true;
    }
    sx = startBox.position.x;
    sy = startBox.position.y;
    ex = endBox.position.x;
    ey = endBox.position.y;
    startPoint = [];
    closest_dist = 10000000;
    ref = startBox.entryPoints;
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      distance = Math.sqrt(Math.pow(entry[0] + sx - ex, 2) + Math.pow(entry[1] + sy - ey, 2));
      if (closest_dist > distance) {
        closest_dist = distance;
        startPoint = [entry[0] + sx, entry[1] + sy];
      }
    }
    endPoint = [];
    closest_dist = 10000000;
    ref1 = endBox.entryPoints;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      dest = ref1[j];
      distance = Math.sqrt(Math.pow(dest[0] + ex - startPoint[0], 2) + Math.pow(dest[1] + ey - startPoint[1], 2));
      if (closest_dist > distance) {
        closest_dist = distance;
        endPoint = [dest[0] + ex, dest[1] + ey];
      }
    }
    startPoint = new Vector(startPoint[0], startPoint[1]);
    endPoint = new Vector(endPoint[0], endPoint[1]);
    return DrawLine(startPoint, endPoint, startBox, endBox, color, single);
  };

  this.DrawBox = function(box, single) {
    if (single == null) {
      single = false;
    }
    switch (box.type) {
      case cmdName:
        return DrawCmd(box.position.x, box.position.y, single);
      case evalName:
        return DrawEval(box.position.x, box.position.y, single);
      case interName:
        return DrawInter(box.position.x, box.position.y, single);
      case 'start':
        return DrawCmd(box.position.x, box.position.y, single);
      case 'end':
        return DrawCmd(box.position.x, box.position.y, single);
    }
  };

  this.DrawCmd = function(x, y, single) {
    if (single == null) {
      single = true;
    }
    if (single) {
      ctx.beginPath();
    }
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
    ctx.rect(x - boxSize[0] / 2, y - boxSize[1] / 2, boxSize[0], boxSize[1]);
    if (single) {
      return ctx.stroke();
    }
  };

  this.DrawEval = function(x, y, single) {
    if (single) {
      ctx.beginPath();
    }
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
    ctx.moveTo(x, y + interSize[1] / 2);
    ctx.lineTo(x + interSize[0] / 2, y);
    ctx.lineTo(x, y - interSize[1] / 2);
    ctx.lineTo(x - interSize[0] / 2, y);
    ctx.lineTo(x, y + interSize[1] / 2);
    if (single) {
      return ctx.stroke();
    }
  };

  this.DrawInter = function(x, y, single) {
    if (single) {
      ctx.beginPath();
    }
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
    ctx.moveTo(x + evalSize[0] / 2 - 3, y + evalSize[1] / 2);
    ctx.lineTo(x + evalSize[0] / 2 + 3, y - evalSize[1] / 2);
    ctx.lineTo(x - evalSize[0] / 2 + 3, y - evalSize[1] / 2);
    ctx.lineTo(x - evalSize[0] / 2 - 3, y + evalSize[1] / 2);
    ctx.lineTo(x + evalSize[0] / 2 - 3, y + evalSize[1] / 2);
    if (single) {
      return ctx.stroke();
    }
  };

  this.DrawSelection = function(x, y, color) {
    if (color == null) {
      color = "#FF0000";
    }
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = color;
    ctx.rect(x - boxSize[0] / 2 - selDims[0] / 2, y - boxSize[1] / 2 - selDims[1] / 2, boxSize[0] + selDims[0], boxSize[1] + selDims[1]);
    ctx.closePath();
    return ctx.stroke();
  };

  this.DrawText = function(x, y, text, single) {
    if (single == null) {
      single = true;
    }
    if (single) {
      ctx.beginPath();
    }
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 12 / 4, boxSize[0] - 4);
    if (single) {
      return ctx.stroke();
    }
  };

  this.DrawLine = function(pos1, pos2, startBox, endBox, color, single) {
    var angle, edisp, headlen, sdisp;
    if (color == null) {
      color = "green";
    }
    if (single == null) {
      single = true;
    }
    if (single) {
      ctx.beginPath();
    }
    headlen = 8;
    ctx.lineWidth = "2";
    ctx.strokeStyle = color;
    sdisp = (pos1.subtract(startBox.position)).normalize().mult_num(10);
    edisp = (pos2.subtract(endBox.position)).normalize().mult_num(15);
    angle = Math.atan2(-edisp.y, -edisp.x);
    ctx.moveTo(pos1.x, pos1.y);
    if (Math.abs(pos2.x - pos1.x) > Math.abs(pos2.y - pos1.y)) {
      ctx.lineTo(pos1.x + sdisp.x, pos1.y + sdisp.y);
      ctx.lineTo(pos2.x + edisp.x, pos1.y + sdisp.y);
      ctx.lineTo(pos2.x + edisp.x, pos2.y + edisp.y);
      ctx.lineTo(pos2.x, pos2.y);
    } else {
      ctx.lineTo(pos1.x + sdisp.x, pos1.y + sdisp.y);
      ctx.lineTo(pos1.x + sdisp.x, pos2.y + edisp.y);
      ctx.lineTo(pos2.x + edisp.x, pos2.y + edisp.y);
      ctx.lineTo(pos2.x, pos2.y);
    }
    ctx.lineTo(pos2.x - headlen * Math.cos(angle - Math.PI / 6), pos2.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(pos2.x, pos2.y);
    ctx.lineTo(pos2.x - headlen * Math.cos(angle + Math.PI / 6), pos2.y - headlen * Math.sin(angle + Math.PI / 6));
    if (single) {
      return ctx.stroke();
    }
  };

}).call(this);
