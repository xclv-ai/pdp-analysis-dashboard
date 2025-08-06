// ASCII Dithering Background - Element Specific Version
// Generated for .input-section

(function() {
    'use strict';
    
    // Configuration
    const config = {
        chars: [" ",".",":",";","+","*","#","@"],
        fontSize: 8,
        color: '#000000',
        spacing: 7.8,
        zIndex: 0,
        opacity: 0.15
    };
    // TARGET ELEMENT VERSION - Find your specific element
    const targetElement = document.querySelector('.input-section');
    if (!targetElement) {
        console.warn('Element ".input-section" not found');
        return;
    }
    
    // Prevent multiple instances for this element
    if (targetElement.querySelector('#ascii-element-bg')) {
        console.warn('ASCII Background already exists for .input-section');
        return;
    }
    // Create canvas for element
    const canvas = document.createElement('canvas');
    canvas.id = 'ascii-element-bg';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${config.zIndex};
        opacity: ${config.opacity};
        pointer-events: none;
    `;
    
    // Ensure parent has relative positioning
    if (getComputedStyle(targetElement).position === 'static') {
        targetElement.style.position = 'relative';
    }
    
    // Insert canvas into target element
    targetElement.insertBefore(canvas, targetElement.firstChild);
    
    const ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = targetElement.offsetWidth;
        canvas.height = targetElement.offsetHeight;
        draw();
    }
    
    function draw() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = config.fontSize + 'px monospace';
        ctx.fillStyle = config.color;
        ctx.textBaseline = 'top';
        
        for (let y = 0; y < canvas.height; y += config.spacing) {
            for (let x = 0; x < canvas.width; x += config.spacing) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
                const intensity = Math.max(0, 1 - (distance / maxDistance));
                
                if (intensity > 0.2) {
                    const charIndex = Math.floor(intensity * (config.chars.length - 1));
                    const char = config.chars[Math.max(0, Math.min(config.chars.length - 1, charIndex))];
                    
                    if (char && char !== ' ') {
                        ctx.fillText(char, x, y);
                    }
                }
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resize);
    } else {
        resize();
    }
    
    window.addEventListener('resize', resize);
    // Control object for element background
    const controlName = 'ASCII_' + '.input-section'.replace(/[^a-zA-Z0-9]/g, '_');
    window[controlName] = {
        remove: function() {
            canvas.remove();
            window.removeEventListener('resize', resize);
            delete window[controlName];
        },
        setOpacity: function(opacity) {
            if (opacity >= 0 && opacity <= 1) {
                canvas.style.opacity = opacity;
            }
        },
        toggle: function() {
            canvas.style.display = canvas.style.display === 'none' ? 'block' : 'none';
        },
        element: targetElement,
        canvas: canvas
    };
    
    console.log('ASCII Background loaded for .input-section. Control via window[' + controlName + ']');
})();