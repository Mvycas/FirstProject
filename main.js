import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls, hemilight, spotlight; 

    
  if (WebGL.isWebGLAvailable()) {
        
    const loader = new GLTFLoader();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    hemilight = new THREE.HemisphereLight(0xffffff, 0x080820, 7);
    spotlight = new THREE.SpotLight(0xffffff, 65);
    spotlight.castShadow = true;


    renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xEEEEEE, 1);


    controls = new OrbitControls(camera, renderer.domElement); 
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    

    document.getElementById('container').appendChild(renderer.domElement);


    loader.load('./public/models/bentley/scene.gltf', function (gltf) {
        gltf.scene.scale.set(0.001, 0.001, 0.001); 

        scene.add(gltf.scene);

        scene.add(hemilight);
        scene.add(spotlight);


    }, undefined, function (error) {
        console.error(error);
    });

    camera.position.y = 1;
    camera.position.z = 7;

    animate();

  } else {
    const warning = WebGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
  }

  window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  function animate() {
  requestAnimationFrame(animate);
  spotlight.position.set(
    camera.position.x + 2,
    camera.position.y + 2,
    camera.position.z + 2,
  )
  controls.update(); 
  renderer.render(scene, camera);

}