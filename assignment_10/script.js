import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { create } from "./world.js";

const scene = create(); // from world.js
const clock = new THREE.Clock();
const windSlider = document.getElementById("wind"); 
const blades = [];

let rotor = null;
let currentSpeed = 0;   // rad/s

// load the GLTF model and add it to the scene
new GLTFLoader().load(
    "blender_object.glb",
    function (gltf) {
        const model = gltf.scene; 

        // enable shadows for all meshes in the model
        model.traverse((node) => {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        rotor = model.getObjectByName("Rotor");

        // store the blades and their base quaternions
        ["Blade1", "Blade2", "Blade3"].forEach((name) => {
            const obj = model.getObjectByName(name);
            blades.push({ obj, baseQuat: obj.quaternion.clone() });
        });

        scene.add(model);
    },
    
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
        console.error("An error happened", error);
    }
);

// Animate the rotor based on the wind slider value
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  if (!rotor) return;

  // smoothly calculate the current speed towards the target speed
  const targetSpeed = parseFloat(windSlider.value) * 0.6; // rad/s
  currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, dt * 1.5); 

  // rotate the rotor based on the current speed
  rotor.rotation.z -= currentSpeed * dt;  
}
animate();