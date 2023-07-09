/*	
 Colors Widget - version 2.0
 6 June, 2011
 Copyright 2004-2007, 2011 Harry Whitfield
 mailto:g6auc@arrl.net
 
 Concept suggested by the use of the Color Picker in the Offworld Time Widget
 by loki der quaeler / weltschmerz digital media labs
 
 New steampunk graphics by Dean Beedell
 */

/*global main_window, text1, swatch, badge, restartToggle, buildVitality */

/*properties altKey, bgColor, bgOpacity, color, colorize, data, 
 defaultValue, description, editable, editablePref, enableBgColorPref, 
 event, font, indexOf, length, name, opacity, option, round, size, 
 textBgColorPref, textColorPref, textFontPref, textSizePref, title, 
 toLowerCase, toUpperCase, type, upperCasePref, vOffset, value, visible
 */

// The following flags control printing in the debug console window
var eFlag = true; // show general debug information
var sFlag = false; // show applescripts
var lFlag = false; // log runCommand() and appleScript() calls

function eprint(theString) {
    if (eFlag) {
        print(theString);
    }
}

function sprint(theString) {
    if (sFlag) {
        print(theString);
    }
}

function lprint(theString) {
    if (lFlag) {
        log(theString);
    }
}

var lastColor = "#ffffff";

function checkColor(color) {
    var hex = "0123456789abcdefABCDEF",
        i;

    if (color.length !== 7) {
        return "";
    }
    if (color[0] !== "#") {
        return "";
    }
    for (i = 1; i < 7; i += 1) {
        if (hex.indexOf(color[i]) < 0) {
            return "";
        }
    }
    return color.toLowerCase();
}

function chooseHexColor(lastColor) {
    var result = "",
        formfields = [],
        formResults;

    formfields[0] = new FormField();
    formfields[0].name = "hexcolor";
    formfields[0].title = "Hex Color:";
    formfields[0].type = "text";
    formfields[0].option = [""];
    formfields[0].defaultValue = lastColor.toUpperCase();
    formfields[0].description = "Enter a new color.";

    formResults = form(formfields, "Choose a color", "Choose");
    if (formResults !== null) {
        result = checkColor(formResults[0]);
        if (result === "") {
            beep();
        }

        if (preferences.upperCasePref.value !== "0") {
            result = result.toUpperCase();
        }
    }
    delete formfields[0];
    formfields[0] = null;
    formfields = null;
    return result;
}

function mouseUp() {
    var color = lastColor;

    if (system.event.altKey) {
        color = chooseHexColor(lastColor);
    } else {
        color = chooseColor(lastColor);
        if (!color) {
            color = "";
        }
    }

    if (color !== "") {
        if (preferences.upperCasePref.value !== "0") {
            color = color.toUpperCase();
        } else {
            color = color.toLowerCase();
        }
        lastColor = color;
        text1.data = color;
        swatch.colorize = color;
        badge.opacity = 255;
        restartToggle.opacity = 255;
        swatch.opacity = 255;
        if (preferences.enableBgColorPref.value === "0") {
            text1.bgOpacity = 0;
        } else {
            text1.bgOpacity = 255;
        }
        text1.opacity = 255;

        buildVitality(color);
    }
}

function updateText() {
    var color = lastColor,
        curOpacity;

    if (preferences.upperCasePref.value !== "0") {
        color = color.toUpperCase();
    } else {
        color = color.toLowerCase();
    }

    lastColor = color;

    curOpacity = text1.opacity;

    text1.opacity = 0;
    text1.font = preferences.textFontPref.value;
    text1.size = preferences.textSizePref.value;
    text1.color = preferences.textColorPref.value;
    text1.bgColor = preferences.textBgColorPref.value;
    text1.vOffset = 48 + Math.round(0.5 * (13 - text1.size));
    text1.editable = (preferences.editablePref.value !== "0");
    text1.data = color;

    if (preferences.enableBgColorPref.value === "0") {
        text1.bgOpacity = 0;
    } else if (curOpacity !== 0) {
        text1.bgOpacity = 255;
    }

    text1.opacity = curOpacity;

    if (curOpacity !== 0) {
        buildVitality(color);
    }
}

updateText();

main_window.visible = true;
