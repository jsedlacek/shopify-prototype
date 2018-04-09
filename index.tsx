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
  Stack
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Preview from './preview';

class PreviewCard extends React.Component {
  state = {
    open: false
  };

  render() {
    return (
      <Card title="Preview" sectioned>
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

function App() {
  return (
    <Page
      title="SatisMeter for Shopify"
      primaryAction={{ content: 'Launch Survey' }}
    >
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
    </Page>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
