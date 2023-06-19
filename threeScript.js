import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gLoader = new GLTFLoader();
const textLoader = new THREE.TextureLoader();

function addScreen(filename, device, index){
    const texture = textLoader.load("./images/"+ filename);
    texture.flipY = false;
    device.children[index].material.map = texture;
    device.children[index].material.emissiveMap = texture;
    device.children[index].material.emissive = new THREE.Color("0xff0000");
}

const galleryCanvas = document.getElementById("galleryCanvas");
const galleryRenderer= new THREE.WebGLRenderer({antialias: true,canvas:galleryCanvas});

const gallScene = new THREE.Scene();
gallScene.background = new THREE.Color(0x9A144E);
const gallCamera = new THREE.PerspectiveCamera( 35, galleryCanvas.clientWidth/galleryCanvas.clientHeight, 0.1, 1000 );

const directionalLightG = new THREE.DirectionalLight(0xeeccff, 1);
gallScene.add(directionalLightG);
directionalLightG.position.x = -1;

const galSpotlight = new THREE.PointLight(0xddddff);
gallScene.add(galSpotlight);
galSpotlight.position.set(1,-0.5,-0.5);

const galleryControls = new OrbitControls(gallCamera,galleryRenderer.domElement);
galleryControls.autoRotate = true;
galleryControls.autoRotateSpeed = 1.2;

gLoader.load("./images/gltfs/iphone.gltf",function(gltf){
    const phone = gltf.scene;
    gallScene.add(phone);
    phone.rotation.x = Math.PI/8;
    phone.rotation.z = Math.PI/10;
    phone.position.set(-2,-0.5,0);
    addScreen("mobile/galleryMobile.jpg", phone, 0);
});

gLoader.load("./images/gltfs/laptop.gltf",function(gltf){
    const laptop = gltf.scene;
    gallScene.add(laptop);
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/2;
    laptop.position.set(1.5,-1.5,-3.5);
    addScreen("laptopScreens/gallery.jpg", laptop, 9);
});

gallCamera.position.z = 8;

/************* Scene 2 *************/

const resumeCanvas = document.getElementById("resumeCanvas");
const renderer= new THREE.WebGLRenderer({antialias: true,canvas:resumeCanvas});

const resScene = new THREE.Scene();
resScene.background = new THREE.Color(0x9A144E);
const camera = new THREE.PerspectiveCamera( 35, resumeCanvas.clientWidth/resumeCanvas.clientHeight, 0.1, 1000 );

const light = new THREE.PointLight( 0xddddff, 1,75 );
light.position.set( 0,0,-10 );
resScene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xeeccff, 1 );
resScene.add( directionalLight );
directionalLight.position.set(0,1,2);

const controls = new OrbitControls(camera,renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = -1;

gLoader.load("./images/gltfs/iphone.gltf",function(gltf){
    const phone = gltf.scene;
    resScene.add(phone);
    phone.rotation.x = Math.PI/2;
    phone.position.x=-2.5;
    addScreen("mobile/resMobile.jpg",phone,0);
});

gLoader.load("./images/gltfs/laptop.gltf",function(gltf){
    const laptop = gltf.scene;
    resScene.add(laptop);
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/4.5;
    laptop.rotation.x = Math.PI/35;
    laptop.rotation.z = Math.PI/40;
    laptop.position.set(2,-1.5,-3);
    addScreen("laptopScreens/res.png",laptop,9);
});

camera.position.z = 8;

/***************** Scene 3 ******************/
const tdCanvas = document.getElementById("tdCanvas");
const tdRenderer= new THREE.WebGLRenderer({antialias: true,canvas:tdCanvas});

const tdScene = new THREE.Scene();
tdScene.background = new THREE.Color(0x9A144E);

const camera2 = new THREE.PerspectiveCamera( 40, tdCanvas.clientWidth/tdCanvas.clientHeight, 0.1, 1000 );
camera2.position.z = 8;

const pointLight = new THREE.PointLight( 0xddddff );
pointLight.position.set( 4,2,-6 );
tdScene.add( pointLight );

const light2 = new THREE.PointLight( 0xddddff );
light2.position.set( 5,-1,0 );
tdScene.add( light2 );

const directionalLight2 = new THREE.DirectionalLight( 0xeeccff, 1 );
tdScene.add( directionalLight2 );
directionalLight2.position.set(1.5,1.5,1);

gLoader.load("./images/gltfs/iphone.gltf",function(gltf){
    const phone = gltf.scene;
    tdScene.add(phone);
    phone.rotation.x = Math.PI/1.25;
    phone.rotation.y = Math.PI/8;
    phone.rotation.z = Math.PI/-15;
    phone.position.set(4.5,0,-1);
    addScreen("mobile/tdMobile.jpg",phone,0);
});

gLoader.load("./images/gltfs/laptop.gltf",function(gltf){
    const laptop = gltf.scene;
    tdScene.add(laptop);
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/2.25;
    laptop.rotation.x = -Math.PI/10;
    laptop.rotation.z = -Math.PI/15;
    laptop.position.set(-1,-1.5,0);
    addScreen("laptopScreens/td.jpg",laptop,9);
});

const controls2 = new OrbitControls(camera2,tdRenderer.domElement);
controls2.autoRotate = true;
controls2.autoRotateSpeed = 0.75;


/***************** Scene 4 *****************/
const macsCanvas = document.getElementById("macsCanvas");
const macsRenderer= new THREE.WebGLRenderer({antialias: true,canvas:macsCanvas});

const macsScene = new THREE.Scene();
macsScene.background = new THREE.Color(0x9A144E);

const camera3 = new THREE.PerspectiveCamera( 40, macsCanvas.clientWidth/macsCanvas.clientHeight, 0.1, 1000 );
camera3.position.z = 8;
camera3.position.y = 4;

const light3 = new THREE.PointLight( 0xddddff, 0.75);
light3.position.set( -2,0,-4 );
macsScene.add( light3 );

const directionalLight3 = new THREE.DirectionalLight( 0xeeccff, 1 );
macsScene.add( directionalLight3 );
directionalLight3.position.set(0.5,0.5,2);

gLoader.load("./images/gltfs/iphone.gltf",function(gltf){
    const phone = gltf.scene;
    macsScene.add(phone);
    phone.rotation.x = Math.PI/2;
    phone.rotation.z = -Math.PI/4;
    phone.position.x=-2.5;
    addScreen("mobile/macsMobile.jpg",phone,0);
});

gLoader.load("./images/gltfs/laptop.gltf",function(gltf){
    const laptop = gltf.scene;
    macsScene.add(laptop);
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/1.25;
    laptop.position.set(2,-2,-2.5);
    addScreen("laptopScreens/macs.jpg",laptop,9);
});

const controls3 = new OrbitControls(camera3,macsRenderer.domElement);
controls3.autoRotate = true;
controls3.autoRotateSpeed = -1.25;


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
    const canvas = galleryRenderer.domElement;

    gallCamera.aspect = canvas.clientWidth / canvas.clientHeight;
    gallCamera.updateProjectionMatrix();

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    camera2.aspect = canvas.clientWidth / canvas.clientHeight;
    camera2.updateProjectionMatrix();

    camera3.aspect = canvas.clientWidth / canvas.clientHeight;
    camera3.updateProjectionMatrix();
        
    if (resizeRendererToDisplaySize(galleryRenderer)) {
        gallCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        gallCamera.updateProjectionMatrix();
    }

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    if (resizeRendererToDisplaySize(tdRenderer)) {
        camera2.aspect = canvas.clientWidth / canvas.clientHeight;
        camera2.updateProjectionMatrix();
    }

    if (resizeRendererToDisplaySize(macsRenderer)) {
        camera3.aspect = canvas.clientWidth / canvas.clientHeight;
        camera3.updateProjectionMatrix();
    }

	galleryRenderer.render( gallScene, gallCamera );
	renderer.render( resScene, camera );
    tdRenderer.render(tdScene,camera2);
    macsRenderer.render(macsScene,camera3);

    galleryControls.update();
    controls.update();
    controls2.update();
    controls3.update();
	requestAnimationFrame( animate );
}
requestAnimationFrame( animate );


const canvasClickListener = (event) => {
    var div = event.currentTarget;
    var description= div.nextElementSibling;
    description.classList.remove("anim2");
    description.classList.add("anim");
    setTimeout(()=> {description.classList.add("top")},600);
}

galleryControls.touches = {};
controls.touches = {};
controls2.touches = {};
controls3.touches = {};

galleryControls.domElement.style.touchAction = 'auto';
controls.domElement.style.touchAction = 'auto';
controls2.domElement.style.touchAction = 'auto';
controls3.domElement.style.touchAction = 'auto';

window.onload= sizing;
window.onresize = sizing;

function sizing(){
    var canvases = document.getElementsByClassName("canvasHolder");
    if(window.matchMedia("(min-width:770px)").matches){
        galleryControls.enabled = true;
        controls.enabled = true;
        controls2.enabled = true;
        controls3.enabled = true;
        for(var i=0; i< canvases.length; i++){
            canvases[i].removeEventListener("click",canvasClickListener);
        }
    }else{
        galleryControls.enabled = false;
        controls.enabled = false;
        controls2.enabled = false;
        controls3.enabled = false;
        for(var i=0; i< canvases.length; i++){
            canvases[i].addEventListener("click",canvasClickListener);
        }
    }
}