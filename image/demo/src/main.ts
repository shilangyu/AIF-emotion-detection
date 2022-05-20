import { ready } from "@tensorflow/tfjs";
import { assocList, labelMax, predictVideo } from "./model";
import "./style.css";
import { initWebcam } from "./webcam";

const webcam = document.querySelector("#webcam") as HTMLVideoElement;
const prediction = document.querySelector("#prediction") as HTMLSpanElement;

await ready();
await initWebcam(webcam, predict);

let frame = 0;

async function predict() {
  const res = await predictVideo(webcam);
  if (!res) {
    // no face was found, don't predict anything
    prediction.innerText = "";
  } else {
    const assoc = assocList(res);

    prediction.innerText = labelMax(assoc);
  }

  if (++frame % 600 === 0) {
    // cleanup webgl textures every once in a while
    // TODO: this fails to work, for some reason calling `model.predict` in `model.ts` causes the tf backend the corrupt
    // disposeVariables();
  }

  requestAnimationFrame(predict);
}
