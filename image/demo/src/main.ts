import { ready } from "@tensorflow/tfjs";
import { setPrediction } from "./chart";
import { assocList, labelMax, predictVideo } from "./model";
import "./style.css";
import { initWebcam } from "./webcam";

declare global {
  interface Window {
    debug: boolean;
  }
}

window.debug = import.meta.env.DEV;

const webcam = document.querySelector("#webcam") as HTMLVideoElement;
const prediction = document.querySelector("#prediction") as HTMLSpanElement;

await ready();
await initWebcam(webcam, predict);

let frame = 0;

async function predict() {
  if (frame === 0) document.querySelector("#loading")?.remove();

  const res = await predictVideo(webcam);
  if (!res) {
    // no face was found, don't predict anything
    prediction.innerText = "";
  } else {
    const assoc = assocList(res);
    if (window.debug && frame % 20 === 0) {
      setPrediction(assoc);
    }

    prediction.innerText = labelMax(assoc);
  }

  if (++frame % 600 === 0) {
    // cleanup webgl textures every once in a while
    // TODO: this fails to work, for some reason calling `model.predict` in `model.ts` causes the tf backend the corrupt
    // disposeVariables();
  }

  requestAnimationFrame(predict);
}
