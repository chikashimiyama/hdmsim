const Electron = require("electron");

class App
{
    constructor(){
        let componentFactory = new ComponentFactory();
        let scene = componentFactory.createScene();
        let camera = componentFactory.createCamera();
        let light = componentFactory.createDirectionalLight();
        let renderer = componentFactory.createRenderer();
        let gizmo = componentFactory.createGizmo();
        let userInput = new UserInput();

        scene.add(camera);
        scene.add(light);
        scene.add(gizmo);

        document.body.appendChild( renderer.domElement );
        componentFactory.createHeadModel((obj)=>{
            scene.add(obj);
            userInput.onMouseDragged = (delta)=>{
                obj.rotateZ(Three.Math.degToRad(delta.x*0.03));
                obj.rotateX(Three.Math.degToRad(delta.y*0.03));
            };
        });



        let animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate();
    }
}


