/* tslint:disable:no-magic-numbers no-bitwise */
export const MAC_ENTER = 3;
export const BACKSPACE = 8;
export const TAB = 9;
export const NUM_CENTER = 12;
export const ENTER = 13;
export const SHIFT = 16;
export const CONTROL = 17;
export const ALT = 18;
export const PAUSE = 19;
export const CAPS_LOCK = 20;
export const ESCAPE = 27;
export const SPACE = 32;
export const PAGE_UP = 33;
export const PAGE_DOWN = 34;
export const END = 35;
export const HOME = 36;
export const LEFT_ARROW = 37;
export const UP_ARROW = 38;
export const RIGHT_ARROW = 39;
export const DOWN_ARROW = 40;
export const PLUS_SIGN = 43;
export const PRINT_SCREEN = 44;
export const INSERT = 45;
export const DELETE = 46;
export const ZERO = 48;
export const ONE = 49;
export const TWO = 50;
export const THREE = 51;
export const FOUR = 52;
export const FIVE = 53;
export const SIX = 54;
export const SEVEN = 55;
export const EIGHT = 56;
export const NINE = 57;
export const FF_SEMICOLON = 59; // Firefox (Gecko) fires this for semicolon instead of 186
export const FF_EQUALS = 61; // Firefox (Gecko) fires this for equals instead of 187
export const QUESTION_MARK = 63;
export const AT_SIGN = 64;
export const A = 65;
export const B = 66;
export const C = 67;
export const D = 68;
export const E = 69;
export const F = 70;
export const G = 71;
export const H = 72;
export const I = 73;
export const J = 74;
export const K = 75;
export const L = 76;
export const M = 77;
export const N = 78;
export const O = 79;
export const P = 80;
export const Q = 81;
export const R = 82;
export const S = 83;
export const T = 84;
export const U = 85;
export const V = 86;
export const W = 87;
export const X = 88;
export const Y = 89;
export const Z = 90;
export const META = 91; // WIN_KEY_LEFT
export const MAC_WK_CMD_LEFT = 91;
export const MAC_WK_CMD_RIGHT = 93;
export const CONTEXT_MENU = 93;
export const NUMPAD_ZERO = 96;
export const NUMPAD_ONE = 97;
export const NUMPAD_TWO = 98;
export const NUMPAD_THREE = 99;
export const NUMPAD_FOUR = 100;
export const NUMPAD_FIVE = 101;
export const NUMPAD_SIX = 102;
export const NUMPAD_SEVEN = 103;
export const NUMPAD_EIGHT = 104;
export const NUMPAD_NINE = 105;
export const NUMPAD_MULTIPLY = 106;
export const NUMPAD_PLUS = 107;
export const NUMPAD_MINUS = 109;
export const NUMPAD_PERIOD = 110;
export const NUMPAD_DIVIDE = 111;
export const F1 = 112;
export const F2 = 113;
export const F3 = 114;
export const F4 = 115;
export const F5 = 116;
export const F6 = 117;
export const F7 = 118;
export const F8 = 119;
export const F9 = 120;
export const F10 = 121;
export const F11 = 122;
export const F12 = 123;
export const NUM_LOCK = 144;
export const SCROLL_LOCK = 145;
export const FIRST_MEDIA = 166;
export const FF_MINUS = 173;
export const MUTE = 173; // Firefox (Gecko) fires 181 for MUTE
export const VOLUME_DOWN = 174; // Firefox (Gecko) fires 182 for VOLUME_DOWN
export const VOLUME_UP = 175; // Firefox (Gecko) fires 183 for VOLUME_UP
export const FF_MUTE = 181;
export const FF_VOLUME_DOWN = 182;
export const LAST_MEDIA = 183;
export const FF_VOLUME_UP = 183;
export const SEMICOLON = 186; // Firefox (Gecko) fires 59 for SEMICOLON
export const EQUALS = 187; // Firefox (Gecko) fires 61 for EQUALS
export const COMMA = 188;
export const DASH = 189; // Firefox (Gecko) fires 173 for DASH/MINUS
export const PERIOD = 190;
export const SLASH = 191;
export const APOSTROPHE = 192;
export const TILDE = 192;
export const OPEN_SQUARE_BRACKET = 219;
export const BACKSLASH = 220;
export const CLOSE_SQUARE_BRACKET = 221;
export const SINGLE_QUOTE = 222;
export const MAC_META = 224;
export function hasModifierKey(event, ...modifiers) {
    if (modifiers.length) {
        return modifiers.some((modifier) => event[modifier]);
    }
    return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
export function isControl(event) {
    const keyCode = event.keyCode;
    switch (keyCode) {
        case SHIFT:
        case CONTROL:
        case ALT:
            return true;
        default:
            return event.metaKey;
    }
}
export function isNumberKey({ keyCode }) {
    return keyCode >= ZERO && keyCode <= NINE;
}
export function isLetterKey({ keyCode }) {
    return keyCode >= A && keyCode <= Z;
}
export function isFunctionKey({ keyCode }) {
    return keyCode >= F1 && keyCode <= F12;
}
export function isVerticalMovement({ keyCode }) {
    return [UP_ARROW, DOWN_ARROW, PAGE_DOWN, PAGE_UP, HOME, END].includes(keyCode);
}
export function isHorizontalMovement({ keyCode }) {
    return [LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE].includes(keyCode);
}
export function isSelectAll(event) {
    return event.ctrlKey && event.keyCode === A;
}
export function isCopy(event) {
    return (event.ctrlKey || event.metaKey) && event.keyCode === C;
}
export function isInput(event) {
    return event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
}
export function isLeftBracket(event) {
    return event.code === 'BracketLeft';
}
export function isRightBracket(event) {
    return event.code === 'BracketRight';
}
export function isDigit({ keyCode }) {
    return [ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE].includes(keyCode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Y29kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9jZGsva2V5Y29kZXMva2V5Y29kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBRWhELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDN0IsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUM3QixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDOUIsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUM3QixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDeEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2QixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFLLDBEQUEwRDtBQUM5RixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQVEsdURBQXVEO0FBQzNGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDaEMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFH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QUFLLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFvQjtJQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBSztJQUN6QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUM7QUFDbkYsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBb0I7SUFDOUMsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUFvQjtJQUMvQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFpQjtJQUM5QyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzIG5vLWJpdHdpc2UgKi9cblxuZXhwb3J0IGNvbnN0IE1BQ19FTlRFUiA9IDM7XG5leHBvcnQgY29uc3QgQkFDS1NQQUNFID0gODtcbmV4cG9ydCBjb25zdCBUQUIgPSA5O1xuZXhwb3J0IGNvbnN0IE5VTV9DRU5URVIgPSAxMjtcbmV4cG9ydCBjb25zdCBFTlRFUiA9IDEzO1xuZXhwb3J0IGNvbnN0IFNISUZUID0gMTY7XG5leHBvcnQgY29uc3QgQ09OVFJPTCA9IDE3O1xuZXhwb3J0IGNvbnN0IEFMVCA9IDE4O1xuZXhwb3J0IGNvbnN0IFBBVVNFID0gMTk7XG5leHBvcnQgY29uc3QgQ0FQU19MT0NLID0gMjA7XG5leHBvcnQgY29uc3QgRVNDQVBFID0gMjc7XG5leHBvcnQgY29uc3QgU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCBQQUdFX1VQID0gMzM7XG5leHBvcnQgY29uc3QgUEFHRV9ET1dOID0gMzQ7XG5leHBvcnQgY29uc3QgRU5EID0gMzU7XG5leHBvcnQgY29uc3QgSE9NRSA9IDM2O1xuZXhwb3J0IGNvbnN0IExFRlRfQVJST1cgPSAzNztcbmV4cG9ydCBjb25zdCBVUF9BUlJPVyA9IDM4O1xuZXhwb3J0IGNvbnN0IFJJR0hUX0FSUk9XID0gMzk7XG5leHBvcnQgY29uc3QgRE9XTl9BUlJPVyA9IDQwO1xuZXhwb3J0IGNvbnN0IFBMVVNfU0lHTiA9IDQzO1xuZXhwb3J0IGNvbnN0IFBSSU5UX1NDUkVFTiA9IDQ0O1xuZXhwb3J0IGNvbnN0IElOU0VSVCA9IDQ1O1xuZXhwb3J0IGNvbnN0IERFTEVURSA9IDQ2O1xuZXhwb3J0IGNvbnN0IFpFUk8gPSA0ODtcbmV4cG9ydCBjb25zdCBPTkUgPSA0OTtcbmV4cG9ydCBjb25zdCBUV08gPSA1MDtcbmV4cG9ydCBjb25zdCBUSFJFRSA9IDUxO1xuZXhwb3J0IGNvbnN0IEZPVVIgPSA1MjtcbmV4cG9ydCBjb25zdCBGSVZFID0gNTM7XG5leHBvcnQgY29uc3QgU0lYID0gNTQ7XG5leHBvcnQgY29uc3QgU0VWRU4gPSA1NTtcbmV4cG9ydCBjb25zdCBFSUdIVCA9IDU2O1xuZXhwb3J0IGNvbnN0IE5JTkUgPSA1NztcbmV4cG9ydCBjb25zdCBGRl9TRU1JQ09MT04gPSA1OTsgICAgIC8vIEZpcmVmb3ggKEdlY2tvKSBmaXJlcyB0aGlzIGZvciBzZW1pY29sb24gaW5zdGVhZCBvZiAxODZcbmV4cG9ydCBjb25zdCBGRl9FUVVBTFMgPSA2MTsgICAgICAgIC8vIEZpcmVmb3ggKEdlY2tvKSBmaXJlcyB0aGlzIGZvciBlcXVhbHMgaW5zdGVhZCBvZiAxODdcbmV4cG9ydCBjb25zdCBRVUVTVElPTl9NQVJLID0gNjM7XG5leHBvcnQgY29uc3QgQVRfU0lHTiA9IDY0O1xuZXhwb3J0IGNvbnN0IEEgPSA2NTtcbmV4cG9ydCBjb25zdCBCID0gNjY7XG5leHBvcnQgY29uc3QgQyA9IDY3O1xuZXhwb3J0IGNvbnN0IEQgPSA2ODtcbmV4cG9ydCBjb25zdCBFID0gNjk7XG5leHBvcnQgY29uc3QgRiA9IDcwO1xuZXhwb3J0IGNvbnN0IEcgPSA3MTtcbmV4cG9ydCBjb25zdCBIID0gNzI7XG5leHBvcnQgY29uc3QgSSA9IDczO1xuZXhwb3J0IGNvbnN0IEogPSA3NDtcbmV4cG9ydCBjb25zdCBLID0gNzU7XG5leHBvcnQgY29uc3QgTCA9IDc2O1xuZXhwb3J0IGNvbnN0IE0gPSA3NztcbmV4cG9ydCBjb25zdCBOID0gNzg7XG5leHBvcnQgY29uc3QgTyA9IDc5O1xuZXhwb3J0IGNvbnN0IFAgPSA4MDtcbmV4cG9ydCBjb25zdCBRID0gODE7XG5leHBvcnQgY29uc3QgUiA9IDgyO1xuZXhwb3J0IGNvbnN0IFMgPSA4MztcbmV4cG9ydCBjb25zdCBUID0gODQ7XG5leHBvcnQgY29uc3QgVSA9IDg1O1xuZXhwb3J0IGNvbnN0IFYgPSA4NjtcbmV4cG9ydCBjb25zdCBXID0gODc7XG5leHBvcnQgY29uc3QgWCA9IDg4O1xuZXhwb3J0IGNvbnN0IFkgPSA4OTtcbmV4cG9ydCBjb25zdCBaID0gOTA7XG5leHBvcnQgY29uc3QgTUVUQSA9IDkxOyAgICAgICAgICAgICAvLyBXSU5fS0VZX0xFRlRcbmV4cG9ydCBjb25zdCBNQUNfV0tfQ01EX0xFRlQgPSA5MTtcbmV4cG9ydCBjb25zdCBNQUNfV0tfQ01EX1JJR0hUID0gOTM7XG5leHBvcnQgY29uc3QgQ09OVEVYVF9NRU5VID0gOTM7XG5leHBvcnQgY29uc3QgTlVNUEFEX1pFUk8gPSA5NjtcbmV4cG9ydCBjb25zdCBOVU1QQURfT05FID0gOTc7XG5leHBvcnQgY29uc3QgTlVNUEFEX1RXTyA9IDk4O1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9USFJFRSA9IDk5O1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9GT1VSID0gMTAwO1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9GSVZFID0gMTAxO1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9TSVggPSAxMDI7XG5leHBvcnQgY29uc3QgTlVNUEFEX1NFVkVOID0gMTAzO1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9FSUdIVCA9IDEwNDtcbmV4cG9ydCBjb25zdCBOVU1QQURfTklORSA9IDEwNTtcbmV4cG9ydCBjb25zdCBOVU1QQURfTVVMVElQTFkgPSAxMDY7XG5leHBvcnQgY29uc3QgTlVNUEFEX1BMVVMgPSAxMDc7XG5leHBvcnQgY29uc3QgTlVNUEFEX01JTlVTID0gMTA5O1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9QRVJJT0QgPSAxMTA7XG5leHBvcnQgY29uc3QgTlVNUEFEX0RJVklERSA9IDExMTtcbmV4cG9ydCBjb25zdCBGMSA9IDExMjtcbmV4cG9ydCBjb25zdCBGMiA9IDExMztcbmV4cG9ydCBjb25zdCBGMyA9IDExNDtcbmV4cG9ydCBjb25zdCBGNCA9IDExNTtcbmV4cG9ydCBjb25zdCBGNSA9IDExNjtcbmV4cG9ydCBjb25zdCBGNiA9IDExNztcbmV4cG9ydCBjb25zdCBGNyA9IDExODtcbmV4cG9ydCBjb25zdCBGOCA9IDExOTtcbmV4cG9ydCBjb25zdCBGOSA9IDEyMDtcbmV4cG9ydCBjb25zdCBGMTAgPSAxMjE7XG5leHBvcnQgY29uc3QgRjExID0gMTIyO1xuZXhwb3J0IGNvbnN0IEYxMiA9IDEyMztcbmV4cG9ydCBjb25zdCBOVU1fTE9DSyA9IDE0NDtcbmV4cG9ydCBjb25zdCBTQ1JPTExfTE9DSyA9IDE0NTtcbmV4cG9ydCBjb25zdCBGSVJTVF9NRURJQSA9IDE2NjtcbmV4cG9ydCBjb25zdCBGRl9NSU5VUyA9IDE3MztcbmV4cG9ydCBjb25zdCBNVVRFID0gMTczOyAgICAgICAgICAgIC8vIEZpcmVmb3ggKEdlY2tvKSBmaXJlcyAxODEgZm9yIE1VVEVcbmV4cG9ydCBjb25zdCBWT0xVTUVfRE9XTiA9IDE3NDsgICAgIC8vIEZpcmVmb3ggKEdlY2tvKSBmaXJlcyAxODIgZm9yIFZPTFVNRV9ET1dOXG5leHBvcnQgY29uc3QgVk9MVU1FX1VQID0gMTc1OyAgICAgICAvLyBGaXJlZm94IChHZWNrbykgZmlyZXMgMTgzIGZvciBWT0xVTUVfVVBcbmV4cG9ydCBjb25zdCBGRl9NVVRFID0gMTgxO1xuZXhwb3J0IGNvbnN0IEZGX1ZPTFVNRV9ET1dOID0gMTgyO1xuZXhwb3J0IGNvbnN0IExBU1RfTUVESUEgPSAxODM7XG5leHBvcnQgY29uc3QgRkZfVk9MVU1FX1VQID0gMTgzO1xuZXhwb3J0IGNvbnN0IFNFTUlDT0xPTiA9IDE4NjsgICAgICAgLy8gRmlyZWZveCAoR2Vja28pIGZpcmVzIDU5IGZvciBTRU1JQ09MT05cbmV4cG9ydCBjb25zdCBFUVVBTFMgPSAxODc7ICAgICAgICAgIC8vIEZpcmVmb3ggKEdlY2tvKSBmaXJlcyA2MSBmb3IgRVFVQUxTXG5leHBvcnQgY29uc3QgQ09NTUEgPSAxODg7XG5leHBvcnQgY29uc3QgREFTSCA9IDE4OTsgICAgICAgICAgICAvLyBGaXJlZm94IChHZWNrbykgZmlyZXMgMTczIGZvciBEQVNIL01JTlVTXG5leHBvcnQgY29uc3QgUEVSSU9EID0gMTkwO1xuZXhwb3J0IGNvbnN0IFNMQVNIID0gMTkxO1xuZXhwb3J0IGNvbnN0IEFQT1NUUk9QSEUgPSAxOTI7XG5leHBvcnQgY29uc3QgVElMREUgPSAxOTI7XG5leHBvcnQgY29uc3QgT1BFTl9TUVVBUkVfQlJBQ0tFVCA9IDIxOTtcbmV4cG9ydCBjb25zdCBCQUNLU0xBU0ggPSAyMjA7XG5leHBvcnQgY29uc3QgQ0xPU0VfU1FVQVJFX0JSQUNLRVQgPSAyMjE7XG5leHBvcnQgY29uc3QgU0lOR0xFX1FVT1RFID0gMjIyO1xuZXhwb3J0IGNvbnN0IE1BQ19NRVRBID0gMjI0O1xuXG50eXBlIE1vZGlmaWVyS2V5ID0gJ2FsdEtleScgfCAnc2hpZnRLZXknIHwgJ2N0cmxLZXknIHwgJ21ldGFLZXknO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzTW9kaWZpZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50LCAuLi5tb2RpZmllcnM6IE1vZGlmaWVyS2V5W10pOiBib29sZWFuIHtcbiAgICBpZiAobW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzLnNvbWUoKG1vZGlmaWVyKSA9PiBldmVudFttb2RpZmllcl0pO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudC5hbHRLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250cm9sKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBTSElGVDpcbiAgICAgICAgY2FzZSBDT05UUk9MOlxuICAgICAgICBjYXNlIEFMVDpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50Lm1ldGFLZXk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJLZXkoeyBrZXlDb2RlIH06IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4ga2V5Q29kZSA+PSBaRVJPICYmIGtleUNvZGUgPD0gTklORTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGV0dGVyS2V5KHsga2V5Q29kZSB9OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleUNvZGUgPj0gQSAmJiBrZXlDb2RlIDw9IFo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uS2V5KHsga2V5Q29kZSB9OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleUNvZGUgPj0gRjEgJiYga2V5Q29kZSA8PSBGMTI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZlcnRpY2FsTW92ZW1lbnQoeyBrZXlDb2RlIH06IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1VQX0FSUk9XLCBET1dOX0FSUk9XLCBQQUdFX0RPV04sIFBBR0VfVVAsIEhPTUUsIEVORF0uaW5jbHVkZXMoa2V5Q29kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hvcml6b250YWxNb3ZlbWVudCh7IGtleUNvZGUgfTogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEJBQ0tTUEFDRSwgREVMRVRFXS5pbmNsdWRlcyhrZXlDb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0QWxsKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gQTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29weShldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSAmJiBldmVudC5rZXlDb2RlID09PSBDO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnB1dChldmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVmdEJyYWNrZXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZXZlbnQuY29kZSA9PT0gJ0JyYWNrZXRMZWZ0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmlnaHRCcmFja2V0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGV2ZW50LmNvZGUgPT09ICdCcmFja2V0UmlnaHQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWdpdCh7IGtleUNvZGUgfTogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbWkVSTywgT05FLCBUV08sIFRIUkVFLCBGT1VSLCBGSVZFLCBTSVgsIFNFVkVOLCBFSUdIVCwgTklORV0uaW5jbHVkZXMoa2V5Q29kZSk7XG59XG4iXX0=