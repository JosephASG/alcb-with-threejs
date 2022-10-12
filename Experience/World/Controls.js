import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import TextScramble from "./Scramble.js";
import Parallax from 'parallax-js';
import WOW from 'wow.js';
import '../Jquery/jquery.scrolly.min.js';
import '../Utils/smooth-scroll.js';

// import * as dat from "dat.gui";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.device = this.sizes.device;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.renderer = this.experience.renderer;
        this.canvas = this.experience.renderer.canvas;

        //console.log(this.roomChildren);
        // Debug
        // this.gui = new dat.GUI()

        this.room.children.forEach(child => {
            //console.log(child);
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });
        //console.log(this.room)
        this.plane = this.experience.world.floor.plane;
        this.light = this.experience.world.environment.sunLight;
        this.ambientLight = this.experience.world.environment.ambientlight;

        GSAP.registerPlugin(ScrollTrigger);
        document.querySelector(".page-wrapper").style.visibility = "visible";
        this.setComplements();
        this.setScrollTrigger();
        this.setScramble();
    }
    setComplements() {
        $('.scrolly').scrolly({
            speed: 0.1
        });

        new WOW().init();

        if (this.device === "desktop") {
            let scene = document.querySelectorAll('#parallax');

            scene.forEach((parallax, i) => {
                var parallaxInstance = new Parallax(parallax);
            });
        }
    }

    /*---------------------------Scramble text-------------------------------*/
    setScramble() {

        const phrases = [
            'Hola',
            'Hello',
            'Olá',
            'Aloha',
            'Bonjour ',
            '你好',
            'Ciao',
            'Hallo',
            'Привіт',
            'こんにちは',
        ];


        const el = document.querySelector('.hola');
        const fx = new TextScramble(el);

        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };

        next();

    }
    /*------------------------ Text reveal ------------------------------*/
    // setReveal() {
    //     if (this.device === "desktop") {
    //         const txt = GSAP.utils.toArray('.txt');
    //         txt.forEach((txt, i) => {
    //             this.txtMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: txt,
    //                     toggleClass: 'active',
    //                     stagger: 0.05,
    //                     ease: "back.out(1.7)",
    //                     scrub: 2,
    //                     duration: 1,
    //                 }
    //             })
    //         })

    //         const txtright = GSAP.utils.toArray('.txt-right');
    //         txtright.forEach((txt, i) => {
    //             this.txtMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: txt,
    //                     toggleClass: 'active',
    //                     stagger: 0.05,
    //                     ease: "back.out(1.7)",
    //                     scrub: 2,
    //                     duration: 1,
    //                 }
    //             })
    //         })
    //     }
    // }
    /*-------------------------------Set Scroll Trigger--------------------------------------*/

    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 969px)": () => {
                // const enter = document.querySelector("#enter");
                // const back = document.querySelector("#back");

                this.room.scale.set(0.09, 0.09, 0.09);

                this.hideMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".sections-container",
                        start: "top bottom",
                        end: "top bottom",
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                        stagger: 0.5
                    },
                })
                    // .to(".cta-back", {
                    //     opacity: 0,
                    //     display: "none",
                    // }, "same")
                    // .to(".cta", {
                    //     opacity: 0,
                    //     display: "none",
                    // }, "same")
                    // .to(this.plane.material.color, {
                    //     b
                    //         :
                    //         0.5333333333333333,
                    //     g
                    //         :
                    //         0.6431372549019608,
                    //     r
                    //         :
                    //         0.45098039215686275
                    // }, "same")
                    .to(this.plane.material.color, {
                        b
                            :
                            0.1803921568627451,
                        g
                            :
                            0.15294117647058825,
                        r
                            :
                            0.17647058823529413
                    }, "same")
                // this.gui.add(this.roomChildren.joseph.position, 'x').min(-200).max(100);
                // this.gui.add(this.roomChildren.joseph.position, 'y').min(-100).max(100);
                // this.gui.add(this.roomChildren.joseph.position, 'z').min(-100).max(100);

                // this.gui.add(this.roomChildren.trees.rotation, 'x').min(-200).max(200);
                // this.gui.add(this.roomChildren.trees.rotation, 'y').min(-200).max(200);
                // this.gui.add(this.roomChildren.trees.rotation, 'z').min(-200).max(200);

                // // Second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first",
                        start: "top top",
                        end: "bottom bottom",
                        //markers: true,
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                    },

                })

                    // .to(this.roomChildren.cross.scale, {
                    //     x: 0,
                    //     y: 0,
                    //     z: 0,
                    // }, "same"
                    // )
                    .to(this.room.position, {
                        z: () => {
                            return this.sizes.height * 0.0012;
                        },
                        y: 1.15
                    }, "same"
                    )
                    .to(this.camera.orthograpicCamera.position, {
                        x: () => {
                            return this.sizes.width * -0.00653;
                        },
                        y: 1.8,
                        z: 11.1
                    }, "same")
                    .to(this.room.rotation, {
                        x: -0.5,
                        // y: 0.5,
                        // z: 0.5,
                        //ease: "power1.out",
                    }, "same")

                // .to(this.camera.orthograpicCamera.position, {
                //     x: () => {
                //         return this.sizes.width * -0.00568;
                //     },
                //     y: 7.6,
                //     z: 8.2
                // }, "same")
                // .to(".cta", {
                //     opacity: 0,
                //     display: "none",
                // }, "same")
                // .to(".cta-back", {
                //     opacity: 1,
                //     bottom: "30px",
                //     display: "block"
                // }, "same");
                // // Third section
                const sections = document.querySelectorAll('.section')
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                    },

                })
                    .to(this.camera.orthograpicCamera.position, {
                        x: () => {
                            return this.sizes.width * -0.003265;
                        },
                    }, "same")
                    .to(this.plane.material.color, {
                        b
                            :
                            0.396078431372549,
                        g
                            :
                            0.34509803921568627,
                        r
                            :
                            0
                    }, "same")

                // // Third section
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.camera.orthograpicCamera.position, {
                        x: () => {
                            return (this.sizes.width * 0);
                        },
                    }, "same")
                    .to(this.plane.material.color, {
                        b
                            :
                            0.28627450980392155,
                        g
                            :
                            0.8470588235294118,
                        r
                            :
                            0.9215686274509803
                    }, "same")


                // // Fourth section
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(this.camera.orthograpicCamera.position, {
                        x: () => {
                            return this.sizes.width * 0.003265;
                        },
                    }, "same")
                    .to(this.plane.material.color, {
                        b
                            :
                            0.8235294117647058,
                        g
                            :
                            0.8235294117647058,
                        r
                            :
                            0.8235294117647058
                    }, "same")

                // // Fifth section
                this.sixthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.01,
                        invalidateOnRefresh: true,
                    },
                })

                    .to(this.camera.orthograpicCamera.position, {
                        x: () => {
                            return this.sizes.width * 0.00653;
                        },
                    }, "same")
                    .to(this.plane.material.color, {
                        b
                            :
                            0.09019607843137255,
                        g
                            :
                            0.6431372549019608,
                        r
                            :
                            0.7803921568627451
                    }, "same")

            },
            // Mobile
            "(max-width: 968px)": () => {

                //Resets
                this.room.scale.set(0.07, 0.07, 0.07);

            },
            // all 
            "all": () => {

            },

        });
    }

    resize() {

    }

    update() {
    }
}
