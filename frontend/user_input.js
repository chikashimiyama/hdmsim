class UserInput
{
    onMouseDragged = null;
    dragging_ = false;
    origin = null;

    constructor()
    {

        window.addEventListener('mousedown', event=>{
            this.dragging_ = true;
            this.origin = new Three.Vector2(event.screenX, event.screenY);
        });

        window.addEventListener('mouseup', event=>{
            this.dragging_ = false;
        });

        window.addEventListener('mousemove', event=>{
            if(this.dragging_)
            {
                let current = new Three.Vector2(event.screenX, event.screenY);
                let delta = new Three.Vector2(current.x - this.origin.x, current.y - this.origin.y);
                if(this.onMouseDragged)
                {
                    this.onMouseDragged(delta);
                }
            }
        })
    }
}