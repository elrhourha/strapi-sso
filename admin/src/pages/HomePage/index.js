import React, {memo, useEffect, useState} from 'react';
import {CheckPermissions} from '@strapi/helper-plugin';
import {
  Alert,
  HeaderLayout,
  Box
} from '@strapi/design-system';
const HomePage = () => {
  return (
    <div>
      <HeaderLayout
        title={'Single Sign On'}
        subtitle={'Subtitle'}
      />
      <Box padding={10}>
        <div>
          <Alert
            title="Success"
            variant={'success'}
            closeLabel={''}
          >
            OK
          </Alert>
        </div>
        <div>
          Description
        </div>
      </Box>
    </div>
  )
}

export default memo(HomePage);
