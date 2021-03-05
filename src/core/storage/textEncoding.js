// @flow

import {
  // $FlowIssue[missing-export]
  TextEncoder as importedTextEncoder,
  TextDecoder as importedTextDecoder,
} from "util";

const decoderExports: any = {};
// ensure jest skips this condition
if (typeof window !== "undefined" && typeof process === "undefined") {
  if (!(window.TextEncoder && window.TextDecoder)) {
    throw new Error("No Encoder classes available.");
  }
  decoderExports.TextDecoder = window.TextDecoder;
  decoderExports.TextEncoder = window.TextEncoder;
} else {
  // load imported libraries or fallback to globals if imports are unavailable
  /* eslint-disable no-undef */
  // $FlowIssue[cannot-resolve-name]
  decoderExports.TextDecoder = importedTextDecoder || globalThis.TextDecoder;
  /* eslint-disable no-undef */
  // $FlowIssue[cannot-resolve-name]
  decoderExports.TextEncoder = importedTextEncoder || globalThis.TextDecoder;
}
const {TextEncoder, TextDecoder} = decoderExports;

// $FlowIssue[incompatible-call]
const decode: (a: Uint8Array) => string = (a) => new TextDecoder().decode(a);
const encode: (s: string) => Uint8Array = (s) => new TextEncoder().encode(s);

export {encode, decode};
