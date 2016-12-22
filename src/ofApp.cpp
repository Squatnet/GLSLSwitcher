#include "ofApp.h"
#include <dirent.h>

void ofApp::setup() {
	int bufferSize = 256;

	ofSetVerticalSync(true);
	ofSetFrameRate(60);


	datadir = "presets";
	setupShader();
}

void ofApp::setupShader() {
	presetDir = "";
	shaderMode = "";
	prevMode = "";
	//shaderContents(shaderMode);
	listIndex = 0;
	loadShader();
}
void ofApp::loadShader() {
	ofDirectory fragContentsList(datadir);
	//populate the directory object
	fragContentsList.allowExt("frag");
	fragContentsList.listDir();

	
	if (listIndex < 0) {
		listIndex = fragContentsList.size() - 1;
	}
	else if (listIndex >(fragContentsList.size() - 1)) {
		listIndex = 0;
	}
	fragFile = fragContentsList.getPath(listIndex);

	ofFile file(fragFile);
	if (!file.exists()) {
		ofLogError("The file " + fragFile + " is missing");
		setupShader();
	}
	cout << "frag index :" << fragFile << "\n";
	shader1.load("/presets/test.vert", fragFile);
}
//--------------------------------------------------------------
void ofApp::update() {

}
void ofApp::draw() {
	ofEnableAlphaBlending();
	drawShader();

}
void ofApp::drawShader() {
	float resolution[2];
	resolution[0] = ofGetWindowWidth();
	resolution[1] = ofGetWindowHeight();

	float time = ofGetElapsedTimef();
	float mousePoint[2];
	mousePoint[0] = mouseX;
	mousePoint[1] = mouseY;

	shader1.begin();
	shader1.setUniform1f("time", time);
	shader1.setUniform2fv("resolution", resolution);
	shader1.setUniform1f("vol", smoothedVol);
	shader1.setUniform1f("vol2", smoothedVol2);
	shader1.setUniform1f("vol3", smoothedVol3);
	shader1.setUniform2fv("mouse", mousePoint);

	glEnable(GL_DEPTH_TEST);
	glBegin(GL_QUADS);
	glVertex2f(0, 0);
	glVertex2f(ofGetWidth(), 0);
	glVertex2f(ofGetWidth(), ofGetHeight());
	glVertex2f(0, ofGetHeight());
	glEnd();

	shader1.end();
}

//--------------------------------------------------------------
//--------------------------------------------------------------
void ofApp::keyPressed(int key) {
	if (key == OF_KEY_UP) {
		listIndex++;
		loadShader();
		ofSetWindowTitle(fragFile);
	}
	if (key == OF_KEY_DOWN) {
		listIndex--;
		loadShader();
		ofSetWindowTitle(fragFile);
	}
	if (key == '1') shaderMode = "Intro";
}

void ofApp::shaderContents(string s) {

	map<string, int> mapShaderType;
	mapShaderType.insert(make_pair(
		"Intro", 1
	));
	mapShaderType.insert(make_pair(
		"Amero", 2
	));
	mapShaderType.insert(make_pair(
		"Sabi1", 3
	));
	mapShaderType.insert(make_pair(
		"Sabi2", 4
	));
	mapShaderType.insert(make_pair(
		"Bmero", 5
	));
	mapShaderType.insert(make_pair(
		"End", 6
	));
	mapShaderType.insert(make_pair(
		"Test", 9
	));

	int type_id = mapShaderType[s];

	fragContentsList.clear();


}

//--------------------------------------------------------------
void ofApp::keyReleased(int key) {

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y) {

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button) {

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button) {

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button) {

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h) {

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg) {

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo) {

}
