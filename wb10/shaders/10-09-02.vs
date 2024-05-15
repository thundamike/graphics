/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
uniform sampler2D cmap;

varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_world_position;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
    v_uv = uv;

    // change the height of red/blue values on the sphere
    float heightR = texture2D(cmap,uv).r;    // get the red value
    float heightB = texture2D(cmap,uv).b;    // get the blue value
    vec3 pos = position + heightR*normal *1.;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    vec4 world_pos = (modelMatrix * vec4(position,1.0));
    v_world_position = world_pos.xyz;
    l_normal = (modelMatrix * vec4(normal,0)).xyz;

    v_xyz_local = position;
    v_xyz_world = (modelMatrix * vec4( position, 1.0 )).xyz;



}


