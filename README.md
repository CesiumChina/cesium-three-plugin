
# cesium-three-plugin

`cesium-three-plugin` is a bridge plugin that cleverly connects [Cesium](https://cesium.com/) with [Three.js](https://threejs.org/). 

## Install

```shell
npm install @cesium-china/cesium-three-plugin
----------------------------------------
yarn add @cesium-china/cesium-three-plugin
```

## Quickly Start

`cesium-three-plugin` depends on three, please make sure three is installed before using it.

```javascript
import * as Cesium from 'cesium';
import { ViewerScene } from '@cesium-china/cesium-three-plugin'

const viewer = new Cesium.CesiumWidget('viewer-container', {
  creditContainer: document.createElement('div'),
});

const viewerScene = new ViewerScene(viewer)
```

## Examples

## Docs
