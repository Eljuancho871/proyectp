import * as THREE from "three";

// contenedores de cada caso

const $esfera_contenedor_caso_1 = document.querySelector("#esfera_caso_1");
const $esfera_contenedor_caso_2 = document.querySelector("#esfera_caso_2");
const $esfera_contenedor_caso_3 = document.querySelector("#esfera_caso_3");

// configuracion perspectiva de la escena

var escena = new THREE.Scene();
escena.background = new THREE.Color(0x333333);
var camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// creando y cargando canvas al DOM y haciendolo responsive

var renderer = new THREE.WebGLRenderer();
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
};
$esfera_contenedor_caso_1.appendChild(renderer.domElement);
resize();

// creacion de la esfera grande

var esfera_grande_geometrico = new THREE.SphereGeometry(2, 32, 32);
var material_grande = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

var esfera_grande = new THREE.Mesh(esfera_grande_geometrico, material_grande);
escena.add(esfera_grande);

// creacion de la esfera grande

var esfera_pequena_geometrico = new THREE.SphereGeometry(1, 32, 32);
var material_pequeno = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true
});
var esfera_pequena = new THREE.Mesh(esfera_pequena_geometrico, material_pequeno);

// esfera grande se le agrega adentro la esfera pequeña

esfera_grande.add(esfera_pequena);

// distancia entre la camara y el eje z

camara.position.z = 5;

// animar las esfera

function animate() {
  requestAnimationFrame(animate);

  esfera_grande.rotation.x += 0.005;
  esfera_grande.rotation.y += 0.005;
  esfera_pequena.rotation.x += 0.005;
  esfera_pequena.rotation.y += 0.005;

  renderer.render(escena, camara);
}

animate();

window.addEventListener("resize", resize);