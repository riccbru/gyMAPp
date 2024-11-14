'use strict';

function hexToHSL(hex) {

    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; 
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = (h * 360).toFixed(2);
    s = (s * 100).toFixed(2);
    l = (l * 100).toFixed(2);

    return { h, s, l };
}

const args = process.argv.slice(2);
if (!args.length) {
    console.log("\x1b[1;43m[!]\x1b[0m \x1b[93mProvide an HEX color value\x1b[0m");
} else {
    const hex = args[0].replace(/^#/, '');
    const isHex = /^[0-9A-Fa-f]{6}$/.test(hex)
    if (!isHex) {
        console.log("\x1b[1;43m[!]\x1b[0m \x1b[93mProvide an HEX color value\x1b[0m")
    } else {
        const out = hexToHSL(hex);
        console.log(`\x1b[1;42m[*]\x1b[0m \x1b[92mHSL\x1b[0m\t\t${out.h} ${out.s}% ${out.l}%;`);
    }
}