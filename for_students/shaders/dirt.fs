varying vec2 v_uv;

/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec3 snoise(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}


void main() {

    vec3 fbm = snoise(vec3(5.0*v_uv, 0.0)) + 0.5*snoise(vec3(10.0*v_uv, 2.0)) 
    +0.25*snoise(vec3(20.0*v_uv, 4.0)) +
    +0.125*snoise(vec3(40.0*v_uv, 6.0)) +
    +0.0625*snoise(vec3(80.0*v_uv, 8.0));
    gl_FragColor = vec4(vec3(0.494,0.261,0.329) + 0.1*vec3(fbm) + 0.2, 1.0);

}