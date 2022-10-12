import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";
// import vertexShader from "./shader/vertex.glsl.js";
// import fragmentShader from "./shader/fragment.glsl.js";
// import * as dat from "dat.gui";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        // Debug
        // this.gui = new dat.GUI()
        this.setFloor();
        // this.setGeometrys();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);

        this.material = new THREE.MeshStandardMaterial(
            {
                color: 0xc2c2c2,
                side: THREE.BackSide,
            }
        );
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        // this.plane.material.color()
        this.plane.rotation.x = Math.PI;
        this.plane.position.y = 0;
        this.plane.position.x = 0;
        this.plane.position.z = -20;
        this.plane.castShadow = true;
        this.plane.receiveShadow = true;

        // this.gui.add(this.plane2.position, 'x').min(-100).max(100);
        // this.gui.add(this.plane2.position, 'y').min(-100).max(100);
        // this.gui.add(this.plane2.position, 'z').min(-100).max(100);

        // this.gui.add(this.plane2.rotation, 'x').min(-100).max(100);
        // this.gui.add(this.plane2.rotation, 'y').min(-100).max(100);
        // this.gui.add(this.plane2.rotation, 'z').min(-100).max(100);

    }

    // setGeometrys() {
    //     const geometry = new THREE.CircleGeometry(5, 3);
    //     const material = new THREE.MeshStandardMaterial({ color: 0x121212 });
    //     const material2 = new THREE.MeshStandardMaterial({ color: 0xFAF4E5 });
    //     const material3 = new THREE.MeshStandardMaterial({ color: 0x121212 });
    //     this.circleFirst = new THREE.Mesh(geometry, material);
    //     this.circleSecond = new THREE.Mesh(geometry, material2);
    //     this.circleThird = new THREE.Mesh(geometry, material3);

    //     this.circleFirst.position.y = -0.29;
    //     this.circleSecond.position.y = -0.28;
    //     this.circleSecond.position.x = 2;

    //     this.circleThird.position.y = -0.27;
    //     this.circleThird.position.x = 6;
    //     this.circleThird.position.z = 8;

    //     this.circleFirst.scale.set(0, 0, 0);
    //     this.circleSecond.scale.set(0, 0, 0);
    //     this.circleThird.scale.set(0, 0, 0);

    //     this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI / 2;

    //     this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;

    //     this.scene.add(this.circleFirst);
    //     this.scene.add(this.circleSecond);
    //     this.scene.add(this.circleThird);
    // }

    resize() {

    }

    update() {

    }


}
