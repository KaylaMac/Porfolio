import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const can = document.getElementById("sceneHolder");
const renderer= new THREE.WebGLRenderer({antialias:true,canvas:can});

const instructions = document.getElementById("instructionsHolder");

const orbit = new OrbitControls(camera,renderer.domElement);
orbit.screenSpacePanning = false;

window.onload= function(){
	if(window.innerWidth <=770){
		instructions.style.display = "none";
	}else{
		orbit.enabled = false;
	}
}

window.onresize = function(){
	if(window.innerWidth <=770 || window.innerHeight <=750){
		instructions.style.display = "none";
		orbit.enabled = true;
	}else{
		orbit.enabled = false;
		instructions.style.display = "flex";
	}
}

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let prevTime = performance.now();

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const pointerControls = new PointerLockControls(camera,renderer.domElement);

document.addEventListener( 'click', function () {
	if(window.innerWidth > 770){
		pointerControls.lock();
	}
} );

pointerControls.addEventListener( 'lock', function () {
	instructions.style.display = 'none';
} );

pointerControls.addEventListener( 'unlock', function () {
	instructions.style.display = 'flex';
} );

const onKeyDown = function ( event ) {
	switch ( event.code ) {
		case 'ArrowUp':
		case 'KeyW':
			moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = true;
			break;
	}

};

const onKeyUp = function ( event ) {
	switch ( event.code ) {
		case 'ArrowUp':
		case 'KeyW':
			moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = false;
			break;
	}
};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

camera.position.set(-2.25,1,1.25);
camera.rotation.y = -Math.PI/10;

const spotlight2 = new THREE.SpotLight();
spotlight2.penumbra = 0.44;
spotlight2.angle = 0.75;
spotlight2.target.position.set(-1,0.75,-1.8); 
spotlight2.position.set(-1,1.5,0.09);
scene.add(spotlight2.target);
scene.add(spotlight2);

const spotlight3 = new THREE.SpotLight();
spotlight3.penumbra = 0.44;
spotlight3.angle = 0.75;
spotlight3.target.position.set(-0.4,0.75,-0.4); 
spotlight3.position.set(-2.4,1.5,-1.2);
scene.add(spotlight3.target);
scene.add(spotlight3);

const dogSpotlight = new THREE.SpotLight();
dogSpotlight.penumbra = 0.44;
dogSpotlight.angle = 0.75;
dogSpotlight.target.position.set(0.02, 1, 0.8); 
dogSpotlight.position.set(0.8,1.5,-0.4);
scene.add(dogSpotlight.target);
scene.add(dogSpotlight);

const hallSpotlight = new THREE.SpotLight();
hallSpotlight.penumbra = 0.44;
hallSpotlight.angle = 0.75;
hallSpotlight.target.position.set(-0.2,0.75,-0.2); 
hallSpotlight.position.set(3,1.5,1.4);
scene.add(hallSpotlight.target);
scene.add(hallSpotlight);

const avatarSpotlight = new THREE.SpotLight();
avatarSpotlight.penumbra = 0.44;
avatarSpotlight.angle = 0.75;
avatarSpotlight.target.position.set(2.2, 1, -1.8); 
avatarSpotlight.position.set(2.6,1.5,1);
scene.add(avatarSpotlight.target);
scene.add(avatarSpotlight);

const gLoader = new GLTFLoader();

function addMap(parts,index,htmlVid){
	const video = document.getElementById(htmlVid);
	const texture = new THREE.VideoTexture(video);
	texture.flipY = false;

	parts[index].material.map = texture;
	parts[index].material.emissive = new THREE.Color(0x444444);
	parts[index].material.emissiveMap = texture;
}

setTimeout(() => {
	gLoader.load("./gallery.gltf",function(gltf){
		let preloader = document.getElementById("preloader");
		preloader.classList.add("fade");
		setTimeout(() => {preloader.style.display= "none"}, 2500);
		const mesh = gltf.scene;
		const meshParts = mesh.children;
		scene.add(mesh);

		meshParts[0].material.map.center.set(.5, .5);
		meshParts[0].material.map.rotation = THREE.MathUtils.degToRad(-90);

		addMap(meshParts,16,"houseVid");
		addMap(meshParts,17,"pancakeVid");
		addMap(meshParts,18,"appleVid");
		addMap(meshParts,22,"mountainVid");
	});
}, 1500);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate() {
	const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

	const time = performance.now();

	if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

	if ( pointerControls.isLocked === true ) {
		const delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 30 * delta;
		velocity.z -= velocity.z * 40 * delta;

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize();

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 35 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 20 * delta;

		pointerControls.moveRight( - velocity.x * delta);
		pointerControls.moveForward( - velocity.z * delta);
	}
	prevTime = time;

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
requestAnimationFrame( animate );

