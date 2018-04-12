import { Banner, Card, Layout, Page } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import { isNumber } from 'lodash';
import moment from 'moment';
import React from 'react';
import RatingFrequency from '../components/rating-frequency';
import TimeChart from '../charts/time-chart';

function formatScore(score: number) {
  if (!isNumber(score)) {
    return '';
  }
  score = Math.round(score);
  if (score > 0) {
    return '+' + score;
  }
  return '' + score;
}

function NpsTrend() {
  return (
    <TimeChart
      area={false}
      domain={[-100, 100]}
      formatValue={formatScore}
      renderValue={value => (
        <>
          <b>{formatScore(value)}</b> NPS
        </>
      )}
      items={[
        {
          date: moment()
            .subtract(1, 'day')
            .startOf('day')
            .toDate(),
          value: -10,
          label: moment()
            .subtract(1, 'day')
            .startOf('day')
            .format('ll')
        },
        {
          date: moment()
            .startOf('day')
            .toDate(),
          value: 20,
          label: moment()
            .startOf('day')
            .format('ll')
        }
      ]}
    />
  );
}

function ResponseTrend() {
  return (
    <TimeChart
      area={true}
      renderValue={value => (
        <>
          <b>{value}</b> response(s)
        </>
      )}
      items={[
        {
          date: moment()
            .subtract(1, 'day')
            .startOf('day')
            .toDate(),
          value: 10,
          label: moment()
            .subtract(1, 'day')
            .startOf('day')
            .format('ll')
        },
        {
          date: moment()
            .startOf('day')
            .toDate(),
          value: 20,
          label: moment()
            .startOf('day')
            .format('ll')
        }
      ]}
    />
  );
}

function RatingFrequencyReport() {
  const ratingCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return <RatingFrequency ratingCounts={ratingCounts} />;
}

export default function Demo() {
  return (
    <Page
      title="Demo dashboard"
      primaryAction={{ content: 'Settings', url: '/settings' }}
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
