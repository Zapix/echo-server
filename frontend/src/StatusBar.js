import React from 'react';
import { Space, Spin } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import {MTPROTO_OFFLINE, MTPROTO_ONLINE, MTPROTO_CONNECTING} from './constants';

function StatusBar({ status }) {
  if (status === MTPROTO_ONLINE) {
    return (
      <Space direction="horizontal">
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
        />
        Online
      </Space>
    );
  }

  if (status === MTPROTO_OFFLINE) {
    return (
      <Space direction="horizontal">
        <CloseCircleTwoTone
          twoToneColor="#52c41a"
        />
        Offline
      </Space>
    );
  }

  return (
    <Space direction="horizontal">
      <Spin /> Connecting...
    </Space>
  );
}

export default StatusBar;
