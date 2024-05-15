/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_world_position;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

uniform sampler2D tex;
uniform sampler2D cmap;

const vec3 lightDirWorld = vec3(1,0,1);

void main()
{
    vec3 nhat = normalize(l_normal);
    vec3 lightDir = normalize(vec4(lightDirWorld, 0)).xyz;
    float light = clamp(dot(nhat, lightDir), 0.0, 1.0);

    gl_FragColor = light*texture2D(tex, v_uv);
}

