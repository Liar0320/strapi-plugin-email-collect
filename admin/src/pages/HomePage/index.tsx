/*
 *
 * HomePage
 *
 */

import {
  Box,
  EmptyStateLayout,
  Button,
  Layout,
  ContentLayout,
  BaseHeaderLayout,
  Typography,
  GridLayout,
  Divider
} from "@strapi/design-system";
import { Play, Cross, Plus, Eye } from "@strapi/icons";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import React, { useState } from 'react';
import pluginId from '../../pluginId';
import getTrad from "../../utils/getTrad";

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [status, setStatus] = useState(false);
  let history = useHistory();
  function handleView() {
    history.push(
      `/content-manager/collection-types/plugin::email-collect.email-collect`
    );
  }

  return (
    <Layout background="primary100">
    <BaseHeaderLayout
      primaryAction={
        <Button startIcon={<Eye />} onClick={handleView} >
          View Entity
        </Button>
      }
      title="Email Collect"
      as="h2"
    />

    {status ? (
      <ContentLayout>
        <Box background="neutral100">
        </Box>
      </ContentLayout>
    ) : (
      <Box padding={8} background="neutral100">
        <EmptyStateLayout
          icon={<Cross />}
          content="You don't have any content yet..."
        />
      </Box>
    )}
  </Layout>
  );
};

export default HomePage;
