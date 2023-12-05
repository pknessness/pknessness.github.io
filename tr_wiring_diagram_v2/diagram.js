var diagramJSONText = "";

fetch("heroRef.json")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
    diagramJSONText = text.replace('"',"'");
    //console.log(text)
   })
  .catch((e) => console.error(e));


function init() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;

    // Colors are predefined to allow easy manipulation of themes
    const colors = {
        red: "#ff3333",
        blue: "#3358ff",
        green: "#25ad23",
        magenta: "#d533ff",
        purple: "#7d33ff",
        orange: "#ff6233",
        brown: "#8e571e",
        white: "#ffffff",
        black: "#000000",
        beige: "#fffcd5",
        extralightblue: "#d5ebff",
        extralightred: "#f2dfe0",
        lightblue: "#a5d2fa",
        lightgray: "#cccccc",
        lightgreen: "#b3e6b3", 
        lightred: "#fcbbbd",
    }

    myDiagram =
        new go.Diagram("myDiagramDiv",
        {
            padding: 20,  // extra space when scrolled all the way
            grid: $(go.Panel, "Grid",  // a simple 10x10 grid
            $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 })
            ),
            "draggingTool.isGridSnapEnabled": false,
            handlesDragDropForTopLevelParts: false,
            mouseDrop: e => {
            // when the selection is dropped in the diagram's background,
            // make sure the selected Parts no longer belong to any Group
            var ok = e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true);
            if (!ok) e.diagram.currentTool.doCancel();
            },
            commandHandler: $(DrawCommandHandler),  // support offset copy-and-paste
            "PartCreated": e => {
            var node = e.subject;  // the newly inserted Node -- now need to snap its location to the grid
            node.location = node.location.copy().snapToGridPoint(e.diagram.grid.gridOrigin, e.diagram.grid.gridCellSize);
            setTimeout(() => {  // and have the user start editing its text
                e.diagram.commandHandler.editTextBlock();
            }, 20);
            },
            "commandHandler.archetypeGroupData": { isGroup: true, text: "NEW GROUP" },
            "SelectionGrouped": e => {
            var group = e.subject;
            setTimeout(() => {  // and have the user start editing its text
                e.diagram.commandHandler.editTextBlock();
            })
            },
            "LinkRelinked": e => {
            // re-spread the connections of other links connected with both old and new nodes
            var oldnode = e.parameter.part;
            oldnode.invalidateConnectedLinks();
            var link = e.subject;
            if (e.diagram.toolManager.linkingTool.isForwards) {
                link.toNode.invalidateConnectedLinks();
            } else {
                link.fromNode.invalidateConnectedLinks();
            }
            },
            "undoManager.isEnabled": true,
            "allowDragOut": false,
            "allowResize": false,
            "allowMove": false,
            "allowReshape": false,
            "allowInsert": false,
            "allowDelete": false,
            "allowGroup": false,
            "allowTextEdit": false,
            "allowRelink": false
        });


    // Node template

    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        {
            locationSpot: go.Spot.Center, locationObjectName: "SHAPE",
            desiredSize: new go.Size(120, 60), minSize: new go.Size(40, 40),
            resizable: true, resizeCellSize: new go.Size(20, 20)
        },
        // these Bindings are TwoWay because the DraggingTool and ResizingTool modify the target properties
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Shape,
            { // the border
            name: "SHAPE", fill: colors.white, cursor: "pointer",
            portId: "",
            fromLinkable: true, toLinkable: true,
            fromLinkableDuplicates: true, toLinkableDuplicates: true,
            fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides
            },
            new go.Binding("figure"),
            new go.Binding("fill"),
            new go.Binding("stroke", "color"),
            new go.Binding("strokeWidth", "thickness"),
            new go.Binding("strokeDashArray", "dash")),
        // this Shape prevents mouse events from reaching the middle of the port
        $(go.Shape, { width: 100, height: 40, strokeWidth: 0, fill: "transparent"}),
        $(go.TextBlock,
            { margin: 1, textAlign: "center", overflow: go.TextBlock.OverflowEllipsis, editable: true },
            // this Binding is TwoWay due to the user editing the text with the TextEditingTool
            new go.Binding("text").makeTwoWay(),
            new go.Binding("stroke", "color")),
        );

    myDiagram.nodeTemplate.toolTip =
        $("ToolTip",  // show some detailed information
        $(go.Panel, "Vertical",
            { maxSize: new go.Size(200, NaN) },  // limit width but not height
            $(go.TextBlock,
            { font: "bold 10pt sans-serif", textAlign: "center" },
            new go.Binding("text")),
            $(go.TextBlock,
            { font: "10pt sans-serif", textAlign: "center" },
            new go.Binding("text", "details"))
        )
        );

    // Node selection adornment
    // Include four large triangular buttons so that the user can easily make a copy
    // of the node, move it to be in that direction relative to the original node,
    // and add a link to the new node.

    // function makeArrowButton(spot, fig) {
    //     var maker = (e, shape) => {
    //         e.handled = true;
    //         e.diagram.model.commit(m => {
    //         var selnode = shape.part.adornedPart;
    //         // create a new node in the direction of the spot
    //         var p = new go.Point().setRectSpot(selnode.actualBounds, spot);
    //         p.subtract(selnode.location);
    //         p.scale(2, 2);
    //         p.x += Math.sign(p.x) * 30;
    //         p.y += Math.sign(p.y) * 30;
    //         p.add(selnode.location);
    //         p.snapToGridPoint(e.diagram.grid.gridOrigin, e.diagram.grid.gridCellSize);
    //         // make the new node a copy of the selected node
    //         var nodedata = m.copyNodeData(selnode.data);
    //         // add to same group as selected node
    //         m.setGroupKeyForNodeData(nodedata, m.getGroupKeyForNodeData(selnode.data));
    //         m.addNodeData(nodedata);  // add to model
    //         // create a link from the selected node to the new node
    //         var linkdata = { from: selnode.key, to: m.getKeyForNodeData(nodedata) };
    //         m.addLinkData(linkdata);  // add to model
    //         // move the new node to the computed location, select it, and start to edit it
    //         var newnode = e.diagram.findNodeForData(nodedata);
    //         newnode.location = p;
    //         e.diagram.select(newnode);
    //         setTimeout(() => {
    //             e.diagram.commandHandler.editTextBlock();
    //         }, 20);
    //         });
    //     };
    //     return $(go.Shape,
    //     {
    //         figure: fig,
    //         alignment: spot, alignmentFocus: spot.opposite(),
    //         width: (spot.equals(go.Spot.Top) || spot.equals(go.Spot.Bottom)) ? 25 : 18,
    //         height: (spot.equals(go.Spot.Top) || spot.equals(go.Spot.Bottom)) ? 18 : 25,
    //         fill: "orange", stroke: colors.white, strokeWidth: 4,
    //         mouseEnter: (e, shape) => shape.fill = "dodgerblue",
    //         mouseLeave: (e, shape) => shape.fill = "orange",
    //         isActionable: true,  // needed because it's in an Adornment
    //         click: maker, contextClick: maker
    //     });
    // }

    // create a button that brings up the context menu
    function CMButton(options) {
        return $(go.Shape,
            {
            fill: "orange", stroke: "rgba(0, 0, 0, 0)", strokeWidth: 15, background: "transparent",
            geometryString: "F1 M0 0 b 0 360 -4 0 4 z M10 0 b 0 360 -4 0 4 z M20 0 b 0 360 -4 0 4",// M10 0 A2 2 0 1 0 14 10 M20 0 A2 2 0 1 0 24 10,
            isActionable: true, cursor: "context-menu",
            mouseEnter: (e, shape) => shape.fill = "dodgerblue",
            mouseLeave: (e, shape) => shape.fill = "orange",
            click: (e, shape) => {
            e.diagram.commandHandler.showContextMenu(shape.part.adornedPart);
            }
        },
        options || {});
    }

    myDiagram.nodeTemplate.selectionAdornmentTemplate =
        $(go.Adornment, "Spot",
        $(go.Placeholder, { padding: 10 }),
        // makeArrowButton(go.Spot.Top, "TriangleUp"),
        // makeArrowButton(go.Spot.Left, "TriangleLeft"),
        // makeArrowButton(go.Spot.Right, "TriangleRight"),
        // makeArrowButton(go.Spot.Bottom, "TriangleDown"),
        // CMButton({ alignment: new go.Spot(0.75, 0) })
        );

    // Common context menu button definitions

    // All buttons in context menu work on both click and contextClick,
    // in case the user context-clicks on the button.
    // All buttons modify the node data, not the Node, so the Bindings need not be TwoWay.

    // A button-defining helper function that returns a click event handler.
    // PROPNAME is the name of the data property that should be set to the given VALUE.
    // function ClickFunction(propname, value) {
    //     return (e, obj) => {
    //         e.handled = true;  // don't let the click bubble up
    //         e.diagram.model.commit(m => {
    //         m.set(obj.part.adornedPart.data, propname, value);
    //         });
    //     };
    // }

    // Create a context menu button for setting a data property with a color value.
    // function ColorButton(color, propname) {
    //     if (!propname) propname = "color";
    //     return $(go.Shape,
    //     {
    //         width: 16, height: 16, stroke: "lightgray", fill: color,
    //         margin: 1, background: "transparent",
    //         mouseEnter: (e, shape) => shape.stroke = "dodgerblue",
    //         mouseLeave: (e, shape) => shape.stroke = "lightgray",
    //         click: ClickFunction(propname, color), contextClick: ClickFunction(propname, color)
    //     });
    // }

    // function LightFillButtons() {  // used by multiple context menus
    //     return [
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ColorButton(colors.white, "fill"), ColorButton(colors.beige, "fill"), ColorButton(colors.extralightblue, "fill"), ColorButton(colors.extralightred, "fill")
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ColorButton(colors.lightgray, "fill"), ColorButton(colors.lightgreen, "fill"), ColorButton(colors.lightblue, "fill"), ColorButton(colors.lightred, "fill")
    //         )
    //     )
    //     ];
    // }

    // function DarkColorButtons() {  // used by multiple context menus
    //     return [
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ColorButton(colors.black), ColorButton(colors.green), ColorButton(colors.blue), ColorButton(colors.red)
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ColorButton(colors.white), ColorButton(colors.magenta), ColorButton(colors.purple), ColorButton(colors.orange)
    //         )
    //     )
    //     ];
    // }

    // Create a context menu button for setting a data property with a stroke width value.
    // function ThicknessButton(sw, propname) {
    //     if (!propname) propname = "thickness";
    //     return $(go.Shape, "LineH",
    //     {
    //         width: 16, height: 16, strokeWidth: sw,
    //         margin: 1, background: "transparent",
    //         mouseEnter: (e, shape) => shape.background = "dodgerblue",
    //         mouseLeave: (e, shape) => shape.background = "transparent",
    //         click: ClickFunction(propname, sw), contextClick: ClickFunction(propname, sw)
    //     });
    // }

    // Create a context menu button for setting a data property with a stroke dash Array value.
    // function DashButton(dash, propname) {
    //     if (!propname) propname = "dash";
    //     return $(go.Shape, "LineH",
    //     {
    //         width: 24, height: 16, strokeWidth: 2,
    //         strokeDashArray: dash,
    //         margin: 1, background: "transparent",
    //         mouseEnter: (e, shape) => shape.background = "dodgerblue",
    //         mouseLeave: (e, shape) => shape.background = "transparent",
    //         click: ClickFunction(propname, dash), contextClick: ClickFunction(propname, dash)
    //     });
    // }

    // function StrokeOptionsButtons() {  // used by multiple context menus
    //     return [
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ThicknessButton(1), ThicknessButton(2), ThicknessButton(3), ThicknessButton(4)
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         DashButton(null), DashButton([2, 4]), DashButton([4, 4])
    //         )
    //     )
    //     ];
    // }

    // Node context menu

    function FigureButton(fig, propname) {
        if (!propname) propname = "figure";
        return $(go.Shape,
        {
            // width: 32, height: 32, scale: 0.5, fill: "lightgray", figure: fig,
            // margin: 1, background: "transparent",
            // mouseEnter: (e, shape) => shape.fill = "dodgerblue",
            // mouseLeave: (e, shape) => shape.fill = "lightgray",
            // click: ClickFunction(propname, fig), contextClick: ClickFunction(propname, fig)
        });
    }

    // myDiagram.nodeTemplate.contextMenu =
    //     $("ContextMenu",
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         FigureButton("Rectangle"), FigureButton("RoundedRectangle"), FigureButton("Ellipse"), FigureButton("Diamond")
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         FigureButton("Parallelogram2"), FigureButton("ManualOperation"), FigureButton("Procedure"), FigureButton("Cylinder1")
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         FigureButton("Terminator"), FigureButton("CreateRequest"), FigureButton("Document"), FigureButton("TriangleDown")
    //         )
    //     ),
    //     LightFillButtons(),
    //     DarkColorButtons(),
    //     StrokeOptionsButtons()
    //     );


    // Group template

    myDiagram.groupTemplate =
        $(go.Group, "Spot",
        {
            layerName: "Background",
            ungroupable: true,
            locationSpot: go.Spot.Center,
            selectionObjectName: "BODY",
            computesBoundsAfterDrag: true,  // allow dragging out of a Group that uses a Placeholder
            handlesDragDropForMembers: true,  // don't need to define handlers on Nodes and Links
            mouseDrop: (e, grp) => {  // add dropped nodes as members of the group
            var ok = grp.addMembers(grp.diagram.selection, true);
            if (!ok) grp.diagram.currentTool.doCancel();
            },
            avoidable: false
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Auto",
            { name: "BODY" },
            $(go.Shape,
            {
                parameter1: 10,
                fill: colors.white, strokeWidth: 2, cursor: "pointer",
                fromLinkable: true, toLinkable: true,
                fromLinkableDuplicates: true, toLinkableDuplicates: true,
                fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides
            },
            new go.Binding("fill"),
            new go.Binding("stroke", "color"),
            new go.Binding("strokeWidth", "thickness"),
            new go.Binding("strokeDashArray", "dash")),
            $(go.Placeholder,
            { background: "transparent", margin: 20 })
        ),
        $(go.TextBlock,
            {
            alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom,
            font: "bold 12pt sans-serif", editable: true
            },
            new go.Binding("text"),
            new go.Binding("stroke", "color"))
        );

    myDiagram.groupTemplate.selectionAdornmentTemplate =
        $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
            $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
            $(go.Placeholder, { margin: 1.5 })
        ),
        // CMButton({ alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomRight })
        );

    // myDiagram.groupTemplate.contextMenu =
    //     $("ContextMenu",
    //     LightFillButtons(),
    //     DarkColorButtons(),
    //     StrokeOptionsButtons()
    //     );


    // Link template

    myDiagram.linkTemplate =
        $(go.Link,
        {
            layerName: "Foreground",
            routing: go.Link.AvoidsNodes, corner: 10,
            fromShortLength: 10, toShortLength: 15,  // assume arrowhead at "to" end, need to avoid bad appearance when path is thick
            relinkableFrom: true, relinkableTo: true,
            reshapable: true, resegmentable: true
        },
        new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
        new go.Binding("toSpot", "toSpot", go.Spot.parse),
        new go.Binding("fromShortLength", "dir", dir => dir >= 1 ? 10 : 0),
        new go.Binding("toShortLength", "dir", dir => dir >= 1 ? 10 : 0),
        new go.Binding("points").makeTwoWay(),  // TwoWay due to user reshaping with LinkReshapingTool
        
        $(go.Shape, { strokeWidth: 2 },
            new go.Binding("stroke", "color"),
            new go.Binding("strokeWidth", "thickness"),
            new go.Binding("strokeDashArray", "dash")),
        $(go.Shape, // custom arrowheads to create the lifted effect
            { segmentIndex: 0, segmentOffset: new go.Point(15, 0),
            segmentOrientation: go.Link.OrientAlong,
            alignmentFocus: go.Spot.Right,
            figure: "circle", width: 10, strokeWidth: 0
            },
            new go.Binding("fill", "color"),
            new go.Binding("visible", "dir", dir => dir === 1)),
        $(go.Shape, 
            { segmentIndex: -1, segmentOffset: new go.Point(-10, 6),
            segmentOrientation: go.Link.OrientPlus90,
            alignmentFocus: go.Spot.Right,
            figure: "triangle",
            width: 12, height: 12, strokeWidth: 0
            },
            new go.Binding("fill", "color"),
            new go.Binding("visible", "dir", dir => dir >= 1),
            new go.Binding("width", "thickness", t => 7 + (3 * t)),  // custom arrowhead must scale with the size of the while
            new go.Binding("height", "thickness", t => 7 + (3 * t)), // while remaining centered on line
            new go.Binding("segmentOffset", "thickness", t => new go.Point(-15, 4 + (1.5 * t)))
        ),
        $(go.Shape, 
            { segmentIndex: 0, segmentOffset: new go.Point(15, -6),
            segmentOrientation: go.Link.OrientMinus90,
            alignmentFocus: go.Spot.Right,
            figure: "triangle",
            width: 12, height: 12, strokeWidth: 0
            },
            new go.Binding("fill", "color"),
            new go.Binding("visible", "dir", dir => dir === 2),
            new go.Binding("width", "thickness", t => 7 + (3 * t)),
            new go.Binding("height", "thickness", t => 7 + (3 * t)),
            new go.Binding("segmentOffset", "thickness", t => new go.Point(-15, 4 + (1.5 * t)))
        ),
        $(go.TextBlock,
            { alignmentFocus: new go.Spot(0, 1, -4, 0), editable: true },
            new go.Binding("text").makeTwoWay(),  // TwoWay due to user editing with TextEditingTool
            new go.Binding("stroke", "color"))
        );

    myDiagram.linkTemplate.selectionAdornmentTemplate =
        $(go.Adornment,  // use a special selection Adornment that does not obscure the link path itself
        $(go.Shape,
            { // this uses a pathPattern with a gap in it, in order to avoid drawing on top of the link path Shape
            isPanelMain: true,
            stroke: "transparent", strokeWidth: 6,
            pathPattern: makeAdornmentPathPattern(2)  // == thickness or strokeWidth
            },
            new go.Binding("pathPattern", "thickness", makeAdornmentPathPattern)),
        // CMButton({ alignmentFocus: new go.Spot(0, 0, -6, -4) })
        );

    function makeAdornmentPathPattern(w) {
        return $(go.Shape,
        {
            stroke: "dodgerblue", strokeWidth: 2, strokeCap: "square",
            geometryString: "M0 0 M4 2 H3 M4 " + (w+4).toString() + " H3"
        });
    }

    // Link context menu
    // All buttons in context menu work on both click and contextClick,
    // in case the user context-clicks on the button.
    // All buttons modify the link data, not the Link, so the Bindings need not be TwoWay.

    function ArrowButton(num) {
        var geo = "M0 0 M8 16 M0 8 L16 8  M12 11 L16 8 L12 5";
        if (num === 0) {
        geo = "M0 0 M16 16 M0 8 L16 8";
        } else if (num === 2) {
        geo = "M0 0 M16 16 M0 8 L16 8  M12 11 L16 8 L12 5  M4 11 L0 8 L4 5";
        }
        return $(go.Shape,
        {
            geometryString: geo,
            margin: 2, background: "transparent",
            mouseEnter: (e, shape) => shape.background = "dodgerblue",
            mouseLeave: (e, shape) => shape.background = "transparent",
            click: ClickFunction("dir", num), contextClick: ClickFunction("dir", num)
        });
    }

    function AllSidesButton(to) {
        var setter = (e, shape) => {
            e.handled = true;
            e.diagram.model.commit(m => {
            var link = shape.part.adornedPart;
            m.set(link.data, (to ? "toSpot" : "fromSpot"), go.Spot.stringify(go.Spot.AllSides));
            // re-spread the connections of other links connected with the node
            (to ? link.toNode : link.fromNode).invalidateConnectedLinks();
            });
        };
        return $(go.Shape,
        {
            width: 12, height: 12, fill: "transparent",
            mouseEnter: (e, shape) => shape.background = "dodgerblue",
            mouseLeave: (e, shape) => shape.background = "transparent",
            click: setter, contextClick: setter
        });
    }

    function SpotButton(spot, to) {
        var ang = 0;
        var side = go.Spot.RightSide;
        if (spot.equals(go.Spot.Top)) { ang = 270; side = go.Spot.TopSide; }
        else if (spot.equals(go.Spot.Left)) { ang = 180; side = go.Spot.LeftSide; }
        else if (spot.equals(go.Spot.Bottom)) { ang = 90; side = go.Spot.BottomSide; }
        if (!to) ang -= 180;
        var setter = (e, shape) => {
            e.handled = true;
            e.diagram.model.commit(m => {
            var link = shape.part.adornedPart;
            m.set(link.data, (to ? "toSpot" : "fromSpot"), go.Spot.stringify(side));
            // re-spread the connections of other links connected with the node
            (to ? link.toNode : link.fromNode).invalidateConnectedLinks();
            });
        };
        return $(go.Shape,
        {
            alignment: spot, alignmentFocus: spot.opposite(),
            geometryString: "M0 0 M12 12 M12 6 L1 6 L4 4 M1 6 L4 8",
            angle: ang,
            background: "transparent",
            mouseEnter: (e, shape) => shape.background = "dodgerblue",
            mouseLeave: (e, shape) => shape.background = "transparent",
            click: setter, contextClick: setter
        });
    }

    // myDiagram.linkTemplate.contextMenu =
    //     $("ContextMenu",
    //     DarkColorButtons(),
    //     StrokeOptionsButtons(),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         ArrowButton(0), ArrowButton(1), ArrowButton(2)
    //         )
    //     ),
    //     $("ContextMenuButton",
    //         $(go.Panel, "Horizontal",
    //         $(go.Panel, "Spot",
    //             AllSidesButton(false),
    //             SpotButton(go.Spot.Top, false), SpotButton(go.Spot.Left, false), SpotButton(go.Spot.Right, false), SpotButton(go.Spot.Bottom, false)
    //         ),
    //         $(go.Panel, "Spot",
    //             { margin: new go.Margin(0, 0, 0, 2) },
    //             AllSidesButton(true),
    //             SpotButton(go.Spot.Top, true), SpotButton(go.Spot.Left, true), SpotButton(go.Spot.Right, true), SpotButton(go.Spot.Bottom, true)
    //         )
    //         )
    //     )
    //     );

    load();
}

// Show the diagram's model in JSON format
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}
function load() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("default").value);
}
function loadHeroRef() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("heroRef").value);
}
function loadHeroSignal() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("heroSignal").value);
}
function loadHeroPower() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("heroPower").value);
}
function loadInfantryRef() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("infantryRef").value);
}
function loadInfantrySignal() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("infantrySignal").value);
}
function loadInfantryPower() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("infantryPower").value);
}
function loadSentryRef() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("sentryRef").value);
}
function loadSentrySignal() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("sentrySignal").value);
}
function loadSentryPower() {
    //console.log("sModel:\n"+document.getElementById("mySavedModel").value);
    //console.log("\n\nnModel:\n"+diagramJSONText);
    //document.getElementById("mySavedModel").value = diagramJSONText;
    myDiagram.model = go.Model.fromJson(document.getElementById("sentryPower").value);
}
window.addEventListener('DOMContentLoaded', init);
