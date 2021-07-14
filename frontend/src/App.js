import { useState } from 'react';
import { Button, Card, Input, Space, Typography } from 'antd';
import { methodFromSchema } from 'zagram';

import './App.css';
import { MTPROTO_ONLINE } from './constants';
import StatusBar from './StatusBar';
import { useMTProto } from './useMTProto';

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState(null);
  const [clientRef, status, schema] = useMTProto();

  return (
    <div className="App">
      <header className="App-header">
        <Space direction="vertical">
          <Typography.Title type="success">
            MTpylon Echo Server
          </Typography.Title>
          <StatusBar status={status} />
          <Space
            direction="horizontal"
            size="large"
          >
            <Input
              size="large"
              placeholder="Send message to server"
              disabled={status !== MTPROTO_ONLINE}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
            <Button
              type="primary"
              size="large"
              disabled={status !== MTPROTO_ONLINE}
              onClick={() => {
                setResponse(null);
                clientRef.current.request(
                  methodFromSchema(schema, 'echo', {content: message})
                ).then(data => setResponse(data))
              }}
            >
              Send data
            </Button>
          </Space>
          {
            response ? (
              <Card>
                {`Response message \"${response.content}\" with rand id: ${response.rand_id}`}
              </Card>
            ) : null
          }

        </Space>
      </header>
    </div>
  );
}


export default App;
