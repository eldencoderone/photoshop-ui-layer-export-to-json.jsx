#target photoshop

/*
 * Photoshop UI Layer Export to JSON
 * ----------------------------------
 * Recursively exports all visible layers (including inside groups) into a structured JSON file.
 * Includes: layer name, type, position, size, group name, opacity, and text content.
 *
 * Author: elDENcoder (https://github.com/eldencoderone)
 * License: MIT
 */

function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function pad(level, indent) {
  var s = "";
  for (var i = 0; i < level * indent; i++) s += " ";
  return s;
}

function stringify(obj, indent, level) {
  var output = "";
  var p = pad(level, indent);

  if (obj instanceof Array) {
    output += "[\n";
    for (var i = 0; i < obj.length; i++) {
      output += pad(level + 1, indent) + stringify(obj[i], indent, level + 1);
      if (i < obj.length - 1) output += ",";
      output += "\n";
    }
    output += p + "]";
  } else if (typeof obj === "object") {
    output += "{\n";
    var keys = [];
    for (var key in obj) keys.push(key);
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      output += pad(level + 1, indent) + "\"" + escapeString(k) + "\": " + stringify(obj[k], indent, level + 1);
      if (j < keys.length - 1) output += ",";
      output += "\n";
    }
    output += p + "}";
  } else if (typeof obj === "string") {
    output += "\"" + escapeString(obj) + "\"";
  } else {
    output += obj;
  }

  return output;
}

function processLayers(layers, resultArray, groupName) {
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];

    if (!layer.visible) continue;

    if (layer.typename === "ArtLayer") {
      var bounds = layer.bounds;
      var x = bounds[0].as("px");
      var y = bounds[1].as("px");
      var w = bounds[2].as("px") - x;
      var h = bounds[3].as("px") - y;

      var type = "other";
      var textContent = "";
      var font = "";

      if (layer.kind === LayerKind.TEXT) {
        type = "text";
        try {
          textContent = layer.textItem.contents;
          font = layer.textItem.font;
        } catch (e) {}
      } else if (layer.kind === LayerKind.NORMAL) {
        type = "image";
      } else {
        type = "shape";
      }

      var obj = {
        id: layer.name,
        type: type,
        group: groupName,
        position: { x: Math.round(x), y: Math.round(y) },
        size: { width: Math.round(w), height: Math.round(h) },
        opacity: Math.round(layer.opacity),
        interactive: (type !== "image" && type !== "other"),
        action: ""
      };

      if (type === "text") {
        obj["text"] = textContent;
        obj["font"] = font;
      }

      resultArray.push(obj);

    } else if (layer.typename === "LayerSet") {
      var subgroup = layer.name;
      processLayers(layer.layers, resultArray, subgroup); // recursive
    }
  }
}

function exportToJson() {
  if (!app.documents.length) {
    alert("No document is open.");
    return;
  }

  var doc = app.activeDocument;
  var result = [];

  processLayers(doc.layers, result, "root");

  if (result.length === 0) {
    alert("No visible layers to export.");
    return;
  }

  var file = File.saveDialog("Save JSON file", "*.json");
  if (file) {
    file.open("w");
    file.write(stringify({ elements: result }, 2, 0));
    file.close();
    alert(" Exported " + result.length + " UI elements to JSON.");
  }
}

exportToJson();
