/* 
    Denne koden er tatt fra lærerens eksempel på oppsett av en 3D scene med Three.js. 
    Det er kun en liten endring jeg har gjort i koden, som er å endre scene.fog fra 40 til 60. 
    Min vindmølle endte opp med å bli ganske stor, så objektet forsvant når jeg zoomet ut. 
*/

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let cvs = null;
let scene = null;
let camera = null;
let render = null;

 export function create(){
  createScene();
  addLight(scene);
  addGrid(scene);
  createCamera();
  createRender(true);
  requestAnimationFrame(renderScene);
  window.addEventListener('resize', windowResize);
  return scene;
}

function createScene(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#a0a0a0");
  scene.fog = new THREE.Fog(0xa0a0a0, 4, 60); // endret fra 40 til 60
}

function addLight(aScene){
  const illumination = 2.5;

  // soft white light
  let light = new THREE.AmbientLight( 0x404040, illumination); 
  scene.add( light );

  // Main spotlight, this light i the source for shadow cast
  light = new THREE.DirectionalLight(0xffffff, illumination);
  light.position.set(0, 4, 4);
  light.castShadow = true;
  light.shadow.camera.top = 4;
  light.shadow.camera.bottom = -2;
  light.shadow.camera.left = -4;
  light.shadow.camera.right = 4;
  light.shadow.camera.far = 20;
  light.shadow.mapSize.set(2048, 2048);
  light.shadow.radius = 6;
  light.shadowMapVisible = true;
  aScene.add(light);

  // Secondary spotlight, no shadows, only for object illumination
  light = new THREE.DirectionalLight(0xffffff, 0.7);
  light.position.set(0, 4, -4);
  aScene.add(light);
}

function addGrid(aScene){
  const plane = new THREE.PlaneGeometry(20, 20);
  const matOption = { color: "#a6a6a6", depthWrite: false };
  const mat = new THREE.MeshPhongMaterial(matOption);
  const mesh = new THREE.Mesh(plane, mat);
  mesh.position.y = 0.001; // so we're above the ground slightly
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  aScene.add(mesh);

  const grid = new THREE.GridHelper(20, 20, "#000000", "#808080");
  grid.material.opacity = 0.9;
  grid.material.transparent = true;
  aScene.add(grid);
}

function createCamera(){
  camera = new THREE.PerspectiveCamera(48, getAspectRatio(), 1, 2000);
  camera.position.set(4, 2, 4); // go back 4, up 2 and left 4
  camera.lookAt(0, 0, 0); // Camera points to scene origin. 
}

function createRender(aWidthOrbitControl = false){
  render = new THREE.WebGLRenderer(false, true, cvs);
  render.setPixelRatio(window.devicePixelRatio);
  render.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(render.domElement);
  render.shadowMap.enabled = true;

  if(aWidthOrbitControl){
    const controls = new OrbitControls(camera, render.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
  }
}

function renderScene(){
  render.render(scene, camera);
  requestAnimationFrame(renderScene);
}

function windowResize() {
  camera.aspect = getAspectRatio();
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
}

function getAspectRatio(){
  return window.innerWidth / window.innerHeight;
}
 