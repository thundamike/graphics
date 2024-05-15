/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

const vec3 lightDirWorld = vec3(1,0,1);
const vec3 baseColor = vec3(0.,.1,0.);

/**
* This program essentially combines 10-05-01a with 10-04-02b
*/
void main()
{
    vec3 nhat = normalize(l_normal);
    vec3 lightDir = normalize(vec4(lightDirWorld, 0)).xyz;
    float light = clamp(dot(nhat, lightDir), 0.0, 1.0);
    
    vec3 fragColor = vec3( abs(sin(v_xyz_local.x * 3.141)),
                        abs(sin(v_xyz_local.z * 3.141)),
                        0);

    gl_FragColor = vec4(light*fragColor,1);
}
