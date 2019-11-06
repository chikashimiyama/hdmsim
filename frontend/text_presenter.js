class TextPresenter
{
    matrixText_ = null;
    eulerText_ = null;

    constructor(matrixText, eulerText)
    {
        this.matrixText_ = matrixText;
        this.eulerText_ = eulerText;
    }

    update(obj)
    {
        this.matrixText_.innerHTML = this.truncateMatrix(obj.matrix);
        this.eulerText_.innerHTML = this.truncateEuler(obj.rotation.toArray());
    }

    truncateMatrix(matrix)
    {
        let array = matrix.toArray();
        const len = array.length;
        for(let i = 0; i < len; i++){
            array[i] = array[i].toFixed(2);
        }

        let str = "";
        for(let i  = 0; i < 4; i++)
        {
            let row = array.slice(i*4, (i+1)*4);
            for(let j = 0; j < 4; j++)
            {
                let val = row[j];
                if(val >= 0.0)
                    str +='+'
                str += val;
                str += ' ';
            }
            str += '\n';
        }
        return str;
    }

    truncateEuler(array)
    {
        array.pop();
        const len = array.length;
        for(let i = 0; i < len; i++){
            array[i] = Three.Math.radToDeg(array[i]);
            array[i] = array[i].toFixed(1);
        }
        return array;
    }
}