## Screensaver
### [A simple WebGL program]

Screensaver for a website sounds like a weird idea, but then again 'why not'. It is primarily used to blank displays when the user is idle. Here, we present you with a simple screensaver which prints out multiple rectangles at random screen coordinates.

**WebGL**
WebGL is one way your browser can talk to the GPU (grpahics processing unit) and have it render canvases for you. Why webgl? Well mostly for fun and learning. The other reasons being that it doesn't consume CPU cycles so meanwhile the canvas is being rendered, your CPU is free to do other things and thus we can get a more reactive interface.

**How it works**
The two principal components of webgl are: vertex shaders & fragment shaders. Vertex shaders are responsible for drawing points and the fragement shader is there for color and texture (roughly speaking). These shaders are compiled and linked into a program. The program is then run by javascript. However, the shaders themselves are written in C/C++.

To run:
>Clone the repository to your local system  
>Double click the index.html file  
>Go full screen (Super + F on most systems), Refresh the tab (Ctrl + R on most systems)
>Enjoy!

Check the repository for a sample screenshot.