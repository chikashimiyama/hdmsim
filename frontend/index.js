const Electron = require("electron");

let componentFactory = new ComponentFactory();
let scene = componentFactory.createScene();
let camera = componentFactory.createCamera();
let light = componentFactory.createDirectionalLight();
let renderer = componentFactory.createRenderer();
let gizmo = componentFactory.createGizmo();

scene.add(camera);
scene.add(light);
scene.add(gizmo);

document.body.appendChild( renderer.domElement );
componentFactory.createHeadModel(scene);

let animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    Electron.ipcRenderer.send("euler", 3.2);
};
animate();