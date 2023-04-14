export type Type = any;
export type Key = null | string;
export type Ref = null | string;
export type Props = any;
export type ElementType = any;

export type ReactElementType<T = unknown> = {
  $$typeof: symbol | number;
  type: Type;
  key: Key;
  ref: Ref;
  props: Props;
  __mark: string;
};
