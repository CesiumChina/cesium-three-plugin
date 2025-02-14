import { Group, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import CameraSync from '../camera/CameraSync.js'

const DEF_OPTS = {
  scene: null,
  camera: null,
  renderer: null,
  preserveDrawingBuffer: false,
  renderLoop: (ins) => {
    ins.renderer.resetState()
    ins.renderer.render(ins.scene, ins.camera)
  },
}

class ViewerScene {
  constructor(viewer, options = {}) {
    if (!viewer) {
      throw 'miss viewer'
    }
    this._viewer = viewer
    this._options = {
      ...DEF_OPTS,
      ...options,
    }
    this._canvas = viewer.canvas
    this._scene = this._options.scene || new Scene()
    this._camera =
      this._options.camera ||
      new PerspectiveCamera(
        (viewer.camera.frustum.fovy / Math.PI) * 180,
        viewer.camera.frustum.aspectRatio,
        viewer.camera.frustum.near,
        viewer.camera.frustum.far
      )
    this._renderer =
      this._options.renderer ||
      new WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: this._options.preserveDrawingBuffer,
        canvas: this._canvas,
        context: this._canvas.getContext('webgl2'),
      })
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight)
    this._renderer.autoClear = false
    this._world = new Group()
    this._world.name = 'world'
    this._scene.add(this._world)
    const cameraSync = new CameraSync(this)
    this._viewer.scene.postRender.addEventListener(() => {
      cameraSync.syncCamera()
      this.render()
    })
  }

  get viewer() {
    return this._viewer
  }

  get canvas() {
    return this._canvas
  }

  get camera() {
    return this._camera
  }

  get scene() {
    return this._scene
  }

  get world() {
    return this._world
  }

  get renderer() {
    return this._renderer
  }

  /**
   *
   * @returns {ViewerScene}
   */
  render() {
    this._options.renderLoop(this)
    return this
  }
}

export default ViewerScene
