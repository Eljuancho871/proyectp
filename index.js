import * as THREE from "three";

const $sphere = document.querySelector("#sphere");
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();   

const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    $sphere.appendChild(renderer.domElement);
}

resize()

var geometry = new THREE.SphereGeometry(2, 32, 32);

var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", resize);