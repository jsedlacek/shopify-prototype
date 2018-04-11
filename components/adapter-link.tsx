import * as React from 'react';
import { Link } from 'react-router-dom';

export default function AdapterLink({ url, ...rest }: { url: string }) {
  return <Link to={url} {...rest} />;
}
