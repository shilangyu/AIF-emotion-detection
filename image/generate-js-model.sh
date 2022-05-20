#!/bin/sh

pipenv run tensorflowjs_converter --input_format keras final_model.h5 demo/model/
