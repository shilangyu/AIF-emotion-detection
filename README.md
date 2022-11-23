# Emotion detection

[![](https://github.com/shilangyu/AIF-emotion-detection/workflows/image-demo-cd/badge.svg)](https://github.com/shilangyu/AIF-emotion-detection/actions)

Final rendered report can be found [here](report/report.pdf).

Uses [Pipenv](https://pipenv.pypa.io/en/latest/) for python dependency management.

## Text

More info in [the notebook](./text/text_emotion_detection.ipynb).

In `text/` install dependencies with `pipenv install`, then start the jupyter notebook with `pipenv run jupyter notebook`.

## Images

More info in [the notebook](./image/image_emotion_detection.ipynb) and the [demo README](image/demo).

In `image/` install dependencies with `pipenv install`, then start the jupyter notebook with `pipenv run jupyter notebook`.

The final model can be found [in the releases tab](https://github.com/shilangyu/AIF-emotion-detection/releases):

- `final_model.h5` - all the final weights for the keras model
- `tfjs_model.zip` - same model but converted to tensorflow.js using `pipenv run tensorflowjs_converter --input_format keras final_model.h5 tfjs/`
