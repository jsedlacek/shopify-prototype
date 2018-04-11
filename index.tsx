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
  TextField
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import TimeChart from './charts/time-chart';
import RatingFrequency from './charts/rating-frequency';
import Preview from './preview';
import WidthMonitor from './width-monitor';

class PreviewCard extends React.Component {
  state = {
    open: true
  };

  render() {
    return (
      <Card sectioned>
        <Stack vertical>
          <Button
            aria-expanded={open}
            onClick={() => this.setState({ open: !this.state.open })}
          >
            {this.state.open ? 'Hide preview' : 'Show preview'}
          </Button>
          <Collapsible open={this.state.open}>
            <Preview />
          </Collapsible>
        </Stack>
      </Card>
    );
  }
}

function Settings() {
  return (
    <>
      <Card title="Survey settings" sectioned>
        <FormLayout>
          <TextField label="Shop name" value="ACME Shop" />

          <Select
            label="Brand color"
            options={[{ label: 'Green', value: 'green' }]}
          />

          <TextField
            label="How long after order is completed should we survey your customers?"
            type="number"
            value="5"
            suffix="days"
          />
        </FormLayout>
      </Card>
      <PreviewCard />
      <PageActions
        primaryAction={{
          content: 'Launch survey'
        }}
        secondaryActions={[]}
      />
    </>
  );
}

function Dashboard() {
  return (
    <Page title="SatisMeter for Shopify">
      <Stack>
        <Card title="NPS" sectioned>
          <DisplayText size="extraLarge">+52</DisplayText>
        </Card>
        <Card title="Responses" sectioned>
          <DisplayText size="extraLarge">543</DisplayText>
        </Card>
      </Stack>
    </Page>
  );
}

function NpsTrend() {
  return (
    <WidthMonitor
      render={width => (
        <TimeChart
          size={{ width: width, height: 150 }}
          area={false}
          domain={[-100, 100]}
          items={[
            {
              date: moment()
                .subtract(1, 'day')
                .startOf('day')
                .toDate(),
              value: -10,
              label: new Date().toDateString()
            },
            {
              date: moment()
                .startOf('day')
                .toDate(),
              value: 20,
              label: new Date().toDateString()
            }
          ]}
        />
      )}
    />
  );
}

function ResponseTrend() {
  return (
    <WidthMonitor
      render={width => (
        <TimeChart
          area={true}
          size={{ width: width, height: 150 }}
          items={[
            {
              date: moment()
                .subtract(1, 'day')
                .startOf('day')
                .toDate(),
              value: 10,
              label: new Date().toDateString()
            },
            {
              date: moment()
                .startOf('day')
                .toDate(),
              value: 20,
              label: new Date().toDateString()
            }
          ]}
        />
      )}
    />
  );
}

function RatingFrequencyReport() {
  const ratingCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <WidthMonitor
      render={width => (
        <RatingFrequency
          size={{ width: width, height: 150 }}
          ratingCounts={ratingCounts}
        />
      )}
    />
  );
}

function App() {
  return (
    <Page title="Dashboard" primaryAction={{ content: 'Settings' }}>
      <Card title="NPS Trend">
        <NpsTrend />
      </Card>

      <Card title="Response Trend">
        <ResponseTrend />
      </Card>

      <Card title="Rating frequncy">
        <RatingFrequencyReport />
      </Card>
    </Page>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
