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

  let imgUrls = ['joost.jpg', 'giphy.gif', 'zaanse-mayo.png', 'acid.jpg', 'timboulder-friesland.gif', 'appie.png', 'brunzyn.png', 'joost-lotto.gif', 'joost-tilburg-1.gif', 'joost-tilburg-2.gif', 'joost-tilburg-3.gif', 'joost-tilburg-4.gif', 'joost-tilburg-moshpit.gif', 'joost-tilburg.jpg', 'meeuw.png', 'wanneer-vieze-asbak.jpg', 'ski agu.jpg', 'joost-en-donnie.png', 'joost-klein-portret.jpg', 'joost-fok.jpg', 'tantu-beats.jpg', 'gitaar-guy.jpg', 'joost-klein-droom-groot.jpg', 'joost-lowlands.jpg', 'joost-lowlands2.jpg', 'baby-joost.jpg']
  let images = [];
  let imageItems = []

  let speed = 1;

  p.preload = () => {
    for (var i = 0; i < imgUrls.length; i++) {
      images[i] = p.loadImage('/static/' + imgUrls[i]);
    }

    console.log(images)
  }

  p.setup = async () => {
    let canvasHolder = document.getElementById("sketch-holder");
    var canvas = p.createCanvas(canvasHolder.offsetWidth, canvasHolder.offsetHeight);
    canvas.parent("sketch-holder");

    for (let i = 0; i < 50; i++) imageItems.push(new ImageItem());

    await leesDroom();

    for (let i = 0; i < 100; i++) wordArtItems.push(new WordArtItem());

    p.colorMode('RGB');
  };

  p.draw = () => {
    p.background(236, 233, 216);
    p.translate(p.width / 2, p.height / 2);

    for (let item of wordArtItems) {
      item.update();
      item.draw();
    }

    for (let item of imageItems) {
      item.update();
      item.draw();
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
      this.myDiv.class(`style-${p.random(wordArtStyles)}`); https://www.google.com/search?q=p5+png+transparency&sca_esv=585881890&sxsrf=AM9HkKmo5fmv5IjjB5Y2Pmp20uupKRUw4A%3A1701168200134&ei=SMRlZbfZB76hi-gPl--f6AE&ved=0ahUKEwi3nZayweaCAxW-0AIHHZf3Bx0Q4dUDCBA&uact=5&oq=p5+png+transparency&gs_lp=Egxnd3Mtd2l6LXNlcnAiE3A1IHBuZyB0cmFuc3BhcmVuY3kyCBAAGIAEGKIEMggQABiJBRiiBDIIEAAYgAQYogQyCBAAGIAEGKIESLoOUJ8IWKQMcAJ4AZABAJgBbqABpwKqAQMzLjG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIHEAAYgAQYDcICCBAAGB4YDRgPwgIIEAAYCBgeGA3CAgsQABiABBiKBRiGA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp
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
      let px = p.map(this.x / this.pz, 0, 1, 0, p.width) / 2;
      let py = p.map(this.y / this.pz, 0, 1, 0, p.height) / 2;
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
      this.imageDraw = p.random(images)
      this.pz = this.z;
    }

    update() {
      this.z = this.z - 2;

      if (this.z < 1) {
        this.x = p.random(-p.width, p.width);
        this.y = p.random(-p.height, p.height);
        this.z = p.width;
        this.pz = this.z
      }
    }

    draw() {
      let sx = p.map((this.x / this.z), 0, 1, 0, this.imageDraw.width / 5);
      let sy = p.map((this.y / this.z), 0, 1, 0, this.imageDraw.height / 5);

      let px = this.imageDraw.width / 5;
      let py = this.imageDraw.height / 5;
      this.pz = this.z;

      p.image(this.imageDraw, sx, sy, px, py);
      p.background(0, 0, 0, 0)
      p.scale(-1, 1)
    }
  }
};