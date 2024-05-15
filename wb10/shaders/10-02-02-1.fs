/* simplest possible fragment shader - just a constant color */
/* but a wrinkle: we pass the color from the javascript program in a uniform */
uniform vec3 color;

// We also passed in the time as a uniform (for bonus exercise)
uniform float time;

void main()
{
    vec3 new_color = vec3(0.2);
    float newR = sin(time) / 2.0f + 0.5;
    new_color.r = newR;
    gl_FragColor = vec4(new_color,1);
}

