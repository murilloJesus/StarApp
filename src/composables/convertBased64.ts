
export default function convertImgToBase64URL(url: string, outputFormat = 'image/png'){
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    let canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')
    let dataURL = ''

    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    canvas = null; 

    return dataURL;
}