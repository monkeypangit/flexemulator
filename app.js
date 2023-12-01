import * as THREE from './external/three/three.module.js';
import { OrbitControls } from './external/three/OrbitControls.js';


// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.x = 5;

camera.up.set(0, 0, 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa); // Light grey background
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Optional, but this gives a smoother control feeling
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

// Lighting
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);scene.add(light);

// Setup
const massGeometry1 = new THREE.BoxGeometry(2, 0.2, 3); // Create a box
const massMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Same material as before
const mass1 = new THREE.Mesh(massGeometry1, massMaterial1); // Create the mesh with the box geometry
scene.add(mass1); // Add the box to the scene

const massGeometry2 = new THREE.BoxGeometry(2, 0.2, 3); // Create a box
const massMaterial2 = new THREE.MeshStandardMaterial({ color: 0xff4400 }); // Same material as before
const mass2 = new THREE.Mesh(massGeometry2, massMaterial2); // Create the mesh with the box geometry
mass2.position.y = 0.4
scene.add(mass2); // Add the box to the scene


// Mass and Spring setup
const groundGeometry = new THREE.BoxGeometry(5, 5, 0.1); // Create a box
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Same material as before
const ground = new THREE.Mesh(groundGeometry, groundMaterial); // Create the mesh with the box geometry
ground.position.set(0, 0, -3); // Set the position as before
scene.add(ground); // Add the box to the scene

// Parameters
const m1 = 1.0; // mass of first object
const k1 = 100.0; // spring constant of first spring
const g = 9.81;  // acceleration due to gravity
const c1 = 1;  // damping coefficient for mass 1

// Initial conditions
let x1 = 1.0; // initial position of mass 1
let v1 = 0.0; // initial velocity of mass 1

// Time settings
const dt = 0.005; // time step

// The differential equations
function acceleration1(x1) {
    return (-k1 * x1 - c1 * v1) / m1 - g;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Physics calculations
    let a1 = acceleration1(x1);

    x1 += v1 * dt;
    v1 += a1 * dt;

    // Update mass position
    mass2.position.z = x1;

    // Update spring shape
    controls.update();
    renderer.render(scene, camera);
}

animate();