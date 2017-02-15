#include <stdio.h>
#include <stdlib.h>
#include <SDL.h>
#include <SDL_video.h>
#include <SDL_render.h>
#include <SDL_error.h>
#include <SDL_thread.h>
#include <assert.h>

#define exit_err() \
	do { fprintf(stderr, "%s\n", SDL_GetError()); exit(1); } while(0)


#define SCREEN_WIDTH 1024
#define SCREEN_HEIGHT 576
#define Ind(x, y) (y*SCREEN_WIDTH + x)

typedef struct {
	int* pix;
	int color, x0, y0, x1, y1, flag, dir1, dir2;
} data;

int draw(void* _arg){
	
	data* arg = _arg;
	int* pix  = arg->pix;
	int color = arg->color;
	int x0 = arg->x0;
	int y0 = arg->y0;
	int x1 = arg->x1;
	int y1 = arg->y1;
	int flag = arg->flag;
	int dir1 = arg->dir1;
	int dir2 = arg->dir2;
	free(_arg);

	int dx = abs(x1 - x0);
	int dy = abs(y1 - y0);
	int p = 2*dy - dx;

	int M = -flag;
	
	while(x0 != (x1+dir1)){
		int x = (y0 & M) | (x0 & ~M);
		int y = (x0 & M) | (y0 & ~M);
		pix[Ind(x,y)] = color;

		x0 = x0 + dir1;
		p = p + ((dy-(dx & -(p>=0)))<<1);   // if(p>=0) p += 2*(dy-dx) else p += 2*dy
		y0 = y0 + (dir2 & -(p>=0));
	}
	
	return 0;
}

int main(int argc, char const *argv[])
{
	SDL_SetMainReady();
	SDL_Init(SDL_INIT_VIDEO);

	int x0, y0, x1, y1, numP;
	puts("Enter point 1:");
	scanf("%d %*c %d", &x0, &y0);
	puts("Enter point 2:");
	scanf("%d %*c %d", &x1, &y1);
	puts("Level of concurrency:");
	scanf("%d",&numP);
	
	SDL_Window* win =  SDL_CreateWindow("Bresenham",SDL_WINDOWPOS_CENTERED,SDL_WINDOWPOS_CENTERED,SCREEN_WIDTH,SCREEN_HEIGHT,0);
	assert(win);
	
	SDL_Renderer* rend = SDL_CreateRenderer(win, 0, SDL_RENDERER_SOFTWARE);
	assert(rend);

	SDL_PixelFormat* pFormat = SDL_AllocFormat(SDL_PIXELFORMAT_RGBA8888);
	assert(pFormat);

	SDL_Texture* texture = SDL_CreateTexture(rend, pFormat->format, SDL_TEXTUREACCESS_STREAMING, SCREEN_WIDTH, SCREEN_HEIGHT);
	assert(texture);

	int* pix = calloc(SCREEN_WIDTH * SCREEN_HEIGHT, sizeof(int));
	assert(pix);
		
	int color = SDL_MapRGBA(pFormat, 255, 255, 255, 255);
	
	int flag = 0;
	if(abs(y1 - y0) > (x1 - x0)){
		int temp = x0; x0 = y0; y0 = temp;
		temp = x1; x1 = y1; y1 = temp;
		flag = 1;
	}

	int dir1 = 1;
	int dir2 = 1;
	
	if(x1 < x0) dir1 = -1;
	if(y1 < y0) dir2 = -1;

	int i;
	SDL_Thread* threads[numP];

	float dx = x1 - x0;
	float dy = y1 - y0;
	int y_intercept = y0 - ((dy/dx)*x0);
	int width = (dx + (numP-1))/numP;  // ceil of (x1-x0)/numP

	for(i=0;i<numP;++i){
		data* param = malloc(sizeof(data));
		param->pix = pix;
		param->color = color;
		param->x0 = x0 + (width*i);
		param->y0 = ((dy/dx)*param->x0) + y_intercept;
		param->x1 = param->x0 + width -1;
		param->y1 = ((dy/dx)*param->x1) + y_intercept;
		param->flag = flag;
		param->dir1 = dir1;
		param->dir2 = dir2;
		threads[i] = SDL_CreateThread(draw, NULL, param);
	}

	for(i=0;i<numP;++i)
		SDL_WaitThread(threads[i], NULL);
	
	if(SDL_UpdateTexture(texture, NULL, pix, SCREEN_WIDTH * sizeof (Uint32))) exit_err();
	if(SDL_RenderClear(rend)) exit_err();
	if(SDL_RenderCopy(rend, texture, NULL, NULL)) exit_err();
	SDL_RenderPresent(rend);

	SDL_Delay(10000);
	free(pix);

	SDL_DestroyTexture(texture);
	SDL_DestroyRenderer(rend);
	SDL_DestroyWindow(win);
	
	SDL_Quit();
	return 0;
}
