#ifdef GL_ES
precision mediump float;
#endif

// by RAZIK anass
// i found noise and hash fonctions in a stack overflow answer
// and i tried to modify it to get this pixel effect
// the fractional brownian motion function was written by inigo Quilez
// enjoy my pixel world radar :D ^^

uniform float time;// important for animations
uniform vec2 mouse;
uniform vec2 resolution;

// [[cos(theta),-sin(theta)]
//  [sin(theta),sin(theta)]]
// a rotation matrix mixed with the time value
// to get rotation during the animation time
mat2 rotation_mat = mat2(cos(time/2.0),-sin(time/2.0),sin(time/3.0),cos(time/7.0));

float hash(vec2 n){
	float dot_prod = n.x*7.1 + n.y*11.7;
	return fract(sin(dot_prod)*43758.9876);
}

float noise(vec2 intervale){
	vec2 i = floor(intervale);
	vec2 f = fract(intervale);
	vec2 u = f*f*(1.0-2.0*f);
	
	return mix(mix(hash(i+vec2(0.3,0.7)),
		       hash(i+vec2(1.0,.0)),u.x),
		   mix(hash(i+vec2(0.3,1.0)),
		       hash(i+vec2(1.0,0.2)),u.x),
		   u.y);
}

//fractional brownian motion function
float fbm(vec2 p){
	float f = 0.0;
	float octave = 0.2;
	float sum = 0.0;
	
	for(int i=0;i<5;i++){
		sum += octave;
		f += octave*noise(p);
		p *= 2.01;
		octave /= 2.0;
	}
	
	f /= sum;
	
	return f;
}

void main( void ) {
	vec2 pos = gl_FragCoord.xy/resolution.xy*2.0-1.0;// pixels positions
	pos.x *= resolution.x/resolution.y;
	
	float effect = fbm(1.0*pos*rotation_mat);// our fractional brownian motion effect
	vec3 color = vec3(effect*tan(3.0*time/7.0+pos.x),effect+sin(time),effect+sin(time));// preparing the color of pixels
	
	gl_FragColor = vec4(color,1);
}



