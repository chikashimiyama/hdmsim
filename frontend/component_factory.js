const Three = require("three");
let ObjLoader = require("three-obj-loader");
ObjLoader(Three);

class ComponentFactory
{
    createScene(){
        return new Three.Scene();
    }

    createCamera(){
        let aspect = window.innerWidth/window.innerHeight;
        let camera = new Three.PerspectiveCamera( 75, aspect, 0.1, 1000 );
        camera.position.z = 30;
        return camera;
    }

    createDirectionalLight() {
        let light = new Three.DirectionalLight( 0xFFFFFF, 1 );
        light.position.set(40, 40, 30);
        return light;
    }

    createHeadModel(scene){
        let loader = new Three.OBJLoader();
        loader.load(
            'frontend/asset/head.obj',
            ( object ) => {
                object.traverse( function ( child ) {
                    if ( child.isMesh ) child.material = new Three.MeshStandardMaterial();
                } );
                object.rotateX(-90);
                object.position.set(0, -8.5, 0);
                scene.add( object );
            },
            ( xhr ) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
            ( error ) => { console.log( 'An error happened' );}
        );
    }

    createGizmo()
    {
        let gizmoGroup = new Three.Group();
        gizmoGroup.add(this.createLine(new Three.Vector3(0, 0,-25), new Three.Vector3(0, 0, 25), 0x00FF00));
        gizmoGroup.add(this.createLine(new Three.Vector3(0, -25,0), new Three.Vector3(0, 25, 0), 0x0000FF));
        gizmoGroup.add(this.createLine(new Three.Vector3(-25, 0,0), new Three.Vector3(25, 0, 0), 0xFF0000));
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
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0x999999);
        return renderer;
    }

}

module.exports = ComponentFactory;
