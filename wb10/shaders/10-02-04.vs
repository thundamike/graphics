/*
 * Simple vertex shader
 *
 * In this example  we pass the texture coordinate that comes in as an
 * attribute (declared by THREE) as an output (varying)
 */

attribute float dim;

 // declare the varying variable that gets passed to the fragment shader
 varying vec2 v_uv;
 varying float v_dim;

void main() {
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    // pass the texture coordinate as well
    v_uv = uv;

    // pass the extra attribute
    v_dim = dim;
}