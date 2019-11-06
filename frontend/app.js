
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

        scene.add(camera);
        scene.add(light);
        scene.add(gizmo);

        componentFactory.createHeadModel((headObj)=>{
            scene.add(headObj);
            let textPresenter = componentFactory.createTextPresenter(matrixText, eulerText);
            componentFactory.createUserInput(headObj, textPresenter);
        });

        document.querySelector('#canvas').appendChild( renderer.domElement );

        let animate = function () {

            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate();
    }
}


