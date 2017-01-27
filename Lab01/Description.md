## Drawing the Sierpinski Triangle

This exercise covers some basic drawing of lines, strokes, and fills.

HTML5 **canvas** element is used to obtain the drawing space. The context is 2D. User input is obtained through the form element and the relevant data is parsed in the main.js file. Most of the code is self-explainatory and comments have been used to make it lucid.

The Sierpinski Trianlge is a **fractal** - a self-imitating structure (although some would argue that definition). The overall shape is of an equilateral triangle, subdivided recursively into smaller equilateral triangles. **Recursion** has been used in the code to replicate this geometrical imitation.

The canvas provides us with **raster** based graphics. Functions like .beginPath(), .moveTo(), .lineTo() take care of individual pixel values and draw the requested shape for us.