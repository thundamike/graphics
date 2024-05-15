/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

void main()
{
    float x = v_uv.x * 10.;
    float y = v_uv.y * 10.;
    vec3 light = vec3(1.,1.,1.);
    vec3 dark1 = vec3(0.2,0.7,0.2);
    vec3 dark2 = vec3(0.7,0.2,0.2);


    float xc = x/2. - floor(x/2.);
    float yc = y/2. - floor(y/2.);

    float flx = floor(x);
    float fly = floor(y);
    float sum = flx/2. - floor( flx/2.);

    float dc = step(sum, 0.);
    if (sum == 0.) {
        gl_FragColor = vec4(mix(dark2,light,0.5), 1.);
    }
    else {
        gl_FragColor = vec4(mix(dark1,light,0.5), 1.);
    }
}
