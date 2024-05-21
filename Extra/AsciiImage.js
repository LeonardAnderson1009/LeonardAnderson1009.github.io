document.getElementById('imageInput').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 50;
                canvas.height = 50;
                ctx.drawImage(img, 0, 0, 50, 50);
                const imageData = ctx.getImageData(0, 0, 50, 50);
                const asciiArt = imageDataToAscii(imageData);
                document.getElementById('canva').textContent = asciiArt;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function imageDataToAscii(imageData) {
    const grayScaleChars = '@%#*+=-:. ';
    const { data, width, height } = imageData;
    let asciiStr = '';
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = data[offset];
            const g = data[offset + 1];
            const b = data[offset + 2];
            const gray = (r + g + b) / 3;
            const charIndex = Math.floor((gray / 255) * (grayScaleChars.length - 1));
            asciiStr += grayScaleChars[charIndex];
        }
        asciiStr += '\n';
    }
    
    return asciiStr;
}