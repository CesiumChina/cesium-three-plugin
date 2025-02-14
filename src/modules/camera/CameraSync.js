import { Vector3 } from 'three'

class CameraSync {
  constructor(viewerScene) {
    this._viewer = viewerScene.viewer
    this._camera = viewerScene.camera
    window.addEventListener('resize', this.syncCamera.bind(this))
  }

  syncCamera() {
    const cesiumCamera = this._viewer.camera
    if (this._camera.aspect !== cesiumCamera.frustum.aspectRatio) {
      this._camera.aspect = cesiumCamera.frustum.aspectRatio
      this._camera.updateProjectionMatrix()
    }
    const cvm = cesiumCamera.viewMatrix
    const civm = cesiumCamera.inverseViewMatrix
    const cameraDirection = new Vector3(-cvm[2], -cvm[6], -cvm[10])
    const cameraUp = new Vector3(cvm[1], cvm[5], cvm[9])
    const cameraPosition = new Vector3(civm[12], civm[13], civm[14])
    if (
      !this._camera.position.equals(cameraPosition) ||
      !this._camera.up.equals(cameraUp)
    ) {
      this._camera.position.copy(cameraPosition)
      this._camera.up.copy(cameraUp)
      this._camera.lookAt(cameraPosition.clone().add(cameraDirection))
    }
    return this
  }
}

export default CameraSync
