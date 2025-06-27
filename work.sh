#!/bin/bash

npm install
npm run build

zip -9 -r index.zip ./dist
