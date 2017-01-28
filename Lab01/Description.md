## Drawing the Sierpinski Triangle

This exercise covers some basic drawing of lines, strokes, and fills.

HTML5 **canvas** element is used to obtain the drawing space. The context is 2D. User input is obtained through the form element and the relevant data is parsed in the main.js file. Most of the code is self-explainatory and comments have been used to make it lucid.

The Sierpinski Trianlge is a **fractal** - a self-imitating structure (although some would argue that definition). The overall shape is of an equilateral triangle, subdivided recursively into smaller equilateral triangles. **Recursion** has been used in the code to replicate this geometrical imitation.

The canvas provides us with **raster** based graphics. Functions like .beginPath(), .moveTo(), .lineTo() take care of individual pixel values and draw the requested shape for us.

To run:
>Clone the repository to your local system
>Double click the index.html file
>Fill the required fields in the form (Sample values: 500,500 900,100, 1300,500 6)

The main logic resides in the drawTriangle function in main.js. The last three lines recursively call the same function with the 3 smaller triangles created above: (p1,q1,q3), (q1,p2,q2), (q3,q2,p3).

Check the repository for screenshots.