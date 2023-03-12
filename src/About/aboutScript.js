function main() {
    const canvas = document.getElementById("sceneContainer");
    const renderer = new THREE.WebGLRenderer({canvas});
    
    var camera = new THREE.PerspectiveCamera(50,canvas.clientWidth/canvas.clientHeight, 0.1,1000);
    camera.position.z = 10;
  
    const scene = new THREE.Scene();
    
    const color = 0xFFFFFF;
    const light = new THREE.DirectionalLight(color, 1);
    light.position.set(4,10,5);
    
    const light2 = new THREE.PointLight(color,1.2,15,1);
    light2.position.set(-10,2,-8);
    
    scene.add(light);
    scene.add(light2);
    
    const geometry = new THREE.SphereGeometry( 3, 40, 30 );
    const geometry2 = new THREE.SphereGeometry( 2, 40, 30 );
    const geometry3 = new THREE.SphereGeometry( 3, 50, 40 );
    
    const texture = new THREE.TextureLoader().load( "basketball.jpg" );
    const bump = new THREE.TextureLoader().load( "basketballNormal.jpg" );
    const scale = new THREE.Vector2(0.4,0.4);
    const material = new THREE.MeshStandardMaterial({color: 0xa24620, map:texture, normalMap:bump, normalScale:scale, roughness:0.45});
  
    const ball = new THREE.Mesh(geometry, material);
    const ball2 = new THREE.Mesh(geometry, material);
    const ball3 = new THREE.Mesh(geometry3, material);
    const ball4 = new THREE.Mesh(geometry2, material);
    
    ball.position.set(5,2,-1);
    ball2.position.set(-4,7,-20);
    ball3.position.set(1.2,-3.5,8);
    ball4.position.set(-2.5,-0.5,4);
    
    scene.add(ball);
    scene.add(ball2);
    scene.add(ball3);
    scene.add(ball4);
  
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
    
    function render() {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
      
        ball.rotation.y += -0.001;
        ball.rotation.x += 0.0001;
        
        ball2.rotation.y += -0.004;
        ball2.rotation.x += -0.0002;
        
        ball3.rotation.x += 0.00015;
        
        ball4.rotation.y += 0.0004;
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  
  }
  
  main();
  
