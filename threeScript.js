import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


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

const gLoader = new GLTFLoader();

gLoader.load("./images/gltfs/resPhone.gltf",function(gltf){
    resScene.add(gltf.scene);
    const phone = gltf.scene;
    phone.rotation.x = Math.PI/2;
    phone.position.x=-2.5;
});

gLoader.load("./images/gltfs/resLaptop.gltf",function(gltf){
    resScene.add(gltf.scene);
    const laptop = gltf.scene;
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/4.5;
    laptop.rotation.x = Math.PI/35;
    laptop.rotation.z = Math.PI/40;
    laptop.position.set(2,-1.5,-3);
});

camera.position.z = 8;

/***************** Scene 2 ******************/
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

gLoader.load("./images/gltfs/tdPhone.gltf",function(gltf){
    tdScene.add(gltf.scene);
    const phone = gltf.scene;
    phone.rotation.x = Math.PI/1.25;
    phone.rotation.y = Math.PI/8;
    phone.rotation.z = Math.PI/-15;
    phone.position.set(4.5,0,-1);
});

gLoader.load("./images/gltfs/tdLaptop.gltf",function(gltf){
    tdScene.add(gltf.scene);
    const laptop = gltf.scene;
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/2.25;
    laptop.rotation.x = -Math.PI/10;
    laptop.rotation.z = -Math.PI/15;
    laptop.position.set(-1,-1.5,0);
});

const controls2 = new OrbitControls(camera2,tdRenderer.domElement);
controls2.autoRotate = true;
controls2.autoRotateSpeed = 0.75;


/***************** Scene 3 ******************
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

gLoader.load("./images/gltfs/macsPhone.gltf",function(gltf){
    macsScene.add(gltf.scene);
    const phone = gltf.scene;
    phone.rotation.x = Math.PI/2;
    phone.rotation.z = -Math.PI/4;
    phone.position.x=-2.5;
});

gLoader.load("./images/gltfs/macsLaptop.gltf",function(gltf){
    macsScene.add(gltf.scene);
    const laptop = gltf.scene;
    laptop.scale.set(2,2,2)
    laptop.rotation.y = -Math.PI/1.25;
    laptop.position.set(2,-2,-2.5);
});

const controls3 = new OrbitControls(camera3,macsRenderer.domElement);
controls3.autoRotate = true;
controls3.autoRotateSpeed = -1.25;*/


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

    camera2.aspect = canvas.clientWidth / canvas.clientHeight;
    camera2.updateProjectionMatrix();

    // camera3.aspect = canvas.clientWidth / canvas.clientHeight;
    // camera3.updateProjectionMatrix();
        
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    if (resizeRendererToDisplaySize(tdRenderer)) {
        camera2.aspect = canvas.clientWidth / canvas.clientHeight;
        camera2.updateProjectionMatrix();
    }

    // if (resizeRendererToDisplaySize(macsRenderer)) {
    //     camera3.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera3.updateProjectionMatrix();
    // }

	renderer.render( resScene, camera );
    tdRenderer.render(tdScene,camera2);
    //macsRenderer.render(macsScene,camera3);
    controls.update();
    controls2.update();
    //controls3.update();
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

controls.enabled = false;
controls2.enabled = false;
//controls3.enabled = false;
controls.domElement.style.touchAction = 'auto';
controls2.domElement.style.touchAction = 'auto';
//controls3.domElement.style.touchAction = 'auto';

window.onload= sizing;
window.onresize = sizing;

function sizing(){
    var canvases = document.getElementsByClassName("canvasHolder");
    if(window.matchMedia("(min-width:770px)").matches){
        console.log(window.matchMedia("(min-width:900px)"))
        controls.enabled = true;
        controls2.enabled = true;
        //controls3.enabled = true;
        document.body.style.backgroundImage = "linear-gradient(to right,#141414,#ff0000)";
        for(var i=0; i< canvases.length; i++){
            canvases[i].removeEventListener("click",canvasClickListener);
        }
    }else{
        console.log(window.matchMedia("(min-width:900px)")+ " small")
        controls.enabled = false;
        controls2.enabled = false;
        //controls3.enabled = false;
        document.body.style.backgroundImage = "linear-gradient(to right,#141414,#00ff00)";
        for(var i=0; i< canvases.length; i++){
            canvases[i].addEventListener("click",canvasClickListener);
        }
    }
}
