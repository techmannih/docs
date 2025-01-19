import { ReactNode, useEffect } from 'react';
import { Redirect } from '@docusaurus/router';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // Redirect to Quickstart page
  useEffect(() => {
    window.location.replace('/docs/quickstart');
  }, []);
}
