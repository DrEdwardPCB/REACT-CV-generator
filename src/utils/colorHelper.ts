export function parseColor(color: string): [number, number, number] | never {
    let m: string | null | undefined | RegExpMatchArray
    m = color.match(/^#([0-9a-f]{3})$/i)?.[1];
    if (m) {
        // in three-character format, each value is multiplied by 0x11 to give an
        // even scale from 0x00 to 0xff
        return [
            parseInt(m.charAt(0), 16) * 0x11,
            parseInt(m.charAt(1), 16) * 0x11,
            parseInt(m.charAt(2), 16) * 0x11
        ];
    }
    m = color.match(/^#([0-9a-f]{6})$/i)?.[1];
    if (m) {
        return [
            parseInt(m.substr(0, 2), 16),
            parseInt(m.substr(2, 2), 16),
            parseInt(m.substr(4, 2), 16)
        ];
    }
    m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    }
    throw new Error("color not ok")
}
export function blackOrWhite(parentBgColor: string): string {
    try {
        let color = parseColor(parentBgColor);
        let gray = color[0] * 0.30 + color[1] * 0.59 + color[2] * 0.11
        if (gray > 128) {
            return "rgb(0,0,0)"
        } else {
            return "rgb(255,255,255)"
        }
    } catch (err) {
        console.log(`color format not ok for ${parentBgColor}`)
        return "rgb(0,0,0)"
    }
}