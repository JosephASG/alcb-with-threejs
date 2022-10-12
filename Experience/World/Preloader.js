import { EventEmitter } from "events";
import Experience from "../Experience.js";
import GSAP from "gsap";
import convert from "../Utils/convertDivsToSpans.js";
// import * as dat from "dat.gui";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        // Debug
        // this.gui = new dat.GUI()

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }
    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-maim-description"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.particulas = this.experience.world.room.particles;
        this.plane = this.experience.world.floor.plane;

        //console.log(this.roomChildren);
    }
    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            // Fix responsive
            this.timeline.set(".animatedis", {
                y: 1,
                yPercent: 280,
            })
            //Main preloader
            this.timeline
                .to((".loader img"), {
                    opacity: 0,
                    delay: 1.8,

                })
                .to((".preloader"), {
                    opacity: 0,
                    delay: 0.02,
                    onComplete: () => {
                        document.querySelector(".preloader").classList.add("hidden");
                    }
                })

            if (this.device === "desktop") {
                this.timeline
                    // .to(this.roomChildren.cross.position, {
                    //     y: -30,
                    //     ease: "back.out(1.2)"
                    // },)
                    .to(this.roomChildren.heart.scale, {
                        x: 2.4,
                        y: 2.4,
                        z: 2.4,
                        ease: "back.out(2.5)",
                        duration: 1.7,
                    }, "same")
                    .to(this.roomChildren.heart.rotation, {
                        x: -0.5,
                        y: 2 * Math.PI + Math.PI / 1
                    }, "same")
                    .to(this.room.position, {
                        z: -1.6,
                        ease: "power1.out",
                        duration: 0.7,
                    }, "same")
                    .to(this.roomChildren.trees.position, {
                        x: () => {
                            return this.sizes.width * -0.0723;
                        },
                        y: -54,
                        z: 84,
                    }, "same"
                    )
                    .to(this.roomChildren.trees.rotation, {
                        x: 0.1
                    }, "same"
                    )
                    .to(this.roomChildren.joseph.position, {
                        x: () => {
                            return this.sizes.width * -0.0725;
                        },
                        y: -56,
                        z: 84,
                    }, "same"
                    )
                    .to(this.roomChildren.sun.position, {
                        x: () => {
                            return this.sizes.width * -0.03615;
                        },
                        y: -55,
                        z: 77,
                    }, "same"
                    )
                    .to(this.roomChildren.jesus.position, {
                        x: () => {
                            return this.sizes.width * 0;
                        },
                        y: -55,
                        z: 81,
                    }, "same"
                    )
                    .to(this.roomChildren.cueva.position, {
                        x: () => {
                            return this.sizes.width * 0.03615;
                        },
                        y: -52,
                        z: 77,
                        // z: () => {
                        //     return this.sizes.height * 0.00098;
                        // },
                    }, "same"
                    )
                    .to(this.roomChildren.jesusres.position, {
                        x: () => {
                            return this.sizes.width * 0.03615;
                        },
                        y: -55,
                        z: 77,
                        // z: -6,
                        // y: -1.516
                    }, "same"
                    )
                    .to(this.roomChildren.true.position, {
                        x: () => {
                            return this.sizes.width * 0.0723;
                        },
                        // z: () => {
                        //     return this.sizes.height * 0.00327;
                        // },
                        y: -53,
                        z: 87,
                        // y: 3.6864
                    }, "same"
                    )
                    .to(this.roomChildren.true.rotation, {
                        x: -1.10
                    }, "same"
                    )

                this.timeline
                    // .to(".rect-figure-1", {
                    //     left: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".rect-figure-2", {
                    //     bottom: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".rect-figure-3", {
                    //     left: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".content-menu", {
                    //     height: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    .to(".container__scroll__mouse", {
                        opacity: 1,
                        display: "block"
                    }, "same")

                    .to(".intro-text .animatedis", {
                        yPercent: 0,
                        stagger: 0.01,
                        ease: "back.out(0.5)",
                        onComplete: resolve,
                    }, "same")

            } else {
                this.timeline

                    .to(this.roomChildren.heart.scale, {
                        x: 2.4,
                        y: 2.4,
                        z: 2.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    }, "same")
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    }, "same")
                    .to(this.roomChildren.cross.position, {
                        y: -30,
                        ease: "back.out(1.2)",
                    },)
                    // .to(".rect-figure-1", {
                    //     left: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".rect-figure-2", {
                    //     bottom: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".rect-figure-3", {
                    //     left: "0%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    // .to(".content-menu", {
                    //     height: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, ">-0.8")
                    .to(".container__scroll__mouse", {
                        opacity: 1,
                        display: "block"
                    }, "same")

                    .to(".intro-text .animatedis", {
                        yPercent: 0,
                        stagger: 0.01,
                        ease: "back.out(0.3)",
                        onComplete: resolve,
                    }, "same")
            }
        });
    }
    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            this.secondaryTL = new GSAP.timeline();
            if (this.device === "desktop") {
                this.secondTimeline
                    .to(".intro-text .animatedis", {
                        yPercent: 100,
                        stagger: 0.03,
                        ease: "back.in(0.3)",

                    }, "fadeout")
                    .to(".container__scroll__mouse", {
                        opacity: 0,
                    }, "fadeout")
                    .to(this.room.position, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },)
                    // .to(this.particulas.rotation, {
                    //     x: Math.PI / 2,
                    //     duration: 2.5,
                    //     ease: "back.out(1.2)",
                    // }, "same")
                    // .to(".rect-figure-1", {
                    //     left: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    // }, "same")
                    // .to(".rect-figure-2", {
                    //     bottom: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     borderTop: "2px dotted rgba(250, 244, 229, 1)"
                    // }, "same")
                    // .to(".rect-figure-3", {
                    //     left: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     borderTop: "2px dotted rgba(250, 244, 229, 1)"
                    // }, "same")
                    // .to(".content-menu", {
                    //     height: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     borderLeft: "2px dotted rgba(250, 244, 229, 1)"
                    // }, ">-0.1")
                    .to(this.roomChildren.heart.position, {
                        x: 0,
                        ease: "power1.out",
                    }, "same")
                    .to(this.room.position, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    }, "same")
                    .to(this.roomChildren.heart.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "back.out(1.2)"
                    }, "same")

                    .to(this.camera.orthograpicCamera.position, {
                        z: 7,
                    }, "same")


                this.secondTimeline
                    .to(this.roomChildren.cross.scale, {
                        x: 7,
                        y: 7,
                        z: 7,
                        duration: 1,
                        ease: "power3.out"
                    }, ">-0.05")

                    .to(this.roomChildren.cross.position, {
                        x: 6,
                        y: 8,
                        z: 40,
                        //ease: "power1.out",
                    }, "same")

                    .to(this.roomChildren.cross.rotation, {
                        x: -1.1,
                        y: -0.5,
                        z: -13
                        //ease: "power1.out",
                    }, "same")

                    .to(this.roomChildren.heart.position, {
                        y: -100,
                        duration: 1,
                        ease: "power3.out"
                    }, "same")
                    // .to(this.room.rotation, {
                    //     x: -0.5,
                    //     // y: 0.5,
                    //     // z: 0.5,
                    //     //ease: "power1.out",
                    // }, "same")
                    .to(this.plane.material.color, {

                        b
                            :
                            0.12,
                        g
                            :
                            0.12,
                        r
                            :
                            0.12,
                    }, "same")

                    .to(this.roomChildren.trees.scale, {
                        x: 3,
                        y: 3,
                        z: 3,
                    }, "same"
                    )
                    .to(this.roomChildren.joseph.scale, {
                        x: 4,
                        y: 4,
                        z: 4,
                    }, "same"
                    )
                    .to(this.roomChildren.sun.scale, {
                        x: 4,
                        y: 4,
                        z: 4,
                    }, "same"
                    )
                    .to(this.roomChildren.jesus.scale, {
                        x: 3,
                        y: 3,
                        z: 3,
                    }, "same"
                    )
                    .to(this.roomChildren.cueva.scale, {
                        x: 4,
                        y: 4,
                        z: 4,
                    }, "same"
                    )
                    .to(this.roomChildren.jesusres.scale, {
                        x: 5,
                        y: 5,
                        z: 5,
                    }, "same"
                    )
                    .to(this.roomChildren.true.scale, {
                        x: 2,
                        y: 2,
                        z: 2,
                    }, "same"
                    )
                    // .to(".rect-figure-1", {
                    //     left: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    // .to(".rect-figure-2", {
                    //     bottom: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    // .to(".rect-figure-3", {
                    //     left: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    .to("header", {
                        opacity: 1,
                        // display: "none"
                    }, "same")
                    .to(".cursor", {
                        background: " rgba(250, 244, 229, 1)"
                    }, "same")
                    .to(".cursor-follower", {
                        border: "1px solid rgba(250, 244, 229, 0.5)"
                    }, "same")
                    // .to(".cta", {
                    //     opacity: 1,
                    //     ease: "back.out(0.9)",
                    //     display: "block",
                    //     color: "rgba(250, 244, 229, 1)",
                    // }, "same")
                    // .to(".cta-back", {
                    //     opacity: 1,
                    //     ease: "back.out(0.9)",
                    //     display: "block",
                    //     color: "rgba(250, 244, 229, 1)",
                    // }, "same")
                    .to(".container__scroll__mouse", {
                        opacity: 1,
                    }, "same")
                    .to(".nav-bottom .container-nav-links a", {
                        opacity: 1,
                        bottom: 0,
                        stagger: 0.3,
                        ease: "power3.out",
                        duration: 1,
                    }, "same")
                    .to(".mouse__scroll", {
                        border: "2px solid rgba(250, 244, 229, 1)",
                        ease: "power3.out",
                        duration: 1,
                    }, "same")
                    // .to(".content-menu ul li a", {
                    //     opacity: 1,
                    //     right: 0,
                    //     stagger: 0.05,
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "block"
                    // }, ">-0.05")
                    .to(".ctn-hero-title-1 span", {
                        opacity: 1,
                        stagger: 0.08,
                        ease: "back.out(1.2)",
                        duration: 1,
                        color: "rgba(250, 244, 229, 1)",
                    }, "introtext")
                    .to(".ctn-hero-title-2 span", {
                        opacity: 1,
                        stagger: 0.04,
                        ease: "back.out(1.2)",
                        duration: 1,
                        color: "rgba(250, 244, 229, 1)",
                    }, "introtext")
                    .to(".hero-maim-description .animatedis", {
                        yPercent: 0,
                        stagger: 0.01,
                        ease: "back.out(0.5)",
                        color: "rgba(250, 244, 229, 1)",
                        onComplete: resolve
                    }, "introtext")
            }
            else {
                this.secondTimeline
                    .to(".intro-text .animatedis", {
                        yPercent: 100,
                        stagger: 0.03,
                        ease: "back.in(0.3)",

                    }, "fadeout")
                    .to(".container__scroll__mouse", {
                        opacity: 0,
                    }, "fadeout")
                    .to(this.room.position, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },)
                    .to(this.roomChildren.heart.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power3.out"
                    }, "same")
                    .to(this.roomChildren.heart.position, {
                        y: -100,
                        duration: 1,
                        ease: "power3.out"
                    }, "same")
                // .to(".rect-figure-1", {
                //     left: "100%",
                //     ease: "power3.out",
                //     duration: 1,
                // }, "same")
                // .to(".rect-figure-2", {
                //     bottom: "-100%",
                //     ease: "power3.out",
                //     duration: 1,
                //     borderTop: "2px dotted rgba(250, 244, 229, 1)"
                // }, "same")
                // .to(".rect-figure-3", {
                //     left: "-100%",
                //     ease: "power3.out",
                //     duration: 1,
                //     borderTop: "2px dotted rgba(250, 244, 229, 1)"
                // }, "same")
                // .to(".content-menu", {
                //     height: "100%",
                //     ease: "power3.out",
                //     duration: 1,
                //     borderLeft: "2px dotted rgba(250, 244, 229, 1)"
                // }, ">-0.1")
                this.secondTimeline
                    .to(this.roomChildren.cross.scale, {
                        x: 7,
                        y: 7,
                        z: 7,
                        duration: 1,
                        ease: "power3.out"
                    }, ">-0.05")

                    .to(this.roomChildren.cross.position, {
                        x: -9.4,
                        y: 8,
                        z: 40,
                        //ease: "power1.out",
                    }, "same")

                    .to(this.roomChildren.cross.rotation, {
                        x: -1.1,
                        y: -0.5,
                        z: -13
                        //ease: "power1.out",
                    }, "same")

                    .to(this.plane.material.color, {
                        b
                            :
                            0.00784313725490196,
                        g
                            :
                            0.00784313725490196,
                        r
                            :
                            0.011764705882352941
                    })
                    // .to(".rect-figure-1", {
                    //     left: "100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    // .to(".rect-figure-2", {
                    //     bottom: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    // .to(".rect-figure-3", {
                    //     left: "-100%",
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "none"
                    // }, ">-0.65")
                    .to("header", {
                        opacity: 1,
                        // display: "none"

                    }, "same")

                    .to(".container__scroll__mouse", {
                        opacity: 1,
                    }, "same")
                    .to(".mouse__scroll", {
                        border: "2px solid rgba(250, 244, 229, 1)",
                    }, "same")
                    // .to(".cta", {
                    //     opacity: 1,
                    //     ease: "back.out(0.9)",
                    //     display: "block",
                    //     color: "rgba(250, 244, 229, 1)",
                    // }, "same")
                    // .to(".cta-back", {
                    //     opacity: 1,
                    //     ease: "back.out(0.9)",
                    //     display: "block",
                    //     color: "rgba(250, 244, 229, 1)",
                    // }, "same")
                    // .to(".content-menu ul li a", {
                    //     opacity: 1,
                    //     right: 0,
                    //     stagger: 0.05,
                    //     ease: "power3.out",
                    //     duration: 1,
                    //     display: "block"
                    // }, "same")
                    .to(".ctn-hero-title-1 span", {
                        opacity: 1,
                        stagger: 0.05,
                        ease: "back.out(1.2)",
                        duration: 1,
                        color: "rgba(250, 244, 229, 1)",
                    }, "introtext")
                    .to(".ctn-hero-title-2 span", {
                        opacity: 1,
                        stagger: 0.05,
                        ease: "back.out(1.2)",
                        duration: 1,
                        color: "rgba(250, 244, 229, 1)",
                    }, "introtext")
                    .to(".hero-maim-description .animatedis", {
                        yPercent: 0,
                        stagger: 0.01,
                        ease: "back.out(0.5)",
                        color: "rgba(250, 244, 229, 1)",
                        onComplete: resolve
                    }, "introtext")
            }
        });

    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }
    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialeY = null;
    }
    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }
    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
        if (this.playSecondIntro) {
            document.querySelector(".page").style.overflow = "visible";
            // $(function () {
            //     $('.checkbox').trigger('click');
            // });
        }
    }

    move() {
        // if (this.device === "desktop") {
        //     this.room.position.set(0, 0, -1.6);
        // } else {
        //     this.room.position.set(0, 0, -1);
        // }
    }

    scale() {
        // this.roomChildren.rectLight_light_3.width = 5;
        // this.roomChildren.rectLight_light_3.height = 3;
        if (this.device === "desktop") {
            this.room.scale.set(0.09, 0.09, 0.09);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }

}