/* a simple procedural texture: dots */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the dots */
uniform vec3 light;
uniform vec3 dark;

/* number of dots over the UV range */
uniform float dots;

/* how big are the circles */
uniform float radius;

void main()
{
    vec3 green = vec3(0.2,0.7,0.2);
    float x = v_uv.x * dots;
    float y = v_uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float dc = step(d,radius);

    if (x > 0.5*dots) {
        gl_FragColor = vec4(mix(light,green,dc), 1.);
    }
    else {
        gl_FragColor = vec4(mix(light,dark,dc), 1.);
    }
}

