import * as THREE from "three"
import Experience from "../Experience.js";
// import * as dat from "dat.gui";
import GSAP from "gsap";
import '../Jquery/jquery.noisy.min.js'
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.camera = this.experience.camera;
        this.actualRoom = this.room.scene;
        this.device = this.sizes.device;
        this.roomChildren = {};
        // Debug
        // this.gui = new dat.GUI()

        this.clock = new THREE.Clock();

        // mouse

        this.mouseX = 0;
        this.mouseY = 0;

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.targetX = 0;
        this.targetY = 0;

        this.windowX = window.innerWidth / 2;
        this.windowY = window.innerHeight / 2;



        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.03,
        };
        this.setModel();
        this.onMouseMove();
        // this.setParticles();
        this.setReload();
        this.setNoise();
    }

    setNoise() {
        if (this.device === "desktop") {
            $(".noise").noisy({
                opacity: 0.1,
                intensity: 0.8,
                color: '#ffffff',
            });
        } else {
            $(".noise").noisy({
                opacity: 0.1,
                intensity: 0.2,
                color: '#ffffff',
            });
        }
    }

    setReload() {
        var ww = $(window).width();
        var limit = 968;

        function refresh() {
            ww = $(window).width();
            var w = ww < limit ? (location.reload(true)) : (ww > limit ? (location.reload(true)) : ww = limit);
        }

        var tOut;
        $(window).resize(function () {
            var resW = $(window).width();
            clearTimeout(tOut);
            if ((ww > limit && resW < limit) || (ww < limit && resW > limit)) {
                tOut = setTimeout(refresh, 100);
            }
        });
    }
    setModel() {
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            //console.log(child);

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if (child.name === "Sun") {
                //console.log(child);
                child.children[0].material = new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                    roughness: 0,
                    metalness: 0.3,
                    //wireframe: true,
                    //emissive: 0xFFFFFF
                });
                child.children[1].material = new THREE.MeshStandardMaterial({
                    color: 0xF8CF00,
                    roughness: 0,
                    metalness: 0.3,
                    wireframe: true,
                    emissive: 0xF8CF00
                });
            }

            if (child.name === "Cross") {
                //console.log(child);
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xF4FFFF,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0xF4FFFF
                });
            }


            if (child.name === "Heart") {
                //console.log(child);
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xf20000,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0xf20000

                });
            }

            if (child.name === "Jesus") {
                // console.log(child);
                child.children[0].material = new THREE.MeshStandardMaterial({
                    // color: 0xC7A417,
                    // color: 0x492C15,
                    color: 0xFF5D00,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0xFF5D00
                });
                // child.children[1].material = new THREE.MeshStandardMaterial({
                //     color: 0x2B4110,
                //     roughness: 0,
                //     metalness: 0,
                //     // wireframe: true,
                //     // emissive: 0x2B4110
                // });
            }

            if (child.name === "Trees") {
                // console.log(child);
                child.children[1].material = new THREE.MeshStandardMaterial({
                    color: 0x503723,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0x503723
                });
                child.children[0].material = new THREE.MeshStandardMaterial({
                    color: 0x29532B,
                    roughness: 0,
                    metalness: 0,
                    //wireframe: true,
                    //emissive: 0x29401E
                });
            }


            if (child.name === "Cueva") {
                //console.log(child);
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x121212,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0x121212
                });
            }

            if (child.name === "True") {
                //console.log(child);
                child.children[0].material = new THREE.MeshStandardMaterial({
                    color: 0xf20000,
                    // color: 0xC7A417,
                    roughness: 0,
                    metalness: 0,
                    wireframe: true,
                    emissive: 0xf20000
                });
            }



            child.scale.set(0, 0, 0);
            // if (child.name === "Heart") {
            //     //child.scale.set(1, 1, 1);
            //     child.position.set(0, -1.5, 0);
            //     child.rotation.y = Math.PI / 4;
            // }

            this.roomChildren[child.name.toLowerCase()] = child;
            //console.log(this.roomChildren);
        });

        /* ************************************************************************ */

        // const width_rectLight_white = 1.4;
        // const height_rectLight_white = 1.5;
        const width_rectLight_white = 0;
        const height_rectLight_white = 0;
        const intensity_rectLight_white = 1;
        const rectLight_white = new THREE.RectAreaLight(0xFAF4E5, intensity_rectLight_white, width_rectLight_white, height_rectLight_white);
        rectLight_white.position.set(4, 1.1, 6.1);
        rectLight_white.rotation.x = -Math.PI / 2;
        rectLight_white.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight_white)

        this.roomChildren["rectLight_white".toLowerCase()] = rectLight_white;

        // this.gui.add(rectLight_light_3.position, 'x').min(-9).max(30);
        // this.gui.add(rectLight_light_3.position, 'y').min(-9).max(30);
        // this.gui.add(rectLight_light_3.position, 'z').min(-9).max(30);

        // this.gui.add(rectLight_light_3.scale, 'x').min(-9).max(30);
        // this.gui.add(rectLight_light_3.scale, 'y').min(-9).max(30);
        // this.gui.add(rectLight_light_3.scale, 'z').min(-9).max(30);

        // const rectLightHelper = new RectAreaLightHelper(rectLight_light_3);
        // rectLight_light_3.add(rectLightHelper);

        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.09, 0.09, 0.09);
    }

    // setAnimation() {
    //     //console.log(this.room);
    //     this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //     this.swim = this.mixer.clipAction(this.room.animations[6]);
    //     this.swim.play();
    // }


    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotationX = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            //this.rotationY = ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight;

            this.lerp.target = this.rotationX * 0.05;
            //this.lerp.target = this.rotationY * 0.01;

            this.mouseY = e.clientY;
            this.mouseX = e.clientX;
        });
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        const time = Date.now() * 0.00005;

        const elapsedTime = this.clock.getElapsedTime();

        this.targetX = this.mouseX * .001;
        this.targetY = this.mouseY * .001;
        if (this.device === "desktop") {
            // const h = (360 * (1.0 + time) % 360) / 360;
            // this.materials.color.setHSL(h, 0.5, 0.5);
            // this.particles.rotation.y = -.025 * elapsedTime;

            this.actualRoom.children.forEach(child => {

                if (child.name === "True") {
                    // console.log(child);
                    child.children[0].rotation.y = .5 * elapsedTime;
                }

            });

            this.roomChildren.joseph.rotation.y = .5 * elapsedTime;

            this.roomChildren.sun.rotation.y = .5 * elapsedTime;

            this.camera.orthograpicCamera.rotation.y = this.lerp.current;
        }
    }


}
