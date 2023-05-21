import * as THREE from "three";

// contenedores de cada caso

const $esfera_contenedor_caso_1 = document.querySelector("#esfera_caso_1");
const $esfera_contenedor_caso_2 = document.querySelector("#esfera_caso_2");
const $esfera_contenedor_caso_3 = document.querySelector("#esfera_caso_3");

// configuración de la escena

var escena = new THREE.Scene();
escena.background = new THREE.Color(0x333333);
var camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// creación y ajuste del renderizador

var renderer = new THREE.WebGLRenderer();
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
};
$esfera_contenedor_caso_1.appendChild(renderer.domElement);
resize();
window.addEventListener("resize", resize);

// clase Esfera

class Esfera {

  constructor(dimenciones, color) {

    this.geometria = new THREE.SphereGeometry(dimenciones[0], dimenciones[1], dimenciones[2]);
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true
    });
    this.esfera = new THREE.Mesh(this.geometria, this.material);
  }

  insertar_escena() {
    escena.add(this.esfera);
  }

  agregar_esfera_hija(esfera_padre) {
    esfera_padre.add(this.esfera);
  }

  animar() {
    const animate = () => {

      requestAnimationFrame(animate);
      this.esfera.rotation.x += 0.005;
      this.esfera.rotation.y += 0.005;
      renderer.render(escena, camara);
    };
    animate();
  }
}

// invocando esferas

let esfera_padre = new Esfera([2, 32, 32], 0xffffff);
esfera_padre.insertar_escena();
esfera_padre.animar();

let esfera_hija = new Esfera([1, 32, 32], 0xffff00);
esfera_hija.agregar_esfera_hija(esfera_padre.esfera);

camara.position.z = 5;
