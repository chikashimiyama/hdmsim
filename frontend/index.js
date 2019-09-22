const electron = require("electron");
const three = require("three");

let scene = new three.Scene();
let camera = new three.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new three.BoxGeometry( 1, 1, 1 );
let material = new three.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new three.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );

    electron.ipcRenderer.send("euler", 3.2);
};

animate();