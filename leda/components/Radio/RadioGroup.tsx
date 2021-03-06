import React from 'react';
import { isFunction, isBoolean } from 'lodash';
import { RadioButton } from './RadioButton';
import {
  bindFunctionalRef, getClassNames, useTheme, useElement, useProps,
} from '../../utils';
import { Div, DivProps } from '../Div';
import { COMPONENTS_NAMESPACES } from '../../constants';
import {
  ChangeEvent, RadioGroupProps, RadioGroupRefCurrent, WrapperProps,
} from './types';

export const RadioGroup = React.forwardRef((props: RadioGroupProps, ref?: React.Ref<RadioGroupRefCurrent>): React.ReactElement => {
  const {
    children,
    className,
    name,
    onChange,
    value: valueProp,
    wrapperRender,
    isDisabled,
  } = useProps(props);

  const theme = useTheme(props.theme, COMPONENTS_NAMESPACES.radio);

  const [valueState, setValueState] = React.useState<string | number | undefined>();

  const value = valueProp === undefined ? valueState : valueProp;

  const combinedClassNames = getClassNames(
    theme.wrapper,
    className,
  );

  const handleChange = React.useCallback((ev: ChangeEvent) => {
    if (isFunction(onChange)) return onChange(ev);

    return setValueState(ev.component.value);
  }, [onChange]);

  const Wrapper = useElement<RadioGroupProps, { value?: string | number }, WrapperProps>(
    'Wrapper',
    Div,
    wrapperRender,
    props,
    { value: valueState },
  );

  return (
    <Wrapper
      className={combinedClassNames}
      ref={ref && ((component: RadioGroupRefCurrent) => bindFunctionalRef(component, ref, component && {
        wrapper: component.wrapper ? component.wrapper : component,
      }))}
    >
      {React.Children.toArray(children).map((child) => {
        if (child
          && React.isValidElement(child)
          && (child.type === RadioButton || (child.type as { name?: string }).name === 'RadioButton')
        ) {
          return React.cloneElement(child, {
            name,
            onChange: handleChange,
            isDisabled: isBoolean(isDisabled) ? isDisabled : child.props.isDisabled,
            isChecked: child.props.value === value,
            theme: { ...theme, ...child.props.theme },
          });
        }
        return child;
      })}
    </Wrapper>
  );
}) as React.FC<RadioGroupProps>;

RadioGroup.displayName = 'RadioGroup';
