import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
const dromenRef = collection(db, "dromen")

const fillerDromen = [];

async function leesDroom() {
  const querySnapshot = await getDocs(dromenRef);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    fillerDromen.push(doc.data().droom);
  });
}

export const mySketch = (p) => {
  let wordArtItems = [];
  let wordArtStyles = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twentyone",
    "twentytwo",
  ];
  let speed = 1;

  let img
  let imageItems = []

  p.preload = () => {
    img = p.loadImage('/static/joost.jpg');
  }

  p.setup = async () => {
    let canvasHolder = document.getElementById("sketch-holder");
    var canvas = p.createCanvas(canvasHolder.offsetWidth, canvasHolder.offsetHeight);
    canvas.parent("sketch-holder");

    for (let i = 0; i < 100; i++) imageItems.push(new ImageItem());

    await leesDroom();

    for (let i = 0; i < 100; i++) wordArtItems.push(new WordArtItem());

    p.colorMode('RGB');
  };

  p.draw = () => {
    p.background(236, 233, 216);
    p.translate(p.width / 2, p.height / 2);

    for (let i = 0; i < wordArtItems.length; i++) {
      wordArtItems[i].update();
      wordArtItems[i].draw();
    }

    for (let i = 0; i < imageItems.length; i++) {
      imageItems[i].update();
      imageItems[i].draw();
    }
  };

  class WordArtItem {
    constructor() {
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.z = p.random(p.width);
      this.pz = this.z;
      this.fontSize = 1;

      this.myDiv = p.createDiv("");
      this.myDiv.class(`style-${p.random(wordArtStyles)}`);
      this.divChild = p.createDiv("");
      this.pTag = p.createP(p.random(fillerDromen));

      this.divChild.class("wordart");
      this.divChild.child(this.pTag);
      this.myDiv.child(this.divChild);
    }

    update() {
      this.z = this.z - speed;
      this.fontSize = this.fontSize + (speed / 10);

      if (this.z < 1) {
        this.x = p.random(-p.width, p.width);
        this.y = p.random(-p.height, p.height);
        this.z = p.width;
        this.pz = this.z;
        this.fontSize = 1;
      };
    };

    draw() {
      let px = p.map(this.x / this.pz, 0, 1, 0, p.width);
      let py = p.map(this.y / this.pz, 0, 1, 0, p.height);
      this.pz = this.z;

      this.pTag.class("preview");

      this.divChild.class("wordart");
      this.divChild.child(this.pTag);

      this.myDiv.style("font-size", `${this.fontSize}px`);
      this.myDiv.style("min-width", "500px")
      this.myDiv.position(px, py, this.pz);

      this.myDiv.parent('window-body')
    };
  };

  class ImageItem {
    constructor() {
      this.x = p.random(-p.width, p.width);
      this.y = p.random(-p.height, p.height);
      this.z = p.random(p.width);
      this.pz = this.z;
    }

    update() {
      this.z = this.z - speed;

      if (this.z < 1) {
        this.x = p.random(-p.width, p.width);
        this.y = p.random(-p.height, p.height);
        this.z = p.width;
        this.pz = this.z
      }
    }

    draw() {
      let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
      let sy = p.map(this.y / this.z, 0, 1, 0, p.height);

      let r = p.map(this.z, 0, p.width, 16, 0)

      let px = p.map(this.x / this.pz, 0, 1, 0, p.width);
      let py = p.map(this.y / this.pz, 0, 1, 0, p.height);
      this.pz = this.z;

      p.image(img, px, py, sx, sy)
      p.scale(-1, 1)
    }
  }
};