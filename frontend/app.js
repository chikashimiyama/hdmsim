class App
{
    constructor(){
        let matrixText = document.querySelector('#matrix');
        let eulerText = document.querySelector('#euler');

        let yawSlider = document.querySelector('#yaw');
        let pitchSlider = document.querySelector('#pitch');
        let rollSlider = document.querySelector('#roll');

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

        yawSlider.oninput = ()=>{
            console.log(yawSlider.value);
        };


        document.querySelector('#canvas').appendChild( renderer.domElement );
        componentFactory.createHeadModel((obj)=>{
            scene.add(obj);
            userInput.onMouseDragged = (delta)=>{
                obj.rotateZ(Three.Math.degToRad(delta.x*0.03));
                obj.rotateX(Three.Math.degToRad(delta.y*0.03));
                textPresenter.update(obj);
                Electron.ipcRenderer.send("/spatcon/rotationmatrix", obj.matrix.toArray());
            };
        });

        let animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate();
    }
}


