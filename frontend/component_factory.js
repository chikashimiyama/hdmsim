class ComponentFactory
{
    createScene(){
        return new Three.Scene();
    }

    createCamera(){
        let aspect = window.innerWidth/window.innerHeight;
        let camera = new Three.PerspectiveCamera( 75, aspect, 0.1, 1000 );
        camera.position.x = 20;
        camera.position.z = 20;
        camera.position.y = 20;
        camera.lookAt(new Three.Vector3(0, 0,0 ));
        return camera;
    }

    createDirectionalLight() {
        let light = new Three.DirectionalLight( 0xFFFFFF, 1 );
        light.position.set(40, 40, 30);
        return light;
    }

    createHeadModel(onLoad)
    {
        let loader = new Three.OBJLoader();

        loader.load(
            'frontend/asset/head.obj',
            (object) =>
            {
                object.traverse(function (child)
                {
                    if (child.isMesh){
                        child.material = new Three.MeshStandardMaterial();
                        let box = new Three.Box3().setFromObject( child );
                        box.center( child.position );
                        child.position.multiplyScalar( - 1 );
                        let pivot = new Three.Group();
                        pivot.add( object );
                        onLoad(pivot);
                    }
                });
            },
            (xhr) =>
            {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) =>
            {
                console.log('An error happened');
            }
        );
    }

    createGizmo()
    {
        let gizmoGroup = new Three.Group();
        gizmoGroup.add(this.createLine(new Three.Vector3(0, 0,-50), new Three.Vector3(0, 0, 50), 0x00FF00));
        gizmoGroup.add(this.createLine(new Three.Vector3(0, -50,0), new Three.Vector3(0, 50, 0), 0x0000FF));
        gizmoGroup.add(this.createLine(new Three.Vector3(-50, 0,0), new Three.Vector3(50, 0, 0), 0xFF0000));
        return gizmoGroup;
    }

    createLine(startPos, endPos, color){
        let material = new Three.LineBasicMaterial({
            color: color
        });

        let geometry = new Three.Geometry();
        geometry.vertices.push(startPos, endPos);

        return new Three.Line( geometry, material );
    }

    createRenderer(){
        let renderer = new Three.WebGLRenderer();
        renderer.setSize( 500, 500 );
        renderer.setClearColor(0x999999);
        return renderer;
    }

    createUserInput(headObj, textPresenter){
        return new UserInput(headObj, textPresenter);
    }

    createTextPresenter(matrixText, eulerText){
        return new TextPresenter(matrixText, eulerText);
    }

    createPingSender(){
        return new PingSender();
    }

}

module.exports = ComponentFactory;
