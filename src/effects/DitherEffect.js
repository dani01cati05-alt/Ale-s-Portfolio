import { Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */ `
  uniform float uSize;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float gray = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));

    vec2 cell = mod(floor(gl_FragCoord.xy / uSize), 4.0);
    int idx = int(cell.x) + int(cell.y) * 4;

    float bayer[16];
    bayer[0] = 0.0;  bayer[1] = 8.0;  bayer[2] = 2.0;  bayer[3] = 10.0;
    bayer[4] = 12.0; bayer[5] = 4.0;  bayer[6] = 14.0; bayer[7] = 6.0;
    bayer[8] = 3.0;  bayer[9] = 11.0; bayer[10] = 1.0; bayer[11] = 9.0;
    bayer[12] = 15.0; bayer[13] = 7.0; bayer[14] = 13.0; bayer[15] = 5.0;

    float threshold = (bayer[idx] + 0.5) / 16.0;
    float bw = step(threshold, gray);

    outputColor = vec4(vec3(bw), inputColor.a);
  }
`;

export class DitherEffect extends Effect {
  constructor({ size = 2 } = {}) {
    super("DitherEffect", fragmentShader, {
      uniforms: new Map([["uSize", new Uniform(size)]]),
    });
  }
}
