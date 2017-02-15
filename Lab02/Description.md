## Bresenham Line Drawing Algorithm
### [A parallel Implementation]

Bresenham algorithm was originally designed for computer control of a digital plotter. What sets is aside from others is the fact that the algorithm may be programmed without involving any significant amount of division operations (in fact no division opeartions are required for a serial implementation; a few are required for initializing the parallel paradigm).

**Extended**  
A naive implementation of the algorithm works for lines in the first octant only - (x1 > x0) && (dx > dy). By careful examination of the geometry, we came up with a general implementation for all octants. Approach: "Exploit symmetry": whenever dx <= dy, interchange the two axises, take y for x and x for y. Secondly to deal with (x1 < x0), simply change the sense of direction from moving towards positive values to moving towards negative values.

**Parallel**  
Simple DirectMedia Layer (SDL) provides us with multi-threading functionality via the SDL_Thread API. Each thread is swapned with a subset of the original line to work on. All threads are waited upon before rendering the display. The division of work is calculated based on the "level of concurrency" (a value obtained during input from user).

This is where we use a few division operations to approximate the intermediate values of y.

To run:
>pre-requisite: sdl2 library  
>compilation: gcc bresenham.c `sdl2-config --cflags --libs`  
>to run: ./a.out  (Sample Input: 100,100 200,200 2)

Most of the code is clobbered by SDL function calls. To clarify: the drawing logic resides in the "draw" function and the division of labor is monitored in the same for loop as the one in which SDL_CreateThread is called.

Check the repository for screenshots.