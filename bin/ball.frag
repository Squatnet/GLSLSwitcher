#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) 
{
	gl_FragColor = vec4( 0.0, -mod( gl_FragCoord.y + time, cos( gl_FragCoord.x )+.004 ), 0.0, 1.0 );
}