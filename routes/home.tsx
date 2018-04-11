import { EmptyState, Page } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import React from 'react';

export default function Home() {
  return (
    <Page
      title="SatisMeter"
      primaryAction={{ content: 'Settings', url: '/settings' }}
    >
      <EmptyState
        heading="Post-purchase feedback from your customers"
        action={{ content: 'Set up SatisMeter', url: '/settings' }}
        secondaryAction={{
          content: 'View demo dashboard',
          url: '/demo'
        }}
        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
      >
        <p>
          Automatically send feedback survey few days after the purchase to your
          customers.
        </p>
        <p>
          When a customer completes the survey, you’ll find their feedback here.
        </p>
      </EmptyState>
    </Page>
  );
}
