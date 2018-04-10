import {
  Card,
  ChoiceList,
  FormLayout,
  Layout,
  Page,
  PageActions,
  Select,
  TextField,
  Collapsible,
  Button,
  Stack,
  DisplayText
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Preview from './preview';
import RatingFrequency from './charts/rating-frequency';
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

function Report() {
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
    <Page
      title="SatisMeter for Shopify"
      secondaryActions={[{ content: 'Edit Settings' }]}
    >
      <Card title="Rating frequncy">
        <Report />
      </Card>
      <Card title="Rating frequncy">
        <Report />
      </Card>
    </Page>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
