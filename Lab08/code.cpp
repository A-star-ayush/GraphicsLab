#include <iostream>
#include <cstdlib>
#include <unistd.h>
#include <GL/glew.h>
#include <GL/glut.h>
#include <math.h>

// sample programs that spins a cube [uses double buffering for smooth animation]
// To use the program without double buffering (call glFlush instead of glutSwapBuffers and removing glutInitDisplayMode)
// also try out glOrtho instead of gluPerspective

using namespace std;

GLfloat angleX = 0.0, angleY=0.0, angleZ=0.0, eyeZ=5.0;

void initCamera(){
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(0.0,0.0,eyeZ, 0.0,0.0,0.0, 0.0,1.0,0.0);
}  // initializing the model view transformation

void keyPress(unsigned char code, int x, int y){ if(code==27) exit(0); }

void mouseMove(int x, int y){
	static int xold, yold;
	angleX += x - xold;
	angleY += y - yold;
	xold = x;
	yold = y;
	glutPostRedisplay();
}

void mouseEvent(int button, int state, int x, int y){
	if(state == GLUT_DOWN){
		switch(button){
			case GLUT_LEFT_BUTTON: ++eyeZ; break;
			case GLUT_RIGHT_BUTTON: --eyeZ; break;
			default: eyeZ=5.0;
		}
		glutPostRedisplay();
	}
}

void display(){
	glClear(GL_COLOR_BUFFER_BIT);
	glLoadIdentity();
	gluLookAt(0.0,0.0,eyeZ, 0.0, 0.0, 0.0, 0.0,1.0,0.0);

	glRotatef(angleX, 1, 0, 0);  // rotation by angle about x axis
	glRotatef(angleY, 0, 1, 0);  // rotation by angle about y axis
	glutWireSphere(2.0,100,100);
	glFlush();
}

void reshape(int width, int height){
	glViewport(0,0,(GLsizei)width, (GLsizei)height);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(60, (GLfloat)width / (GLfloat)height, 0.0, 100);
	glMatrixMode(GL_MODELVIEW);
}

int main(int argc, char *argv[])
{
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_RGBA);
	glutInitWindowSize(900,900);
	glutInitWindowPosition((glutGet(GLUT_SCREEN_WIDTH)-640)/2, (glutGet(GLUT_SCREEN_HEIGHT)-480)/2);
	glutCreateWindow("Wire Sphere");
	glewInit();
	initCamera();
	glutDisplayFunc(display);
	glutReshapeFunc(reshape);
	glutKeyboardFunc(keyPress);
	glutPassiveMotionFunc(mouseMove);
	glutMouseFunc(mouseEvent);
	glutMainLoop();

	return 0;
}
