/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform float time;
uniform float speed;


void main()
{
    float x = v_uv.x * 10.;
    float y = v_uv.y * 10.;

    float fly = floor(y);
    float sum = fly/2. - floor( fly/2.);

    float dc = step(sum, 0.);
    if (sum == 0.) {
        gl_FragColor = vec4(sin(time*speed/10.)/2., cos(time*speed/10.), sin(time*speed/10.)/2.+0.5, 1.);
    }
    else {
        gl_FragColor = vec4(cos(time*speed/10.)/2., sin(time*speed/10.)/2., cos(time*speed/10.)/2.+0.5, 1.);
    }
}
