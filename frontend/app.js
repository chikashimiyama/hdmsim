class App
{
    constructor(){
        let matrixText = document.querySelector('#matrix');
        let eulerText = document.querySelector('#euler');

        let componentFactory = new ComponentFactory();
        let scene = componentFactory.createScene();
        let camera = componentFactory.createCamera();
        let light = componentFactory.createDirectionalLight();
        let renderer = componentFactory.createRenderer();
        let gizmo = componentFactory.createGizmo();
        let textPresenter = componentFactory.createTextPresenter(matrixText, eulerText);

        scene.add(camera);
        scene.add(light);
        scene.add(gizmo);

        let userInput = componentFactory.createUserInput();

        document.querySelector('#canvas').appendChild( renderer.domElement );
        componentFactory.createHeadModel((obj)=>{
            scene.add(obj);
            userInput.onMouseDragged = (delta)=>{
                obj.rotateZ(Three.Math.degToRad(delta.x*0.03));
                obj.rotateX(Three.Math.degToRad(delta.y*0.03));
                textPresenter.update(obj);
                Electron.ipcRenderer.send("/headrotation", obj.matrix.toArray());
            };
        });



        let animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate();
    }
}

