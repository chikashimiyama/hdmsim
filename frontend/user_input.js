class UserInput
{
    yawSlider = null;
    pitchSlider = null;
    rollSlider = null;
    update = null;

    heading = null;

    constructor(headObj, textPresenter)
    {
        this.heading = {"yaw" : 0, "pitch" : 0, "roll" : 0};

        this.yawSlider = document.querySelector('#yaw');
        this.pitchSlider = document.querySelector('#pitch');
        this.rollSlider = document.querySelector('#roll');

        let that = this;

        this.update = ()=>{
            let pitch = parseFloat(this.pitchSlider.value);
            let yaw = parseFloat(this.yawSlider.value);
            let roll = parseFloat(this.rollSlider.value);

            let x = Three.Math.degToRad(pitch);
            let y = Three.Math.degToRad(roll);
            let z = Three.Math.degToRad(-yaw);
            headObj.rotation.set(x,y,z);

            textPresenter.update(headObj);
        };
        this.yawSlider.oninput = ()=>{
            that.update();
        };
        this.pitchSlider.oninput = ()=>{
            that.update();
        };
        this.rollSlider.oninput = ()=>{
            that.update();
        };

        this.update();
    }
}