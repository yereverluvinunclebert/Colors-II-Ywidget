/*properties appendChild, createDocument, createElement, dockOpen, 
    setAttribute, setDockItem
*/

function buildVitality(color) {
	var doc, v, background, swatch, colr;
	
	if (!widget.dockOpen) { return; }

	doc = XMLDOM.createDocument();
	v = doc.createElement("dock-item");
	v.setAttribute("version", "1.0");
	doc.appendChild(v);
	
	background = doc.createElement("image");
	background.setAttribute("src", "Resources/Images/colors.png");
	background.setAttribute("hOffset", 5);
	background.setAttribute("vOffset", 15);
	v.appendChild(background);
		
	swatch = doc.createElement("image");
	swatch.setAttribute("src", "Resources/Images/swatch.png");
	swatch.setAttribute("hOffset", 50);
	swatch.setAttribute("vOffset", 27);
	swatch.setAttribute("colorize", color);
	v.appendChild(swatch);

	colr = doc.createElement("text");
	colr.setAttribute("hOffset", "37");
	colr.setAttribute("vOffset", "63");
	colr.setAttribute("hAlign", "center");
	colr.setAttribute("style", "font-family: Arial;font-size: 14px; font-weight: bold; color: white;");
	colr.setAttribute("data", color);
	v.appendChild(colr);
	
	widget.setDockItem(doc, "fade");					
}
