/* a simple procedural texture */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    // draw when (x,y) x+y is even
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = x/2. - floor(x/2.);
    float yc = y/2. - floor(y/2.);

    float flx = floor(x);
    float fly = floor(y);
    float sum = (flx + fly)/2. - floor( (flx+fly)/2. );

    float dc = step(sum, 0.);
    gl_FragColor = vec4(mix(light,dark,dc), 1.);
}

