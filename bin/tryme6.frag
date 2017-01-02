// Tenjix

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform float time;
uniform vec2 resolution;

const float position = 0.;
const float scale = .7;
const float intensity = 8.;
uniform sampler2D backbuffer;

float band(vec2 pos, float amplitude, float frequency) {
	float wave = scale * amplitude * sin(2.0 * PI * frequency * pos.x + time) / 2.05;
	float light = clamp(amplitude * frequency * 0.002, 0.001 + 0.001 / scale, 0.5) * scale / abs(wave - pos.y);
	return light;
}

void main( void ) {

	vec3 color = vec3(.3,.6,.9);
	color = color == vec3(0.0)? vec3(0.5, 0.5, 1.0) : color;
	vec2 pos = (gl_FragCoord.xy / resolution.xy);
	pos.y += - 0.5 - position;
	
	const float N = 100.;
	//pos = floor(pos*N)/N;
	
	
	// +pk
	float spectrum = 0.005;
	const float lim = 2e2;
	for(float i = 0.; i <= 1.; i+=1./lim){
		spectrum += band(pos, cos(i*3.)/(1.+pow(pos.x-.5, 2.)*8.), 30.*(pos.x-1.)*(i-sqrt(i)))/sqrt(lim);
	}
	
	gl_FragColor = vec4(color * spectrum, spectrum);
	gl_FragColor += (vec4(0.0, 0.1, 0.05, 1.0) * mod(gl_FragCoord.y, 2.));
	#define t2(D) texture2D(backbuffer, (gl_FragCoord.xy+D)/resolution)-1./256.
	#define t3(D) ((t2(D+vec2(1,1))+t2(D+vec2(-1,1))+t2(D+vec2(-1,1))+t2(D+vec2(-1,-1)))/4.)
	gl_FragColor = max(gl_FragColor, t3(-vec2(1.*sign(pos.x-.2),1.)));
	
	
}