import {
  Button,
  Card,
  Collapsible,
  DisplayText,
  FormLayout,
  Page,
  PageActions,
  Select,
  Stack,
  TextField,
  Banner,
  Layout
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import TimeChart from '../charts/time-chart';
import RatingFrequency from '../charts/rating-frequency';
import Preview from '../components/preview';
import WidthMonitor from '../width-monitor';

class PreviewCard extends React.Component {
  render() {
    return (
      <Card title="Preview" sectioned>
        <Preview />
      </Card>
    );
  }
}

export default function Settings() {
  return (
    <Page
      title="Settings"
      primaryAction={{ content: 'Save and launch' }}
      breadcrumbs={[{ content: 'SatisMeter', url: '/' }]}
    >
      <Card title="Appearance" sectioned>
        <FormLayout>
          <TextField label="Shop name" value="ACME Shop" />

          <Select
            label="Primary color"
            options={[{ label: 'Green', value: 'green' }]}
          />
        </FormLayout>
      </Card>

      <Card title="Email text" sectioned>
        <FormLayout>
          <TextField label="Shop name" value="ACME Shop" />

          <TextField label="Email subject" value="Your opinion matters" />

          <TextField
            label="Intro message"
            multiline={true}
            value={`Hey there,

It would really help us if you could take 10 seconds of your time to rate your experience with us.`}
          />

          <TextField
            label="Thank you message"
            multiline={true}
            value={`Thank you for taking the time to let us know what you think. We will use this information to help improve our services!`}
          />
        </FormLayout>
      </Card>

      <Card title="Schedule" sectioned>
        <FormLayout>
          <TextField
            label="How long after order is completed should we survey customer?"
            type="number"
            value="5"
            suffix="days"
          />
        </FormLayout>
      </Card>

      <PreviewCard />
      <PageActions
        primaryAction={{
          content: 'Save and launch'
        }}
        secondaryActions={[]}
      />
    </Page>
  );
}
