import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ReactElementType, Type, Key, Ref, Props, ElementType } from 'shared/ReactTypes';

const ReactElement = (type: Type, key: Key, ref: Ref, props: Props): ReactElementType => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'phy',
  };
  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = '' + val;
      }
      continue;
    }
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
    if (maybeChildren) {
      // [child] [child,child,child]
      if (maybeChildren.length === 1) {
        props.children = maybeChildren[0];
      } else {
        props.children = [...maybeChildren];
      }
    }

    return ReactElement(type, key, ref, props);
  }
};

// 开发环境的jsx会多做处理 暂时跟生产环境一样
export const jsxDev = (type: ElementType, config: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = '' + val;
      }
      continue;
    }
    if (Object.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }

    return ReactElement(type, key, ref, props);
  }
};
