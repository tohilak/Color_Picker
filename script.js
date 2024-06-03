document.addEventListener("DOMContentLoaded", function() {
    const colorPicker = document.getElementById("colorPicker");
    const selectedColor = document.getElementById("selectedColor");
    const saveImageBtn = document.getElementById("saveImageBtn");
    const copyHexBtn = document.getElementById("copyHexBtn");

    colorPicker.addEventListener("input", function() {
        const color = colorPicker.value;
        selectedColor.style.backgroundColor = color;
    });

    saveImageBtn.addEventListener("click", function() {
        // Create a canvas element to draw the selected color
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Convert the canvas to a data URL representing the PNG image
        const dataURL = canvas.toDataURL("image/png");

        // Trigger download of the PNG image
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'selected_color.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    copyHexBtn.addEventListener("click", function() {
        // Copy the hex value of the selected color to the clipboard
        const hexValue = colorPicker.value;
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                alert("Hex value copied to clipboard: " + hexValue);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });
});
