/*
 * Simple Shader
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;

// The varying is the "output" to the fragment shader
// I call it v_normal to remind myself that it is for the vertex
// the fragment shader will get interpolated values
varying vec3 l_normal;
varying vec3 v_world_position;
varying vec3 v_xyz_world;
varying vec3 v_xyz_local;

void main() {
    vec4 world_pos = (modelMatrix * vec4(position,1.0));
    v_world_position = world_pos.xyz;
    
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * viewMatrix * world_pos;
    
    // compute the normal and pass it to fragment
    // note - this is in world space, but uses a hack that
    // assumes the model matrix is its own adjoint 
    // (which is true, sometimes)
    l_normal = (modelMatrix * vec4(normal,0)).xyz;
 
    v_xyz_local = position;
    v_xyz_world = (modelMatrix * vec4( position, 1.0 )).xyz;
}

