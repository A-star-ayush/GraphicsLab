## Parametric Line Clipping
### [A parallel Implementation for a Triangular Window]

Clipping is a method to selectively enable or disable rendering operations within a defined region of interest. Our region of interest is infact a **triangle**. All the lines that are drawn on the canvas will be clipped within this window before actual rendering takes place.

**Parametric**  
While y=mx + c is a perfect way to describe a line, it is better to use (in our case) the vector equation to describe a ***line segment***. The parametric equation look like: `x = x1 + u*(x2-x1); y = y1 + u*(y2-y1)`, where 'u' is the percentage length of the vector [(x2-x1),(y2-y1)] from x1 to the point of intersection. Therefore if 0<=u<=1, the point of intersection lies on the line segment, or else it is exterior to the line segment. 

**Parallel**  
Worker object in javascript is used to parallelize the task. Four workers are created. The first three computes the intersection of the 3 edges of the traingle with the line segment drawn on the screen. The fourth one finds where both the end points of the line segment lie within the triangle.

Once all the information is accumulated, depending on the number of intersections the following decisions are made:
* 0 Intersections: If the fourth worker says the line is inside, the entire line is drawn otherwise all of it is clipped. 
* 1 Intersection: Based on the edge with which the intersection was made, one of the two endpoints from the original line stays.
* 2 Intersections: The two points of intersections now become the defining points of the line segment and the rest is clipped.

To run:
>Clone the repository to your local system  
>Double click the index.html file  
>Drag from one point on the canvas to another to draw a line
>Press Enter to clip the line  

Check the repository for screenshots.