# Emotion detection

[![](https://github.com/shilangyu/AIF-emotion-detection/workflows/image-demo-cd/badge.svg)](https://github.com/shilangyu/AIF-emotion-detection/actions)

Uses [Pipenv](https://pipenv.pypa.io/en/latest/) for python dependency management.

## Text

In `text/` install dependencies with `pipenv install`, then start the jupyter notebook with `pipenv run jupyter notebook`.

## Images

In `image/` install dependencies with `pipenv install`, then start the jupyter notebook with `pipenv run jupyter notebook`.

The final model can be found [in the releases tab](https://github.com/shilangyu/AIF-emotion-detection/releases):

- `final_model.h5` - all the final weights for the keras model
- `tfjs_model.zip` - same model but converted to tensorflow.js using `pipenv run tensorflowjs_converter --input_format keras final_model.h5 tfjs/`
