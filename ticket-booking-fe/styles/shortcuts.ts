import { DimensionValue } from "react-native";

export interface ShortcutProps {
  m?: number | "auto";
  ml?: number | "auto";
  mr?: number | "auto";
  mt?: number | "auto";
  mb?: number | "auto";
  mx?: number | "auto";
  my?: number | "auto";

  p?: number | "auto";
  pl?: number | "auto";
  pr?: number | "auto";
  pt?: number | "auto";
  pb?: number | "auto";
  px?: number | "auto";
  py?: number | "auto";

  w?: DimensionValue;
  h?: DimensionValue;
}

export const defaultShortcuts = (props: ShortcutProps) => ({
  padding: props.p,
  paddingLeft: props.pl,
  paddingRight: props.pr,
  paddingTop: props.pt,
  paddingBottom: props.pb,
  paddingVertical: props.py,
  paddingHorizontal: props.px,

  margin: props.m,
  marginLeft: props.ml,
  marginRight: props.mr,
  marginTop: props.mt,
  marginBottom: props.mb,
  marginVertical: props.my,
  marginHorizontal: props.mx,

  width: props.w,
  height: props.h,
});
