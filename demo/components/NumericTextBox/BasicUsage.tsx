import * as React from 'react';
import * as L from '../../../leda';
import { StateButtonGroup } from '../StateButtonGroup';
import { useEventSpy } from '../../useEventSpy';

export const BasicUsage = (args: any) => {
  const [props, setProps] = React.useState<{ isDisabled?: boolean }>({});

  const { update, EventInfo } = useEventSpy(['formattedValue']);

  return (
    <L.Div _demoStory>
      <L.NumericTextBox
        format="#.##"
        name="numer"
        data-test="numerictextbox"
        max={20000000000000}
        min={-100000000000}
        step={1}
        invalidMessage="Число не должно быть отрицательным!"
        requiredMessage="Обязательное поле!"
        onClick={(event) => {
          update('Click', event);
          console.log('Click event.target', event.target);
        }}
        onChange={(event) => {
          update('Change', event);
          console.log('Change event.component.value', event.component.value);
        }}
        onBlur={(event) => {
          update('Blur', event);
        }}
        onFocus={(event) => {
          console.log('focus event', event);
          update('Focus', event);
        }}
        form="foobar"
        isRequired
        placeholder="Gimme ur number!"
        inputRender={({ Element, elementProps }) => (
          <>
            <L.Span _numericTextBoxPrefix>от</L.Span>
            <Element {...elementProps} />
            <L.Span _numericTextBoxSuffix>Рублей</L.Span>
          </>
        )}
        _width30
        {...props}
      />
      <br />
      <br />
      <br />
      <L.Button onClick={() => { setProps({}); }}>Defaults</L.Button>
      {'  '}
      <L.Button onClick={() => { setProps({ ...props, isDisabled: !props?.isDisabled }); }} _warning={props?.isDisabled}>Toggle isDisabled</L.Button>
      <br />
      <br />
      <StateButtonGroup
        data={[
          { text: 'Icon left', props: { ...props, prefixRender: ({ elementProps }: any) => (<L.I {...elementProps} _iSearch />) } },
          { text: 'Text left', props: { ...props, prefixRender: ({ elementProps }: any) => <L.Span {...elementProps}>от</L.Span> } },
        ]}
        setProps={setProps}
      />
      {'  '}
      <StateButtonGroup
        data={[
          { text: 'Icon right', props: { ...props, suffixRender: ({ elementProps }: any) => (<L.I {...elementProps} _iSearch />) } },
          { text: 'Text right', props: { ...props, suffixRender: ({ elementProps }: any) => <L.Span {...elementProps}>RUB</L.Span> } },
        ]}
        setProps={setProps}
      />
      <EventInfo />
    </L.Div>
  );
};
