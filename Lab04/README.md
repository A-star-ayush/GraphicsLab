## Parametric Polygon Clipping
### [Based on the parallel implementation of line clipping @ Lab03]

Polygon clipping extends the notion of line clipping. The lines constituting the polygon are clipped against our traingular window. We borrow most of the work from Lab03 and thus get parallelism without introducing any new idea.

Traditional algorithms focus on clipping convex polygons majorly. Whenever they encounter a concave polygon, they break it into a number of convex ploygons. Our implementation is unbiased, i.e., treats both types of polygons equally, namely, as a set of lines. However, this is not always ideal for efficiency.  

To run:
>Clone the repository to your local system  
>Double click the index.html file  
>Click at those points on the screen where you want the vertices to be
>Press Enter to clip the polygon  

Check the repository for screenshots.