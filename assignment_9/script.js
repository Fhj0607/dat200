import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

// create a pyramid geometry with customizable dimensions and colors
function createPyramidGeometry({ width = 2, depth = 2, height = 3, colors = {} } = {}) {
  // colors for the pyramid faces
  const c = {
    front: '#e4572e', right: '#f3a712', back: '#29a19c',
    left: '#4c6ef5', base: '#6b7280',
    ...colors
  };
  // calculate half-width and half-depth for positioning the vertices
  const hw = width / 2, hd = depth / 2;

  // define the vertex positions for the pyramid
  const A = [-hw, 0, -hd], B = [hw, 0, -hd], C = [hw, 0, hd], D = [-hw, 0, hd];
  const P = [0, height, 0];

  // define the faces of the pyramid with their vertex positions and colors
  const faces = [
    { v: [D, C, P], color: c.front },
    { v: [C, B, P], color: c.right },
    { v: [B, A, P], color: c.back },
    { v: [A, D, P], color: c.left },
    { v: [A, B, C], color: c.base },
    { v: [A, C, D], color: c.base }
  ];

  // flatten the vertex positions and colors into arrays for BufferGeometry
  const positions = [], colorData = [], col = new THREE.Color();
  for (const face of faces) {
    col.set(face.color);
    for (const vertex of face.v) {
      positions.push(...vertex);
      colorData.push(col.r, col.g, col.b);
    }
  }

  // create a BufferGeometry and set its attributes for position and color
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorData, 3));
  geometry.computeVertexNormals();

  // move the centroid (1/4 of the height) to the origin so the pyramid rotates around its center
  geometry.translate(0, -height / 4, 0);
  return geometry;
}

// get the container element for the 3D scene
const container = document.getElementById('app');

// create a scene for the 3D objects
const scene = new THREE.Scene();
scene.background = new THREE.Color('#eef1ee');

// camera for viewing the scene
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(7, 5.5, 8);

// renderer for drawing the scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// orbit controls for camera rotation and zooming
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// ambient light fills all faces evenly, directional light gives the faces different brightness
const ambientLight = new THREE.AmbientLight('white', 0.55);
const sun = new THREE.DirectionalLight('white', 0.9);
sun.position.set(5, 8, 6);
scene.add(ambientLight, sun);

// the materials we can switch between. All of them react to light and use vertex colors
const materials = {
  Lambert: new THREE.MeshLambertMaterial({ vertexColors: true }),
  Phong: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 60 }),
  Standard: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.1 })
};

// settings the user can change in the GUI, except for the material
const settings = {
  width: 3,
  depth: 3,
  height: 3.5,
  colors: {
    front: '#e4572e', right: '#f3a712', back: '#29a19c',
    left: '#4c6ef5', base: '#6b7280'
  },
  material: 'Lambert'
};

// rotation speed per axis in radians per second (independent of the refresh rate)
const rotationSpeed = { x: 0, y: 0, z: 0 };

// create the pyramid mesh
const pyramid = new THREE.Mesh(createPyramidGeometry(settings), materials[settings.material]);
scene.add(pyramid);

// replace the geometry when size or colors change, and free the old one from GPU memory
function rebuildPyramid() {
  pyramid.geometry.dispose();
  pyramid.geometry = createPyramidGeometry(settings);
}

// GUI
const gui = new GUI();

// rotationFolder controls the rotation speed of the pyramid
const rotationFolder = gui.addFolder('Rotation speed');
rotationFolder.add(rotationSpeed, 'x', -6, 6, 0.01).name('x (rad/s)');
rotationFolder.add(rotationSpeed, 'y', -6, 6, 0.01).name('y (rad/s)');
rotationFolder.add(rotationSpeed, 'z', -6, 6, 0.01).name('z (rad/s)');
rotationFolder.open();

// sizeFolder and colorFolder rebuild the pyramid when values change
const sizeFolder = gui.addFolder('Size');
sizeFolder.add(settings, 'width', 0.5, 6, 0.1).onChange(rebuildPyramid);
sizeFolder.add(settings, 'depth', 0.5, 6, 0.1).onChange(rebuildPyramid);
sizeFolder.add(settings, 'height', 0.5, 6, 0.1).onChange(rebuildPyramid);

const colorFolder = gui.addFolder('Colors');
for (const face of Object.keys(settings.colors)) { // front, right, back, left, base
  colorFolder.addColor(settings.colors, face).onChange(rebuildPyramid); // rebuild the pyramid when a color changes
}

// handle window resize events to adjust the renderer and camera aspect ratio
function resize() {
  const { clientWidth: width, clientHeight: height } = container; 
  renderer.setSize(width, height); // set the size of the renderer to match the container
  camera.aspect = width / height; // update the camera's aspect ratio to match the new size
  camera.updateProjectionMatrix(); // update the camera's projection matrix after changing the aspect ratio
}
window.addEventListener('resize', resize); 
resize();

// the global axes the pyramid rotates around
const axisX = new THREE.Vector3(1, 0, 0);
const axisY = new THREE.Vector3(0, 1, 0);
const axisZ = new THREE.Vector3(0, 0, 1);

// the clock measures the time between frames
const clock = new THREE.Clock();

// animation loop to rotate the pyramid, update controls and render the scene
renderer.setAnimationLoop(() => {
  const deltaTime = clock.getDelta(); // seconds since the previous frame

  pyramid.rotateOnWorldAxis(axisX, rotationSpeed.x * deltaTime);
  pyramid.rotateOnWorldAxis(axisY, rotationSpeed.y * deltaTime);
  pyramid.rotateOnWorldAxis(axisZ, rotationSpeed.z * deltaTime);

  controls.update();
  renderer.render(scene, camera);
});