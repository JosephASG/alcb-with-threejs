import * as THREE from "three"
import { Light } from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
// import GUI from "lil-gui";
// import * as dat from "dat.gui";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new dat.GUI()
        // this.gui = new GUI();
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };
        // this.clock = new THREE.Clock();

        this.setSunLight();
        // this.setGUI();
    }

    // setGUI() {
    //     this.gui.addColor(this.obj, "colorObj").onChange(() => {
    //         this.sunLight.color.copy(this.obj.colorObj);
    //         this.ambientlight.color.copy(this.obj.colorObj);
    //         console.log(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
    //         this.sunLight.intensity = this.obj.intesity;
    //         this.sunLight.ambientlight = this.obj.intesity;
    //     });
    // }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#FFFFFF");
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientlight = new THREE.AmbientLight("#FFFFFF", 1);
        this.scene.add(this.ambientlight);



        // this.sunLight2 = new THREE.DirectionalLight("#FFFFFF", 4.0, 3000);
        // this.sunLight2.castShadow = true;
        // this.sunLight2.shadow.camera.far = 20;
        // this.sunLight2.shadow.mapSize.set(2048, 2048);
        // this.sunLight2.shadow.normalBias = 0.05;

        // // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // // this.scene.add(helper);
        // //this.sunLight2.position.set(111, -55, 77);
        // this.scene.add(this.sunLight2);


        // this.gui.add(this.sunLight2.position, 'x').min(-200).max(200);
        // this.gui.add(this.sunLight2.position, 'y').min(-200).max(200);
        // this.gui.add(this.sunLight2.position, 'z').min(-200).max(200);
    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.047058823529411764,
                g: 0.047058823529411764,
                b: 0.047058823529411764,
            });
            GSAP.to(this.ambientlight.color, {
                r: 0.047058823529411764,
                g: 0.047058823529411764,
                b: 0.047058823529411764,
            });
            GSAP.to(this.sunLight, {
                intensity: 1.5,
            });
            GSAP.to(this.ambientlight, {
                intensity: 1.5,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientlight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 1,
            });
            GSAP.to(this.ambientlight, {
                intensity: 1,
            });
        }
    }


    resize() {

    }

    update() {

    }
}
