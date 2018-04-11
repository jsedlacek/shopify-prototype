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
import WidthMonitor from '../components/width-monitor';

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

export default function Demo() {
  return (
    <Page
      title="Demo Dashboard"
      primaryAction={{ content: 'Settings' }}
      breadcrumbs={[{ content: 'SatisMeter', url: '/' }]}
    >
      <Layout>
        <Layout.Section>
          <Banner
            title="Demo dashboard"
            action={{ content: 'Back to home page', url: '/' }}
            status="info"
          >
            <p>
              This is how your SatisMeter dashboard will look like once you
              start collecting feedback.
            </p>
          </Banner>
        </Layout.Section>
        <Layout.Section>
          <Card title="NPS Trend">
            <NpsTrend />
          </Card>

          <Card title="Response Trend">
            <ResponseTrend />
          </Card>

          <Card title="Rating frequncy">
            <RatingFrequencyReport />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
