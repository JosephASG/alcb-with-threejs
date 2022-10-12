import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = "light";

        // this.toggleButton = document.querySelector(".toggle-button");
        // this.toggleCircle = document.querySelector("toggle-circle");

        this.toggleButton = document.querySelector(".switch");
        this.toggleCircle = document.querySelector(".checkbox");

        this.setEventListeners();
    }

    setEventListeners() {
        // this.toggleCircle.addEventListener("click", () => {
        //     this.toggleCircle.classList.toggle("slide");
        //     this.theme = this.theme === "light" ? "dark" : "light";

        //     this.emit("switch", this.theme);

        // })

        this.toggleCircle.addEventListener("click", () => {
            this.theme = this.theme === "light" ? "dark" : "light";
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            this.emit("switch", this.theme);
        });
    }
}