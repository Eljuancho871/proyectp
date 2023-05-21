import * as THREE from "three";

const $esfera_contenedor = document.querySelector("#esfera_contenedor");

var escena = new THREE.Scene();
escena.background = new THREE.Color(0x333333);
var camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
};
resize();
$esfera_contenedor.appendChild(renderer.domElement);
window.addEventListener("resize", resize);

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


let caso = 1;

const mostrar_esfera_caso = (caso) => {

  if(caso == 1){
    
    let esfera_padre_caso1 = new Esfera([2, 32, 32], 0xffffff);
    esfera_padre_caso1.insertar_escena();
    esfera_padre_caso1.animar();
    
    let esfera_hija_caso1 = new Esfera([1, 32, 32], 0xffff00);
    esfera_hija_caso1.agregar_esfera_hija(esfera_padre_caso1.esfera);
  }
  else if(caso == 2){
  
    let esfera_padre_caso2 = new Esfera([2, 32, 32], 0xffff00);
    esfera_padre_caso2.insertar_escena();
    esfera_padre_caso2.animar();
  
    let esfera_hija_caso2 = new Esfera([1, 32, 32], 0xffffff );
    esfera_hija_caso2.agregar_esfera_hija(esfera_padre_caso2.esfera)
  }
  else{
  
    let esfera_padre_caso3 = new Esfera([2, 32, 32], 0xffff00);
    esfera_padre_caso3.insertar_escena();
    esfera_padre_caso3.animar();
  
    let esfera_hija_caso3 = new Esfera([1.99, 32, 32], 0xffffff );
    esfera_hija_caso3.agregar_esfera_hija(esfera_padre_caso3.esfera)
  }
}

document.querySelector("#formulario").addEventListener("submit", (e) => {

  e.preventDefault();
  document.querySelector("body").style.overflowY = "visible";
  mostrar_esfera_caso(caso);
})

camara.position.z = 5;
