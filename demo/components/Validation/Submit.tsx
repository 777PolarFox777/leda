import * as React from 'react';
import * as L from '../../../leda';
import { Form } from '../../../leda/components/Validation/types';

export const Submit = () => {
  const [failed, setFailed] = React.useState<Form[]>([]);
  const [submitted, setSubmitted] = React.useState<string[]>([]);

  return (
    <L.Div _box _inner>
      <L.Div>
        <L.Div _inner>
          <L.Input
            isRequired
            form="submitForm1"
            name="Input1"
            placeholder="form1 Input1"
          />
        </L.Div>
        <L.Div _inner>
          <L.Input
            isRequired
            form="submitForm1"
            name="Input2"
            placeholder="form1 Input2"
          />
        </L.Div>
        <L.Div _inner>
          <L.Input
            isRequired
            form="submitForm2"
            name="Input1"
            placeholder="form2 Input1"
          />
        </L.Div>
        <L.Div _inner>
          <L.Input
            isRequired
            form="submitForm2"
            name="Input2"
            placeholder="form2 Input2"
          />
        </L.Div>
        <L.Div _inner>
          <L.Button
            form="submitForm1"
            onClick={(event) => {
              setSubmitted(['submitForm1']);
              setFailed([]);
              console.log('submitForm1 event', event.form);
            }}
            onValidationFail={({ invalidForms }) => {
              setSubmitted([]);
              setFailed(invalidForms);
            }}
            _warning
          >
            Submit form1
          </L.Button>
          {' '}
          <L.Button
            form="submitForm2"
            onClick={(event) => {
              setSubmitted(['submitForm2']);
              setFailed([]);
              console.log('submitForm2 event', event.form?.submitForm2.Input1.value);
            }}
            onValidationFail={({ invalidForms }) => {
              setSubmitted([]);
              setFailed(invalidForms);
            }}
            _warning
          >
            Submit form2
          </L.Button>
          {' '}
          <L.Button
            form={['submitForm1', 'submitForm2']}
            onClick={(event) => {
              setSubmitted(['submitForm1', 'submitForm2']);
              setFailed([]);
              console.log('submitForm1 submitForm2 event', event.form);
            }}
            onValidationFail={({ invalidForms }) => {
              setSubmitted([]);
              setFailed(invalidForms);
            }}
            _warning
          >
            Submit both
          </L.Button>
        </L.Div>
        <L.Div _inner>
          Forms submitted: <L.Span>{ submitted.join(' ') }</L.Span>
        </L.Div>
        <L.Div _inner>
          Validation failed: <L.Span>{ failed.map((form) => form.name).join(' ') }</L.Span>
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
