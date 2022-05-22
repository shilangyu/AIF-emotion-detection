import { load as loadBlazeface } from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";

// tf.js does not have the L2 regularizing layer, this is created and registered as a custom deserializing layer
class L2 extends tf.layers.Layer {
  static className = "L2";

  constructor(config?: any) {
    super(config);
    tf.regularizers.l1l2(config);
  }
}

tf.serialization.registerClass(L2);

export type InputTensor = tf.Tensor<tf.Rank.R4>;
export type OutputTensor = tf.Tensor<tf.Rank.R2>;

export const imageShape: [number, number] = [48, 48];

export const classes = [
  "angry",
  "disgust",
  "fear",
  "happy",
  "neutral",
  "sad",
  "surprise",
] as const;

export const model = await tf.loadLayersModel(
  import.meta.env.VITE_TFJS_MODEL_URL
);
const blazeface = await loadBlazeface();

function normalizeImage(image: tf.Tensor<tf.Rank.R3>): InputTensor {
  return (
    image
      // normalize to [0; 1] range
      .div(tf.scalar(255))
      // take mean for grayscale
      .mean(2)
      // <batchSize> <...imageShape> <numChannels>
      .expandDims(0)
      .expandDims(-1) as InputTensor
  );
}

// searches for a face using the blazeface model. If found, crops to it
async function findFace(
  image: tf.Tensor<tf.Rank.R3>
): Promise<tf.Tensor<tf.Rank.R3> | undefined> {
  const faces = await blazeface.estimateFaces(image, false, false, false);

  if (faces.length === 0) {
    return undefined;
  }

  const face = faces[0];

  const boxes = tf
    // normalize bounds to [0; 1]
    .tensor1d([
      (face.topLeft as number[])[1] / image.shape[1],
      (face.topLeft as number[])[0] / image.shape[0],
      (face.bottomRight as number[])[1] / image.shape[1],
      (face.bottomRight as number[])[0] / image.shape[0],
    ])
    .reshape([-1, 4]);

  return tf.image
    .cropAndResize(
      image.expandDims(0) as tf.Tensor4D,
      boxes as tf.Tensor2D,
      [0],
      imageShape
    )
    .reshape([...imageShape, 3]) as tf.Tensor3D;
}

export function predictImage(path: string): Promise<OutputTensor | undefined> {
  return new Promise(async (res) => {
    const img = new Image();
    img.src = path;

    img.onload = async () => {
      const image = await tf.browser.fromPixelsAsync(img);
      const faceImage = await findFace(image);

      if (!faceImage) {
        res(undefined);
        return;
      }

      const normalized = normalizeImage(faceImage);

      // a single batch -> a single output tensor
      const oneHot = model.predict(normalized) as OutputTensor;

      res(oneHot);
    };
  });
}

export async function predictVideo(
  video: HTMLVideoElement
): Promise<OutputTensor | undefined> {
  let image = await tf.browser.fromPixelsAsync(video);
  const faceImage = await findFace(image);

  if (!faceImage) {
    return undefined;
  }

  const normalized = normalizeImage(faceImage);

  if (import.meta.env.DEV) {
    const display = normalized.reshape(imageShape) as tf.Tensor2D;

    await tf.browser.toPixels(
      display,
      document.querySelector("#preview") as HTMLCanvasElement
    );
  }

  // a single batch -> a single output tensor
  const oneHot = model.predict(normalized) as OutputTensor;

  return oneHot;
}

// creates an association list for the output tensor with the labels
export function assocList(y: OutputTensor): [typeof classes[number], number][] {
  return y.arraySync()[0].map((prob, i) => [classes[i], prob]);
}

export function labelMax(assocList: [string, number][]): string {
  let bestIndex = 0;

  for (let i = 0; i < assocList.length; i++) {
    if (assocList[bestIndex][1] < assocList[i][1]) {
      bestIndex = i;
    }
  }

  return assocList[bestIndex][0];
}
