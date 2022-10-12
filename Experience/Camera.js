import * as THREE from "three"
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
// import * as dat from "dat.gui";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        // Debug
        // this.gui = new dat.GUI()

        this.createPerspectiveCamera();
        this.createOrthograpicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }
    createOrthograpicCamera() {
        // this.orthograpicCamera = new THREE.OrthographicCamera(
        //     (-this.sizes.aspect * this.sizes.frustrum) / 2,
        //     (this.sizes.aspect * this.sizes.frustrum) / 2,
        //     this.sizes.frustrum / 2,
        //     -this.sizes.frustrum / 2,
        //     -50,
        //     50
        // );

        this.orthograpicCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        //  De 3.5 a 5 originalmente
        //console.log(this.orthograpicCamera);

        this.orthograpicCamera.position.y = 5.5;
        this.orthograpicCamera.position.z = 8;
        this.orthograpicCamera.rotation.x = -Math.PI / 6;

        // this.gui.add(this.orthograpicCamera.position, 'x').min(-9).max(9);
        // this.gui.add(this.orthograpicCamera.position, 'y').min(-9).max(9);
        // this.gui.add(this.orthograpicCamera.position, 'z').min(-9).max(9);
        // this.gui.add(this.orthograpicCamera.rotation, 'x').min(-9).max(9);
        // this.gui.add(this.orthograpicCamera.rotation, 'z').min(-9).max(9);

        this.scene.add(this.orthograpicCamera)

        // this.helper = new THREE.CameraHelper(this.orthograpicCamera);
        // this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize() {
        //Updating Perspective Camera on Resize
        this.orthograpicCamera.aspect = this.sizes.aspect
        this.orthograpicCamera.updateProjectionMatrix();

        //Updating Orthograpic Camera on Resize
        // this.orthograpicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        // this.orthograpicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        // this.orthograpicCamera.top = this.sizes.frustrum / 2;
        // this.orthograpicCamera.bottom = -this.sizes.frustrum / 2;
        // this.orthograpicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthograpicCamera.position);
        // this.helper.rotation.copy(this.orthograpicCamera.rotation);
    }
}
